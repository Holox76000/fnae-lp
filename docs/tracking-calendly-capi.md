# Tracking Calendly — attribution UTM + Conversions API

Concerne `lp-formation-auto-entrepreneur` (Pixel Meta `3020497201339683`).

## Ce qui se passe

1. **Arrivée sur la LP** — les `utm_*` de l'URL sont mémorisés en `sessionStorage`,
   un `leadId` (UUID) est généré, `_fbp` / `_fbc` sont lus en cookie (`_fbc`
   reconstruit depuis `fbclid` s'il n'existe pas encore).
2. **Clic CTA** — l'URL Calendly est construite avec les `utm_*` + un champ
   `salesforce_uuid = leadId~fbp~fbc`. Calendly renvoie ces champs tels quels dans
   le webhook (`payload.tracking`).
3. **RDV pris** — le navigateur envoie `Schedule` au Pixel avec `eventID = leadId`.
4. **Webhook `invitee.created`** — `netlify/functions/calendly-webhook.mts` vérifie
   la signature Calendly puis renvoie `Schedule` en Conversions API avec le même
   `event_id` et les données de matching hashées (e-mail, téléphone, prénom, nom)
   + `fbp` / `fbc`.

Meta dédoublonne sur `event_name` + `event_id` : une seule conversion comptée. Si
le navigateur est bloqué (adblock, ITP, Safari), seul l'event serveur arrive — et
il porte l'e-mail, donc l'attribution tient.

Côté Calendly/CRM, chaque RDV porte désormais sa campagne (`utm_campaign`, etc.)
dans la fiche de l'invité.

## Configuration requise (une fois)

### 1. Variables d'environnement Netlify

Site `fnae-lp` → *Site configuration → Environment variables* :

| Variable | Valeur |
|---|---|
| `META_CAPI_TOKEN` | Events Manager → Paramètres → Conversions API → *Générer un token d'accès* |
| `CALENDLY_WEBHOOK_SIGNING_KEY` | renvoyé à la création du webhook (étape 2) |
| `META_PIXEL_ID` | optionnel (défaut : `3020497201339683`) |
| `META_TEST_EVENT_CODE` | optionnel, pour l'onglet « Test des events » |

Sans `META_CAPI_TOKEN` ni `CALENDLY_WEBHOOK_SIGNING_KEY`, la fonction répond 500 et
ne casse rien côté LP (le Pixel navigateur continue de tourner seul).

### 2. Créer le webhook Calendly

Token perso : https://calendly.com/integrations/api_webhooks (plan Standard minimum).

```bash
CALENDLY_TOKEN="<personal access token>"

# Récupérer l'URI de l'organisation
curl -s https://api.calendly.com/users/me \
  -H "Authorization: Bearer $CALENDLY_TOKEN" | jq -r .resource.current_organization

# Créer l'abonnement (remplacer ORG_URI)
curl -s -X POST https://api.calendly.com/webhook_subscriptions \
  -H "Authorization: Bearer $CALENDLY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://lp.fnae.fr/api/calendly-webhook",
    "events": ["invitee.created"],
    "organization": "ORG_URI",
    "scope": "organization"
  }' | jq
```

La réponse contient la clé de signature → à mettre dans
`CALENDLY_WEBHOOK_SIGNING_KEY`, puis redéployer.

### 3. Vérifier

- Events Manager → *Test des events* : renseigner `META_TEST_EVENT_CODE`, prendre un
  RDV de test → deux receptions `Schedule` (Navigateur + Serveur) fusionnées en une.
- Logs Netlify → `calendly-webhook` : `Schedule envoyé { leadId, utm_campaign, matching }`.
- Qualité de l'appariement : Events Manager → Schedule → *Qualité de la
  correspondance des events*.

## Points connus

- Un container GTM pousse déjà un event `calendly` sur toutes les LP : le code de la
  LP ne le duplique pas, il n'ajoute que `Schedule`.
- L'event `Lead` est envoyé au **clic sur le CTA** (ouverture du popup), pas à la
  prise de RDV. Si un tag GTM le mappe en `Lead` Meta, les campagnes optimisent sur
  l'intention, pas sur le RDV — préférer `Schedule` comme event de conversion.
- Un RDV pris hors LP (lien direct, e-mail) arrive sans `leadId` : l'event serveur
  part quand même, sans déduplication (il n'y a rien à dédoublonner).
- `invitee.canceled` est acquitté sans rien envoyer (Meta n'a pas d'event standard
  d'annulation).
