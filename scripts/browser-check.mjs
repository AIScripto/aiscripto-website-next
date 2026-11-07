/**
 * Real-browser smoke test of the production build (headless Chrome via the DevTools
 * protocol; no extra dependencies).
 *
 *   npm run build && npm run test:browser
 *
 * Starts the local production server (server.ts) and headless Chrome, then checks:
 *   - key pages: HTTP status, H1, and no CSP / hydration / JS errors
 *   - 404s for unknown URLs
 *   - chat widget iframe is allowed by our CSP
 *   - contact form submits (the email API is intercepted; nothing is sent)
 *   - demo modal + mega menu keyboard behaviour
 *   - light-mode visitors get no dark flash
 *   - every sitemap page has no horizontal overflow at 360px
 * Analytics requests are blocked so test runs don't pollute stats.
 *
 * Set CHROME_PATH if Chrome isn't in the default location.
 */
import { spawn } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

const SERVER_PORT = 4173;
const DEVTOOLS_PORT = 9333;
const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);
const chromePath = CHROME_CANDIDATES.find((p) => fs.existsSync(p));
if (!chromePath) {
  console.error("Chrome not found. Set CHROME_PATH.");
  process.exit(1);
}
if (!fs.existsSync(path.join(process.cwd(), "dist", "index.html"))) {
  console.error("No build found. Run `npm run build` first.");
  process.exit(1);
}

const children = [];
const cleanup = () => children.forEach((c) => { try { c.kill(); } catch { /* already exited */ } });
process.on("exit", cleanup);
process.on("SIGINT", () => process.exit(130));

children.push(spawn("npx", ["tsx", "server.ts"], { env: { ...process.env, NODE_ENV: "production", PORT: String(SERVER_PORT) }, stdio: "ignore" }));
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "aiscripto-browser-check-"));
children.push(spawn(chromePath, ["--headless=new", `--remote-debugging-port=${DEVTOOLS_PORT}`, `--user-data-dir=${profile}`, "--no-first-run", "--no-default-browser-check", "about:blank"], { stdio: "ignore" }));

async function waitFor(url) {
  for (let i = 0; i < 60; i++) {
    try { if ((await fetch(url)).ok) return; } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Timed out waiting for ${url}`);
}
await waitFor(`http://127.0.0.1:${DEVTOOLS_PORT}/json/version`);
await waitFor(`http://localhost:${SERVER_PORT}/`);

const PORT = String(DEVTOOLS_PORT);
const BASE = `http://localhost:${SERVER_PORT}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const version = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json();
const ws = new WebSocket(version.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));

let nextId = 1;
const pending = new Map();
const listeners = [];
ws.addEventListener("message", (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(`${msg.error.message}`)) : resolve(msg.result);
  } else if (msg.method) {
    for (const l of listeners) l(msg);
  }
});
const send = (method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });

async function newPage({ width = 1366, height = 900, mobile = false, light = false } = {}) {
  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  const s = (m, p) => send(m, p, sessionId);
  const log = { console: [], exceptions: [], csp: [], requests: [], docStatus: null, emailPosts: 0 };

  listeners.push((msg) => {
    if (msg.sessionId !== sessionId) return;
    const p = msg.params;
    if (msg.method === "Runtime.consoleAPICalled" && (p.type === "error" || p.type === "warning")) {
      log.console.push(p.args.map((a) => a.value ?? a.description ?? "").join(" ").slice(0, 300));
    }
    if (msg.method === "Runtime.exceptionThrown") log.exceptions.push((p.exceptionDetails.exception?.description || p.exceptionDetails.text).slice(0, 300));
    if (msg.method === "Log.entryAdded" && /Content.Security.Policy|Refused to/i.test(p.entry.text)) log.csp.push(p.entry.text.slice(0, 300));
    if (msg.method === "Network.responseReceived" && p.type === "Document" && log.docStatus === null) log.docStatus = p.response.status;
    if (msg.method === "Network.responseReceived") log.requests.push(`${p.response.status} ${p.response.url.slice(0, 120)}`);
    if (msg.method === "Fetch.requestPaused") {
      const url = p.request.url;
      if (/googletagmanager|google-analytics|doubleclick/.test(url)) {
        s("Fetch.failRequest", { requestId: p.requestId, errorReason: "BlockedByClient" });
      } else if (/aiscripto-email-server/.test(url)) {
        if (p.request.method === "POST") log.emailPosts++;
        const body = Buffer.from(JSON.stringify({ success: true })).toString("base64");
        s("Fetch.fulfillRequest", {
          requestId: p.requestId, responseCode: 200, body,
          responseHeaders: [
            { name: "Content-Type", value: "application/json" },
            { name: "Access-Control-Allow-Origin", value: "*" },
            { name: "Access-Control-Allow-Headers", value: "*" },
            { name: "Access-Control-Allow-Methods", value: "POST, OPTIONS" },
          ],
        });
      } else {
        s("Fetch.continueRequest", { requestId: p.requestId });
      }
    }
  });

  await s("Runtime.enable");
  await s("Log.enable");
  await s("Network.enable");
  await s("Page.enable");
  await s("Fetch.enable", { patterns: [{ urlPattern: "*googletagmanager*" }, { urlPattern: "*google-analytics*" }, { urlPattern: "*doubleclick*" }, { urlPattern: "*aiscripto-email-server*" }] });
  await s("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile });
  // Record every class change on <html> from the very start (for the theme-flash check).
  await s("Page.addScriptToEvaluateOnNewDocument", {
    source: `
      ${light ? "try{localStorage.setItem('theme_explicit','true');localStorage.setItem('theme','light')}catch(e){}" : ""}
      window.__htmlClasses = [];
      new MutationObserver(() => window.__htmlClasses.push(document.documentElement && document.documentElement.className))
        .observe(document, { attributes: true, subtree: true, attributeFilter: ['class'] });
      document.addEventListener('DOMContentLoaded', () => window.__htmlClasses.push('DCL:' + document.documentElement.className));
    `,
  });

  const evaluate = async (expression) => {
    const r = await s("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + " " + (r.exceptionDetails.exception?.description || ""));
    return r.result.value;
  };
  const goto = async (path, wait = 2500) => {
    log.docStatus = null;
    await s("Page.navigate", { url: BASE + path });
    await sleep(wait);
  };
  const key = async (k, code, keyCode) => {
    const text = k === "Enter" ? "\r" : undefined;
    await s("Input.dispatchKeyEvent", { type: "keyDown", key: k, code, windowsVirtualKeyCode: keyCode, text });
    await s("Input.dispatchKeyEvent", { type: "keyUp", key: k, code, windowsVirtualKeyCode: keyCode });
  };
  const close = () => send("Target.closeTarget", { targetId });
  return { s, log, evaluate, goto, key, close };
}

const results = [];
const check = (name, ok, detail = "") => {
  results.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  — " + detail : ""}`);
};
const noise = (log) => [...log.csp, ...log.exceptions, ...log.console.filter((c) => !/BlockedByClient|ERR_BLOCKED_BY_CLIENT/.test(c))];

// 1. Page types: status, title, H1, hydration/CSP/JS errors
const PAGES = [
  ["/", 200], ["/products", 200], ["/products/nexus-agent", 200], ["/services", 200], ["/services/erp", 200],
  ["/solutions/ai-receptionist-for-hvac", 200], ["/industries/healthcare", 200], ["/case-studies/ai-chatbot-customer-service", 200],
  ["/blog", 200], ["/blog/erp-crm-integration-roadmap", 200], ["/events", 200], ["/contact", 200], ["/live-demos", 200],
  ["/about", 200], ["/company", 200 /* 308 -> /about */], ["/insights", 200], ["/global", 200], ["/careers", 200],
  ["/xyz-not-a-page", 404], ["/products/does-not-exist", 404],
];
{
  const page = await newPage();
  for (const [path, expected] of PAGES) {
    page.log.console = []; page.log.exceptions = []; page.log.csp = [];
    await page.goto(path);
    const info = await page.evaluate(`({ title: document.title, h1: document.querySelector('h1')?.textContent?.trim().slice(0, 60), rootLen: document.getElementById('root').innerHTML.length })`);
    const errs = noise(page.log);
    check(`${path} → HTTP ${page.log.docStatus}`, page.log.docStatus === expected, `expected ${expected}; "${info.title}"`);
    check(`${path} renders H1 with no CSP/hydration/JS errors`, Boolean(info.h1) && errs.length === 0, errs.length ? errs.slice(0, 3).join(" | ") : `h1: "${info.h1}"`);
  }
  await page.close();
}

// 2. Chat widget opens and its iframe loads (frame-src CSP)
{
  const page = await newPage();
  await page.goto("/");
  page.log.csp = [];
  await page.evaluate(`document.querySelector('[data-chat-launcher]').click()`);
  await sleep(5000);
  const frame = await page.evaluate(`(() => { const f = document.querySelector('iframe[title]'); return f ? f.src : null })()`);
  const loaded = page.log.requests.some((r) => r.startsWith("200 https://voiceagent-aiscripto.vercel.app"));
  const errorShown = await page.evaluate(`document.body.innerText.includes("Couldn't load the assistant")`);
  // Locally the remote agent's own frame-ancestors rejects localhost; only OUR frame-src matters here.
  const ourCsp = page.log.csp.filter((c) => /frame-src/.test(c));
  check("Chat widget opens; our CSP allows the agent iframe", Boolean(frame) && loaded && !errorShown && ourCsp.length === 0,
    `iframe=${frame ? frame.slice(0, 70) : "none"} loaded=${loaded} errorPanel=${errorShown} csp=${page.log.csp.join(" | ").slice(0, 200)}`);
  await page.close();
}

// 3. Contact form submits (email API intercepted — nothing is really sent)
{
  const page = await newPage();
  await page.goto("/contact");
  page.log.csp = [];
  await page.evaluate(`(() => {
    const set = (id, v) => { const el = document.getElementById(id); const proto = el.tagName === 'SELECT' ? HTMLSelectElement.prototype : el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
      Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, v); el.dispatchEvent(new Event(el.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true })); };
    set('contact-first-name', 'Test'); set('contact-last-name', 'Local'); set('contact-email', 'test@example.com');
    set('contact-phone', '+1 555 000 0000'); set('contact-company', 'Local QA'); set('contact-region', 'north-america');
    set('contact-message', 'Automated local test — please ignore.');
    set('contact-need', 'Custom CRM Development');
  })()`);
  await sleep(300);
  await page.evaluate(`document.querySelector('form button[type=submit]').click()`);
  await sleep(2500);
  const success = await page.evaluate(`document.body.innerText.includes('your message is on its way')`);
  check("Contact form submits and shows thank-you panel", success && page.log.emailPosts === 1 && page.log.csp.length === 0,
    `posts=${page.log.emailPosts} success=${success} csp=${page.log.csp.join(" | ").slice(0, 200)}`);
  await page.close();
}

// 4. Demo booking modal: opens, is a dialog, Esc closes
{
  const page = await newPage();
  await page.goto("/live-demos");
  const opened = await page.evaluate(`(() => { const b = [...document.querySelectorAll('button')].find(b => /sandbox poc|private sandbox/i.test(b.textContent)); if (!b) return 'no-button'; b.click(); return b.textContent.trim().slice(0, 40); })()`);
  await sleep(800);
  const isDialog = await page.evaluate(`Boolean(document.querySelector('[role=dialog][aria-modal=true]'))`);
  const focusInside = await page.evaluate(`Boolean(document.querySelector('[role=dialog]')?.contains(document.activeElement))`);
  await page.key("Escape", "Escape", 27);
  await sleep(600);
  const closed = await page.evaluate(`!document.querySelector('[role=dialog][aria-modal=true]')`);
  check("Demo modal opens as dialog, focus moves inside, Esc closes", isDialog && focusInside && closed, `button="${opened}" dialog=${isDialog} focusInside=${focusInside} closedOnEsc=${closed}`);
  await page.close();
}

// 5. Keyboard mega menu
{
  const page = await newPage();
  await page.goto("/");
  await page.evaluate(`document.getElementById('mega-toggle-Products').focus()`);
  await page.key("Enter", "Enter", 13);
  await sleep(500);
  const expanded = await page.evaluate(`document.getElementById('mega-toggle-Products').getAttribute('aria-expanded')`);
  const panel = await page.evaluate(`Boolean(document.getElementById('mega-panel-Products'))`);
  await page.key("Escape", "Escape", 27);
  await sleep(500);
  const after = await page.evaluate(`document.getElementById('mega-toggle-Products').getAttribute('aria-expanded')`);
  const focusBack = await page.evaluate(`document.activeElement?.id`);
  check("Mega menu opens with Enter, closes with Esc, focus returns", expanded === "true" && panel && after === "false" && focusBack === "mega-toggle-Products",
    `expanded=${expanded} panel=${panel} afterEsc=${after} focus=${focusBack}`);
  await page.close();
}

// 6. Light-mode visitor: no dark flash, no hydration errors, light logo visible
{
  const page = await newPage({ light: true });
  // A light-header page: Home, product, service and the Products/Services hubs use a dark
  // spotlight hero by design, where the navbar intentionally shows the white logo.
  await page.goto("/about", 3000);
  const classes = await page.evaluate(`window.__htmlClasses`);
  const final = await page.evaluate(`document.documentElement.className`);
  const logo = await page.evaluate(`[...document.querySelectorAll('nav img')].filter(i => i.offsetParent !== null).map(i => i.getAttribute('src'))`);
  const errs = noise(page.log);
  const flashedDark = classes.some((c) => /\bdark\b/.test(c));
  check("Light mode: no dark flash, light logo, no hydration errors", !flashedDark && /light/.test(final) && logo.includes("/images/logo.png") && errs.length === 0,
    `classChanges=${JSON.stringify(classes)} final="${final}" visibleLogo=${JSON.stringify(logo)} errors=${errs.slice(0, 2).join(" | ")}`);
  await page.close();
}

// 6b. Desktop navbar fits: the Live Demos button stays inside the viewport
for (const width of [1024, 1280, 1366, 1440]) {
  const page = await newPage({ width, height: 900 });
  await page.goto("/", 1500);
  const r = await page.evaluate(`(() => { const a = [...document.querySelectorAll('nav a')].find(a => /live demos/i.test(a.textContent)); const b = a.getBoundingClientRect(); return { right: Math.round(b.right), vw: document.documentElement.clientWidth }; })()`);
  check(`Desktop navbar fits at ${width}px`, r.right <= r.vw, JSON.stringify(r));
  await page.close();
}

// 7. Mobile: floating WhatsApp and chat buttons don't overlap
{
  const page = await newPage({ width: 360, height: 740, mobile: true });
  await page.goto("/");
  const rects = await page.evaluate(`(() => {
    const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { l: b.left, r: b.right, t: b.top, b: b.bottom, w: b.width }; };
    return { wa: r(document.querySelector('a[aria-label*="WhatsApp"]')), chat: r(document.querySelector('[data-chat-launcher]')), vw: innerWidth };
  })()`);
  let mobileOk = 0;
  const sitemap = await (await fetch(BASE + "/sitemap.xml")).text();
  const allPaths = [...sitemap.matchAll(/<loc>https:\/\/www\.aiscripto\.com([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
  for (const path of allPaths) {
    await page.goto(path, 1500);
    const overflow = await page.evaluate(`(() => {
      const vw = document.documentElement.clientWidth, out = [];
      const clipped = (el) => { for (let a = el; a && a !== document.body; a = a.parentElement) { const cs = getComputedStyle(a); if (cs.position === 'fixed') return true; if (a !== el && cs.overflowX !== 'visible') return true; } return false; };
      for (const el of document.querySelectorAll('body *')) { const b = el.getBoundingClientRect(); if (b.right > vw + 1 && b.width > 0 && !clipped(el)) out.push(Math.round(b.right) + ' ' + el.tagName.toLowerCase() + ' ' + String(el.className.baseVal ?? el.className).slice(0, 70)); }
      return { vw, scrollWidth: document.documentElement.scrollWidth, offenders: out.slice(0, 4) };
    })()`);
    if (overflow.scrollWidth > 361) check(`Mobile (360px) ${path}: no horizontal overflow`, false, JSON.stringify(overflow));
    else mobileOk++;
  }
  check(`Mobile (360px): ${mobileOk}/${allPaths.length} pages have no horizontal overflow`, mobileOk === allPaths.length);
  const overlap = rects.wa && rects.chat && !(rects.wa.r <= rects.chat.l || rects.chat.r <= rects.wa.l || rects.wa.b <= rects.chat.t || rects.chat.b <= rects.wa.t);
  check("Mobile (360px): floating buttons don't overlap", rects.wa && rects.chat && !overlap, JSON.stringify(rects));
  await page.close();
}

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
ws.close();
process.exit(failed.length ? 1 : 0);
