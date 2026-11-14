"use client";

import { useEffect, useRef } from "react";

/** Événement dataLayer, consommé par les deux containers GTM. */
export function pushEvent(name: string, params?: Record<string, unknown>) {
  const w = window as { dataLayer?: object[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: name, ...params });
}

/** Pixel Meta en direct : ne dépend pas du mapping GTM. No-op si fbq absent. */
export function fbqTrack(name: string, params?: Record<string, unknown>) {
  const w = window as unknown as { fbq?: (...args: unknown[]) => void };
  if (typeof w.fbq === "function") w.fbq("track", name, params);
}

/**
 * ViewContent, une seule fois par chargement, quand la moitié de la page a
 * été parcourue. Les pages courtes atteignent ce seuil dès l'ouverture : on
 * laisse donc 2 s au pixel (GTM ou fallback local) pour s'initialiser avant
 * la première vérification, sinon l'événement partirait dans le vide.
 */
export function useViewContent(contentName: string) {
  const sentRef = useRef(false);

  useEffect(() => {
    const check = () => {
      if (sentRef.current) return;
      const total = document.body.scrollHeight;
      if (total <= 0) return;
      if ((window.scrollY + window.innerHeight) / total < 0.5) return;

      sentRef.current = true;
      pushEvent("ViewContent", { content_name: contentName });
      fbqTrack("ViewContent", { content_name: contentName });
      window.removeEventListener("scroll", check);
    };

    const initial = window.setTimeout(check, 2000);
    window.addEventListener("scroll", check, { passive: true });
    return () => {
      window.clearTimeout(initial);
      window.removeEventListener("scroll", check);
    };
  }, [contentName]);
}
