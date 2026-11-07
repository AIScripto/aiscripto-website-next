import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  color: string;
  twinklePhase: number;
  twinkleSpeed: number;
  isAnchor: boolean;
}

interface Pulse {
  starA: number;
  starB: number;
  progress: number;
  speed: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
}

// Global Hubs for the World Map Holographic Arc Network
interface GlobalHub {
  id: string;
  label: string;
  sub: string;
  lat: number;
  lon: number;
}

const GLOBAL_HUBS: GlobalHub[] = [
  { id: 'us', label: 'CALIFORNIA (USA)', sub: 'HQ & Architecture', lat: 37.7, lon: -121.4 },
  { id: 'uk', label: 'UNITED KINGDOM', sub: 'European Client HQ', lat: 51.5, lon: -0.1 },
  { id: 'it', label: 'ITALY', sub: 'Regional Architecture', lat: 43.3, lon: 13.0 },
  { id: 'pk', label: 'PAKISTAN', sub: 'Technology Delivery Center', lat: 31.5, lon: 74.3 },
];

/**
 * CosmicConstellation:
 * High-performance HTML5 Canvas rendering a living cosmic network:
 * - Universe Holographic Celestial Halo & World Map Mesh with fine light gray lines
 * - Dual-Shore Global Infrastructure flight arcs connecting California, UK, Italy, and Pakistan
 * - Twinkling shining stars with starlight diffraction spikes
 * - Constellation network with elegant light gray / silver connection lines
 * - Traveling starlight energy pulses (photons) traversing lines between connected stars
 * - Periodic shooting stars streaking across the cosmic sky
 * - Interactive mouse starlight magnetism (desktop)
 * - Auto-pauses when scrolled out of view or tab hidden
 * - Respects prefers-reduced-motion
 */
export default function CosmicConstellation({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    if (typeof canvas.getContext !== 'function') return;
    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas.getContext('2d', { alpha: true });
    } catch {
      return;
    }
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;

    // Mouse coordinates relative to hero canvas
    let mouse: { x: number; y: number; active: boolean } = { x: -1000, y: -1000, active: false };

    // Star color palette: platinum, diamond white, silver, starlight sky, stardust gold
    const STAR_COLORS = [
      'rgba(241, 245, 249,',   // slate-100 / platinum
      'rgba(255, 255, 255,',   // pure diamond white
      'rgba(226, 232, 240,',   // slate-200 / silver
      'rgba(186, 230, 253,',   // sky-200 starlight
      'rgba(254, 240, 138,',   // gold stardust accent
    ];

    let stars: Star[] = [];
    let pulses: Pulse[] = [];
    let shootingStar: ShootingStar = {
      x: 0,
      y: 0,
      length: 0,
      speed: 0,
      angle: 0,
      opacity: 0,
      active: false,
    };
    let nextShootingStarTime = Date.now() + 2500;

    // Resize canvas with devicePixelRatio for razor-sharp Retina rendering
    const handleResize = () => {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      initStars();
    };

    const initStars = () => {
      if (width === 0 || height === 0) return;

      const isMobile = width < 768;
      const count = isMobile ? 36 : Math.min(Math.floor((width * height) / 14000), 80);

      stars = [];
      for (let i = 0; i < count; i++) {
        const isAnchor = Math.random() < 0.14; // ~14% shining beacon stars
        const radius = isAnchor
          ? 2.2 + Math.random() * 1.2
          : Math.random() < 0.25
          ? 1.5 + Math.random() * 0.6
          : 0.8 + Math.random() * 0.6;

        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (isAnchor ? 0.12 : 0.22),
          vy: (Math.random() - 0.5) * (isAnchor ? 0.12 : 0.22),
          radius,
          baseAlpha: isAnchor ? 0.75 + Math.random() * 0.25 : 0.35 + Math.random() * 0.45,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.02 + Math.random() * 0.035,
          isAnchor,
        });
      }

      pulses = [];
    };

    const spawnShootingStar = () => {
      shootingStar = {
        x: Math.random() * width * 0.8 + width * 0.1,
        y: Math.random() * (height * 0.35),
        length: 70 + Math.random() * 60,
        speed: 12 + Math.random() * 6,
        angle: (Math.PI / 4) + (Math.random() - 0.5) * 0.2, // ~45 deg diagonal streak
        opacity: 0.9,
        active: true,
      };
      nextShootingStarTime = Date.now() + 4500 + Math.random() * 4000;
    };

    // Draw single star with optional diffraction cross-flare on anchor stars
    const drawStar = (star: Star, currentAlpha: number) => {
      const { x, y, radius, color, isAnchor } = star;

      // Core star body
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `${color}${currentAlpha})`;
      ctx.fill();

      // Anchor stars have a starlight diffraction flare and soft radial aura
      if (isAnchor && currentAlpha > 0.4) {
        // Outer soft glow halo
        const haloGrad = ctx.createRadialGradient(x, y, 0, x, y, radius * 3.5);
        haloGrad.addColorStop(0, `${color}${currentAlpha * 0.4})`);
        haloGrad.addColorStop(1, `${color}0)`);
        ctx.beginPath();
        ctx.arc(x, y, radius * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = haloGrad;
        ctx.fill();

        // 4-Point cross-flare diffraction spikes
        ctx.strokeStyle = `${color}${currentAlpha * 0.6})`;
        ctx.lineWidth = 0.8;
        const spikeLen = radius * 4.2;

        ctx.beginPath();
        ctx.moveTo(x - spikeLen, y);
        ctx.lineTo(x + spikeLen, y);
        ctx.moveTo(x, y - spikeLen);
        ctx.lineTo(x, y + spikeLen);
        ctx.stroke();
      }
    };

    /**
     * Draw Universe Holographic Celestial Halo with fine, architectural light gray lines:
     * - Multi-layered tilted orbital rings with concentric dashed geometry
     * - Planetary astrolabe halo horizon
     * - Soft central starlight nebula glow
     * - Rotating orbital satellite beacons
     */
    const drawHoloCelestial = (t: number) => {
      const isMobile = width < 768;
      const cx = width * (isMobile ? 0.5 : 0.52);
      const cy = height * 0.46;
      const baseR = Math.min(width * (isMobile ? 0.42 : 0.38), height * 0.46);

      ctx.save();

      // 1. Central ambient starlight halo nebula
      const haloGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR * 1.35);
      haloGlow.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
      haloGlow.addColorStop(0.35, 'rgba(226, 232, 240, 0.025)');
      haloGlow.addColorStop(0.7, 'rgba(56, 189, 248, 0.015)');
      haloGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = haloGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, baseR * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // Slow majestic rotation angles
      const rot1 = (t * 0.00018) % (Math.PI * 2);
      const rot2 = (-t * 0.00014) % (Math.PI * 2);

      // Helper for clean elliptical wireframe rings
      const drawRing = (
        rx: number,
        ry: number,
        angle: number,
        color: string,
        widthPx: number,
        dash?: number[]
      ) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        if (dash) ctx.setLineDash(dash);
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth = widthPx;
        ctx.stroke();
        ctx.restore();
      };

      // 2. Primary Outer Planetary Halo Ring (Tilted, architectural light gray)
      drawRing(
        baseR * 1.38,
        baseR * 0.46,
        -0.38 + rot1 * 0.08,
        'rgba(226, 232, 240, 0.18)',
        0.85
      );

      // 3. Secondary Concentric Orbital Ring (Fine dashed light gray)
      drawRing(
        baseR * 1.18,
        baseR * 0.39,
        -0.38 + rot1 * 0.08,
        'rgba(203, 213, 225, 0.14)',
        0.75,
        [4, 6]
      );

      // 4. Counter-tilted Celestial Horizon Ring (Light gray)
      drawRing(
        baseR * 0.96,
        baseR * 0.32,
        0.32 + rot2 * 0.08,
        'rgba(226, 232, 240, 0.15)',
        0.75
      );

      // 5. Inner Celestial Equator Ring (Dotted light gray)
      drawRing(
        baseR * 0.66,
        baseR * 0.22,
        0.32 + rot2 * 0.08,
        'rgba(241, 245, 249, 0.16)',
        0.75,
        [3, 5]
      );

      // 6. Spherical Wireframe Meridian Arc (Longitudinal curve, subtle light gray)
      drawRing(
        baseR * 0.28,
        baseR * 0.84,
        -0.15 + rot1 * 0.05,
        'rgba(203, 213, 225, 0.11)',
        0.75,
        [2, 6]
      );

      // 7. Holographic Orbital Nodes (Satellites / Starlight beacons gliding along Ring 2)
      const nodeCount = isMobile ? 2 : 3;
      for (let k = 0; k < nodeCount; k++) {
        const nodeAngle = rot1 * 0.5 + (k * (Math.PI * 2)) / nodeCount;
        const nx = Math.cos(nodeAngle) * (baseR * 1.38);
        const ny = Math.sin(nodeAngle) * (baseR * 0.46);

        // Rotate (nx, ny) by ring tilt angle
        const tilt = -0.38 + rot1 * 0.08;
        const rnx = cx + nx * Math.cos(tilt) - ny * Math.sin(tilt);
        const rny = cy + nx * Math.sin(tilt) + ny * Math.cos(tilt);

        // Glowing white starlight beacon
        ctx.beginPath();
        ctx.arc(rnx, rny, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();

        // Subtle silver starlight flare
        ctx.beginPath();
        ctx.arc(rnx, rny, 5.0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(226, 232, 240, 0.3)';
        ctx.fill();
      }

      ctx.restore();
    };

    /**
     * Draw Holographic World Map & Global Infrastructure Arcs:
     * Connects California (USA) ↔ UK ↔ Italy ↔ Pakistan (Technology Delivery Center)
     */
    const drawWorldMapHolo = (t: number) => {
      const isMobile = width < 768;
      const mapW = isMobile ? width * 0.94 : width * 0.82;
      const mapH = mapW * 0.44;
      const mapLeft = (width - mapW) / 2;
      const mapTop = height * 0.14;

      ctx.save();

      // Project spherical coordinates into 2D canvas coordinates
      const project = (lat: number, lon: number) => {
        const x = mapLeft + ((lon + 180) / 360) * mapW;
        const y = mapTop + ((90 - lat) / 180) * mapH;
        return { x, y };
      };

      // 1. Subtle latitude & longitude grid lines in architectural light gray
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.05)';
      ctx.lineWidth = 0.5;
      ctx.setLineDash([2, 5]);

      // Latitudes
      for (const lat of [-30, 0, 30, 60]) {
        const { y } = project(lat, 0);
        ctx.beginPath();
        ctx.moveTo(mapLeft, y);
        ctx.lineTo(mapLeft + mapW, y);
        ctx.stroke();
      }

      // Longitudes
      for (const lon of [-120, -60, 0, 60, 120]) {
        const { x } = project(0, lon);
        ctx.beginPath();
        ctx.moveTo(x, mapTop);
        ctx.lineTo(x, mapTop + mapH);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // 2. Global Hub Positions
      const hubCoords = GLOBAL_HUBS.map((h) => ({
        ...h,
        ...project(h.lat, h.lon),
      }));

      // Connections between global dual-shore infrastructure
      const connections: [number, number][] = [
        [0, 1], // California ↔ UK
        [1, 2], // UK ↔ Italy
        [2, 3], // Italy ↔ Pakistan
        [1, 3], // UK ↔ Pakistan (Direct delivery corridor)
      ];

      // Draw Great-Circle curved flight arcs between hubs
      for (let c = 0; c < connections.length; c++) {
        const [fromIdx, toIdx] = connections[c];
        const hA = hubCoords[fromIdx];
        const hB = hubCoords[toIdx];
        if (!hA || !hB) continue;

        // Elevated control point for bezier arch
        const midX = (hA.x + hB.x) / 2;
        const midY = (hA.y + hB.y) / 2 - Math.abs(hA.x - hB.x) * 0.18;

        // Base flight arc in delicate light gray
        ctx.beginPath();
        ctx.moveTo(hA.x, hA.y);
        ctx.quadraticCurveTo(midX, midY, hB.x, hB.y);
        ctx.strokeStyle = 'rgba(226, 232, 240, 0.16)';
        ctx.lineWidth = 0.85;
        ctx.stroke();

        // Animated traveling starlight photon on the arc
        if (!reducedMotion) {
          const arcSpeed = 0.00035;
          const arcProgress = ((t * arcSpeed) + (c * 0.25)) % 1;

          // Quadratic bezier interpolation: B(u) = (1-u)^2 * P0 + 2*(1-u)*u * P1 + u^2 * P2
          const u = arcProgress;
          const invU = 1 - u;
          const px = invU * invU * hA.x + 2 * invU * u * midX + u * u * hB.x;
          const py = invU * invU * hA.y + 2 * invU * u * midY + u * u * hB.y;

          // Photon head
          ctx.beginPath();
          ctx.arc(px, py, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.fill();

          // Photon aura
          ctx.beginPath();
          ctx.arc(px, py, 4.0, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
          ctx.fill();
        }
      }

      // Draw Global Hub Pins
      for (let i = 0; i < hubCoords.length; i++) {
        const hub = hubCoords[i];
        const pulse = Math.sin(t * 0.003 + i) * 0.3 + 0.7;

        // Outer pulsing ring
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, 6.0 * pulse, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
        ctx.lineWidth = 0.75;
        ctx.stroke();

        // Hub core starlight dot
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.fill();

        // No text labels: at hero scale they collided with the H1 and were too small to read.
        // Office locations are stated in real text elsewhere (About, Global, footer).
      }

      ctx.restore();
    };

    const render = (timestamp: number = 0) => {
      if (!ctx || width === 0 || height === 0) return;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Universe Holographic Celestial Halo with light gray lines
      drawHoloCelestial(timestamp);

      // 2. Draw World Map Hologram with global infrastructure arcs (California, UK, Italy, Pakistan)
      drawWorldMapHolo(timestamp);

      const maxDist = width < 768 ? 100 : 135;
      const maxDistSq = maxDist * maxDist;
      const mouseDistSq = 140 * 140;

      // 3. Update and draw star nodes
      const starAlphas: number[] = new Array(stars.length);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        if (!reducedMotion) {
          star.x += star.vx;
          star.y += star.vy;
          star.twinklePhase += star.twinkleSpeed;

          // Wrap around edges smoothly
          if (star.x < -10) star.x = width + 10;
          if (star.x > width + 10) star.x = -10;
          if (star.y < -10) star.y = height + 10;
          if (star.y > height + 10) star.y = -10;
        }

        // Twinkle luminance calculation
        const twinkleFactor = Math.sin(star.twinklePhase) * 0.35 + 0.65;
        const alpha = Math.min(Math.max(star.baseAlpha * twinkleFactor, 0.15), 1.0);
        starAlphas[i] = alpha;

        drawStar(star, alpha);
      }

      // 4. Draw constellation network with refined light gray lines
      const connectedPairs: [number, number][] = [];

      for (let i = 0; i < stars.length; i++) {
        const starA = stars[i];
        for (let j = i + 1; j < stars.length; j++) {
          const starB = stars[j];
          const dx = starA.x - starB.x;
          const dy = starA.y - starB.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const proximity = 1 - dist / maxDist;
            const lineAlpha = proximity * 0.22 * ((starAlphas[i] + starAlphas[j]) / 2);

            ctx.beginPath();
            ctx.moveTo(starA.x, starA.y);
            ctx.lineTo(starB.x, starB.y);
            // Architectural light gray / silver line with proximity falloff
            ctx.strokeStyle = `rgba(226, 232, 240, ${lineAlpha.toFixed(3)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();

            connectedPairs.push([i, j]);
          }
        }

        // 5. Subtle interactive mouse connection lines (light gray starlight)
        if (mouse.active) {
          const mdx = starA.x - mouse.x;
          const mdy = starA.y - mouse.y;
          const mDistSq = mdx * mdx + mdy * mdy;

          if (mDistSq < mouseDistSq) {
            const mDist = Math.sqrt(mDistSq);
            const mProximity = 1 - mDist / 140;
            const mAlpha = mProximity * 0.35 * starAlphas[i];

            ctx.beginPath();
            ctx.moveTo(starA.x, starA.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(241, 245, 249, ${mAlpha.toFixed(3)})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      // 6. Occasionally spawn energy pulse along a connected line
      if (!reducedMotion && connectedPairs.length > 0 && pulses.length < 8 && Math.random() < 0.04) {
        const pair = connectedPairs[Math.floor(Math.random() * connectedPairs.length)];
        pulses.push({
          starA: pair[0],
          starB: pair[1],
          progress: 0,
          speed: 0.012 + Math.random() * 0.016,
        });
      }

      // 7. Render traveling energy pulses (silver-white photons)
      if (!reducedMotion) {
        for (let p = pulses.length - 1; p >= 0; p--) {
          const pulse = pulses[p];
          pulse.progress += pulse.speed;

          if (pulse.progress >= 1) {
            pulses.splice(p, 1);
            continue;
          }

          const a = stars[pulse.starA];
          const b = stars[pulse.starB];
          if (!a || !b) {
            pulses.splice(p, 1);
            continue;
          }

          const px = a.x + (b.x - a.x) * pulse.progress;
          const py = a.y + (b.y - a.y) * pulse.progress;
          const pulseAlpha = Math.sin(pulse.progress * Math.PI) * 0.85;

          // Traveling glowing photon dot
          ctx.beginPath();
          ctx.arc(px, py, 1.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${pulseAlpha})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(226, 232, 240, ${pulseAlpha * 0.35})`;
          ctx.fill();
        }
      }

      // 8. Shooting star management
      if (!reducedMotion) {
        if (!shootingStar.active && Date.now() > nextShootingStarTime) {
          spawnShootingStar();
        }

        if (shootingStar.active) {
          const { x, y, length, speed, angle, opacity } = shootingStar;
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          const tailX = x - cos * length;
          const tailY = y - sin * length;

          const meteorGrad = ctx.createLinearGradient(tailX, tailY, x, y);
          meteorGrad.addColorStop(0, 'rgba(226, 232, 240, 0)');
          meteorGrad.addColorStop(0.7, `rgba(226, 232, 240, ${opacity * 0.45})`);
          meteorGrad.addColorStop(1, `rgba(255, 255, 255, ${opacity})`);

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(x, y);
          ctx.strokeStyle = meteorGrad;
          ctx.lineWidth = 1.4;
          ctx.stroke();

          // Leading bright head
          ctx.beginPath();
          ctx.arc(x, y, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fill();

          shootingStar.x += cos * speed;
          shootingStar.y += sin * speed;
          shootingStar.opacity -= 0.012;

          if (shootingStar.opacity <= 0 || shootingStar.x > width + 100 || shootingStar.y > height + 100) {
            shootingStar.active = false;
          }
        }
      }

      if (!reducedMotion && isVisible) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Track mouse over hero container
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    // Initial setup
    handleResize();
    window.addEventListener('resize', handleResize);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Initial render
    render(0);

    // IntersectionObserver: Pause RAF when hero scrolls out of view
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry?.isIntersecting ?? true;
        if (isVisible && !reducedMotion) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Pause RAF when document tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        isVisible = true;
        if (!reducedMotion) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(render);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
