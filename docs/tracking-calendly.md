# Tracking Calendly — attribution UTM

Concerne `lp-formation-auto-entrepreneur` (Pixel Meta `3020497201339683`).

## Ce qui se passe

1. **Arrivée sur la LP** — les `utm_*` de l'URL sont mémorisés en `sessionStorage`
   (ils survivent à une navigation qui perdrait la query string).
2. **Clic CTA** — l'URL du popup Calendly est construite avec ces `utm_*`.
   Calendly les stocke sur la fiche de l'invité : chaque RDV est rattachable à sa
   campagne dans Calendly et dans le CRM.
3. **RDV pris** — le widget Calendly envoie `calendly.event_scheduled` par
   `postMessage` ; la LP pousse `Schedule` dans le dataLayer et l'envoie au Pixel.

## Points connus

- **Tout est côté navigateur.** Ce qui est bloqué par un adblock ou ITP est perdu,
  et l'event `Schedule` part sans donnée de matching (e-mail, téléphone). Pour le
  récupérer il faudrait un webhook Calendly `invitee.created` relayé en Conversions
  API côté serveur — retiré volontairement de cette implémentation.
- Un container GTM pousse déjà un event `calendly` sur toutes les LP : le code de la
  LP ne le duplique pas, il n'ajoute que `Schedule`.
- L'event `Lead` est envoyé au **clic sur le CTA** (ouverture du popup), pas à la
  prise de RDV. Si un tag GTM le mappe en `Lead` Meta, les campagnes optimisent sur
  l'intention, pas sur le RDV — préférer `Schedule` comme event de conversion.
- Le listener `postMessage` n'accepte que l'origine `https://calendly.com`.
