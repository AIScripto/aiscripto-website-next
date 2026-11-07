import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, X, AlertTriangle, RefreshCw, ExternalLink } from "lucide-react";
import { buttonClasses } from './ui/Button';
import { cn } from '../utils/cn';
import { useScrolledPast, mobileRevealClasses } from '../hooks/useScrolledPast';

const RAW_ORIGIN =
  import.meta.env.VITE_CHATBOT_ORIGIN ||
  "https://voiceagent-aiscripto.vercel.app";

// Normalize origin to ensure no trailing slash, guaranteeing postMessage event.origin matching
const AGENT_ORIGIN = (() => {
  try {
    return new URL(RAW_ORIGIN).origin;
  } catch {
    return RAW_ORIGIN.replace(/\/+$/, "");
  }
})();

const AGENT_TENANT = import.meta.env.VITE_CHATBOT_TENANT || "ai-scripto";
const AGENT_TOKEN = import.meta.env.VITE_CHATBOT_TOKEN || "testToken123Abcd";
const AGENT_WIDTH = import.meta.env.VITE_CHATBOT_WIDTH || "420px";
const AGENT_HEIGHT = import.meta.env.VITE_CHATBOT_HEIGHT || "580px";

// If the iframe hasn't reported a successful load within this window, assume it
// was blocked (e.g. CSP frame-src, network failure) and show a fallback UI.
const LOAD_TIMEOUT_MS = 12000;

export default function ChatWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const revealed = useScrolledPast();
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  // Bumping this remounts the iframe to retry a failed load.
  const [attempt, setAttempt] = useState(0);
  // Shrink the launcher to its icon while the footer is on screen, so it never covers footer links.
  const [footerVisible, setFooterVisible] = useState(false);
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting), { rootMargin: '0px 0px -40px 0px' });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);
  const timeoutRef = useRef<number | null>(null);

  const chatUrl = useMemo(() => {
    const url = new URL("/voice", AGENT_ORIGIN);
    url.searchParams.set("tenant", AGENT_TENANT);
    url.searchParams.set("token", AGENT_TOKEN);
    return url.toString();
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== AGENT_ORIGIN) return;
      // Any message from the agent origin proves the frame loaded and is alive.
      setStatus("ready");
      if (event.data?.type === "voice-agent:close") setIsChatOpen(false);
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Arm a load-timeout whenever the panel is opened or a retry is triggered.
  useEffect(() => {
    if (!isChatOpen) return;
    setStatus("loading");
    timeoutRef.current = window.setTimeout(() => {
      setStatus((prev) => (prev === "ready" ? prev : "error"));
    }, LOAD_TIMEOUT_MS);

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isChatOpen, attempt]);

  const handleLoad = () => {
    // A cross-origin frame fires `load` on success; blocked frames generally
    // don't, so treat this as the frame being reachable.
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setStatus((prev) => (prev === "error" ? prev : "ready"));
  };

  const retry = () => {
    setStatus("loading");
    setAttempt((n) => n + 1);
  };

  return (
    <>
      {isChatOpen ? (
        <div
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 max-h-[calc(100dvh-2rem)] max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-border bg-background shadow-2xl"
          style={{ width: AGENT_WIDTH, height: AGENT_HEIGHT }}
          role="dialog"
          aria-label="AI support agent"
        >
          {/* Host-owned header: closing never depends on the embedded agent. */}
          <div className="flex h-11 items-center justify-between border-b border-border bg-card px-4">
            <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Bot className="h-4 w-4 text-brand-primary-ink" aria-hidden="true" />
              AI support agent
            </span>
            <button
              type="button"
              onClick={() => setIsChatOpen(false)}
              className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close assistant"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <iframe
            key={attempt}
            src={chatUrl}
            title="AI Voice Support Chatbot"
            onLoad={handleLoad}
            className="h-[calc(100%-2.75rem)] w-full border-0"
            allow="microphone; autoplay"
          />
          {status === "error" && (
            <div className="absolute inset-x-0 bottom-0 top-11 z-20 flex flex-col items-center justify-center gap-4 bg-background px-6 text-center">
              <AlertTriangle className="h-10 w-10 text-amber-700 dark:text-amber-500" />
              <div className="space-y-1">
                <p className="font-semibold text-foreground">
                  Couldn't load the assistant
                </p>
                <p className="text-sm text-muted-foreground">
                  The voice agent didn't respond. This is usually a connection
                  or browser-security (CSP) block.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={retry}
                  className={buttonClasses('primary', 'md')}
                >
                  <RefreshCw className="h-4 w-4" />
                  Try again
                </button>
                <a
                  href={chatUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-muted"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open in new tab
                </a>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsChatOpen(true)}
          className={cn(
            "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 inline-flex h-12 w-12 items-center justify-center gap-2 rounded-full bg-primary font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:opacity-90 cursor-pointer",
            !footerVisible && "sm:h-auto sm:w-auto sm:px-6 sm:py-3.5",
            mobileRevealClasses(revealed),
          )}
          aria-label="Open AI support agent"
          data-chat-launcher=""
        >
          <Bot className="h-5 w-5" aria-hidden="true" />
          {!footerVisible && <span className="hidden sm:inline">AI support agent</span>}
        </button>
      )}
    </>
  );
}
