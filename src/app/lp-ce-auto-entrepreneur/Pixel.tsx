"use client";

import { useEffect } from "react";

/**
 * Pixel Meta, chargé après le premier rendu et en tâche de fond :
 * il ne doit pas entrer en concurrence avec l'affichage de la page.
 */
export default function Pixel() {
  useEffect(() => {
    const w = window as unknown as Record<string, unknown>;
    if (w.fbq) return;

    const load = () => {
      const f = function (...args: unknown[]) {
        const self = f as unknown as { callMethod?: (...a: unknown[]) => void; queue: unknown[] };
        if (self.callMethod) self.callMethod(...args);
        else self.queue.push(args);
      } as unknown as Record<string, unknown> & ((...a: unknown[]) => void);
      f.push = f; f.loaded = true; f.version = "2.0"; f.queue = [];
      w.fbq = w._fbq = f;
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(s);
      (w.fbq as (...a: unknown[]) => void)("init", "3020497201339683");
      (w.fbq as (...a: unknown[]) => void)("track", "PageView");
    };

    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: object) => number }).requestIdleCallback;
    if (ric) ric(load, { timeout: 3000 });
    else setTimeout(load, 1200);
  }, []);

  return null;
}
