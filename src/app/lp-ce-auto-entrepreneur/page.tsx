import Pixel from "./Pixel";
import Pricing from "./Pricing";

const LINKS = {
  essentielAnnuel: "https://fnae.fr/adhesion/essentiel-annuel/",
  essentielMensuel: "https://fnae.fr/adhesion/essentiel-mensuel/",
  proMensuel: "https://fnae.fr/adhesion/pro-mensuel/",
  proAnnuel: "https://fnae.fr/adhesion/pro-annuel/",
  premiumMensuel: "https://fnae.fr/adhesion/premium-mensuel/",
  premiumAnnuel: "https://fnae.fr/adhesion/premium-annuel/",
};

const faqs = [
  {
    q: "Comment j'accède aux réductions ?",
    a: "Dès votre adhésion validée, vous recevez un accès à votre espace adhérent qui contient le catalogue complet des +350 enseignes. Vous générez vos codes promo ou e-billets directement depuis la plateforme, en quelques clics.",
  },
  {
    q: "Les réductions sont-elles cumulables avec d'autres promos ?",
    a: "Cela dépend de chaque partenaire. Pour la majorité d'entre eux, les réductions FNAE sont indépendantes des promotions publiques et cumulables.",
  },
  {
    q: "Quels partenaires exactement ?",
    a: "Plus de 350 enseignes et lieux de loisirs, réparties en 25 catégories : cinéma (Pathé, UGC, CGR, Kinepolis), grands parcs (Disneyland Paris, Futuroscope, Parc Astérix), zoos et aquariums, spas et thermes, salles de sport (Fitness Park, KeepCool, Neoness), grande distribution (Carrefour, E.Leclerc, Auchan), mode (Adidas, Zalando, H&M), abonnements (Netflix, Deezer), et la billetterie spectacles avec des milliers de dates partout en France.",
  },
  {
    q: "Les offres assurance et mutuelle sont-elles incluses dans l'adhésion ?",
    a: "Non : ce sont des contrats souscrits directement auprès de nos partenaires (Coover, Mutami). Votre adhésion FNAE vous donne accès aux conditions négociées : tarifs préférentiels, remises adhérent et frais offerts selon les partenaires.",
  },
  {
    q: "Comment je profite des conditions adhérent chez les partenaires ?",
    a: "La plupart des offres s'activent depuis votre espace adhérent, une fois connecté : vous accédez au lien partenaire qui applique automatiquement les conditions FNAE (par exemple la remise de 10 % chez Coover).",
  },
  {
    q: "Puis-je passer à une formule supérieure plus tard ?",
    a: "Oui, à tout moment depuis votre espace membre. La différence de tarif est calculée au prorata.",
  },
  {
    q: "Puis-je résilier ?",
    a: "Oui, à tout moment. L'adhésion Pro est sans engagement, résiliable depuis votre espace membre.",
  },
];

// Logos du bandeau hero : vectoriels monochromes uniquement (aucun bitmap
// encapsulé), pour supporter l'inversion en blanc sans pavé opaque.
// `wide` distingue les logotypes horizontaux des marques carrées, qui n'ont
// pas la même hauteur optique à largeur égale.
const partners = [
  { name: "Disneyland Paris", logo: "/logos/disneylandparis.svg", wide: true },
  { name: "Pathé", logo: "/logos/pathe.svg", wide: false },
  { name: "Carrefour", logo: "/logos/carrefour.svg", wide: false },
  { name: "Decathlon", logo: "/logos/decathlon.svg", wide: true },
  { name: "Netflix", logo: "/logos/netflix.svg", wide: false },
  { name: "Spotify", logo: "/logos/spotify.svg", wide: false },
  { name: "SNCF", logo: "/logos/sncf.svg", wide: false },
  { name: "Air France", logo: "/logos/airfrance.svg", wide: false },
  { name: "Pierre & Vacances", logo: "/logos/pierrevacances.svg", wide: true },
  { name: "Belambra", logo: "/logos/belambra.svg", wide: true },
  { name: "Kiloutou", logo: "/logos/kiloutou.svg", wide: true },
];

// Offres négociées avec les partenaires pros (hors club réductions)
const insuranceOffers = [
  {
    name: "Coover",
    tags: ["RC Pro", "Prévoyance", "Mutuelle"],
    price: "RC Pro dès 11,50 € / mois",
    desc: "Néo-assurance 100 % digitale : contrats négociés auprès de plus de 30 assureurs, un expert joignable par téléphone, e-mail ou chat, devis et attestation en quelques minutes.",
    perk: "−10 % sur votre prime d'assurance",
  },
  {
    name: "Mutami",
    tags: ["Mutuelle", "Prévoyance"],
    price: "dès 33,04 € / mois",
    desc: "Mutuelle régionale indépendante (depuis 1962) et 20 agences de proximité. Tiers payant complet, médecines douces dès le 2ᵉ niveau, téléconsultation illimitée et un conseiller dédié.",
    perk: "Offre exclusive réservée aux adhérents FNAE",
  },
];

const otherOffers = [
  {
    title: "Banque & encaissement",
    icon: "💳",
    items: [
      { name: "Banque Populaire", desc: "Compte professionnel" },
      { name: "L by LCL Pro", desc: "Banque en ligne pro" },
      { name: "SumUp", desc: "Terminal de paiement" },
      { name: "Smile & Pay", desc: "Encaissement mobile" },
    ],
  },
  {
    title: "Gestion & facturation",
    icon: "🧾",
    items: [
      { name: "FNAE Gestion", desc: "Facturation en ligne" },
      { name: "Logiciel devis & facture", desc: "Devis, factures, suivi" },
      { name: "Dell Technologies", desc: "Matériel informatique" },
      { name: "Simplebo", desc: "Création de site web" },
    ],
  },
  {
    title: "Juridique & accompagnement",
    icon: "⚖️",
    items: [
      { name: "CAARL", desc: "Recouvrement & juridique" },
      { name: "Clinique des Entrepreneurs", desc: "Accompagnement en difficulté" },
      { name: "Vendez votre micro-entreprise", desc: "Cession d'activité" },
      { name: "Camping Direct", desc: "Vacances à tarif négocié" },
    ],
  },
];

// Catalogue du club réductions : taux relevés sur la plateforme adhérent
const catalog = [
  // ----- Sorties & loisirs -----
  {
    group: "sorties",
    title: "Cinéma",
    icon: "🎬",
    max: "jusqu'à −50%",
    highlight: null,
    brands: [
      "Pathé −50% (dès 4 €)", "Cineplanet −40%", "CGR −39%", "Kinepolis −35%",
      "UGC −34%", "Majestic −34%", "MK2 −32%", "Le Lido / Le Pagnol / Le Vox −30%",
      "Cinémas Cannes-Antibes −29%", "Megarama −27%", "Six n'étoiles −26%",
      "Pathé Gaumont (montant au choix) −25%", "CinéPass Pathé −24%",
      "Cinéville −23%", "CinéChèque −20%",
    ],
  },
  {
    group: "sorties",
    title: "Grands parcs & attractions",
    icon: "🎢",
    max: "jusqu'à −55%",
    highlight: null,
    brands: [
      "Disneyland Paris jusqu'à −55%", "PortAventura jusqu'à −45%", "Futuroscope −43%",
      "Walygator Sud-Ouest −32%", "Puy du Fou −30%", "Magic Park Land −29%",
      "Europa-Park −27%", "Parc Astérix −25%", "Bagatelle −24%", "Mer de Sable −23%",
      "Bellewaerde −23%", "Le Pal −22%", "Vulcania −22%", "Parc Spirou −21%",
      "Walibi Rhône-Alpes −18%", "Nigloland −13%",
    ],
  },
  {
    group: "sorties",
    title: "Concerts, théâtre & spectacles",
    icon: "🎤",
    max: "tarifs négociés",
    highlight: "Des milliers de dates partout en France",
    brands: [
      "Concerts (Gims, Bigflo & Oli, Vanessa Paradis, Ninho, PLK…)",
      "Humour (Dany Boon, Fabrice Éboué, Jarry, Arnaud Tsamère…)",
      "Théâtre (Les Bodin's, Messmer, Mask Singer, Danse avec les Stars…)",
      "Comédies musicales (Le Roi Soleil, Flashdance, Grease, Brel…)",
      "Spectacles enfants (Disney sur Glace, Madagascar, Aldebert…)",
      "Cirque (Cirque du Soleil OVO, Cirque Imagine −11%, Étoiles de Pékin…)",
      "Classique & opéra (Lang Lang, Roberto Alagna, La Traviata…)",
      "Danse & cabarets (Casse-Noisette, Lac des Cygnes, Shen Yun…)",
      "Magie & mentalisme (Festival Mondial de la Magie, Luc Langevin…)",
    ],
  },
  {
    group: "sorties",
    title: "Parcs de loisirs & indoor",
    icon: "🪁",
    max: "jusqu'à −63%",
    highlight: null,
    brands: [
      "SpeedPark −63%", "OK Corral −20%", "Royaume des Arbres −20%",
      "Bois des Lutins −19%", "MontoPoto −19%", "Forêt Adrénaline −17%",
      "Mini-Europe Bruxelles −17%", "Coudou Parc −16%", "Village des Fous −16%",
      "Winnoland −15%", "Aven Parc −15%", "Parc Mini-Châteaux −15%",
      "Gulli Parc −14%", "EcoPark Adventures −10%", "Parc Oriental de Maulévrier −10%",
    ],
  },
  {
    group: "sorties",
    title: "Parcs animaliers",
    icon: "🦁",
    max: "jusqu'à −25%",
    highlight: null,
    brands: [
      "Zoo de la Barben −25%", "Branféré −23%", "Safari de Peaugres −22%",
      "ZooParc de Beauval −19%", "Parc de Sainte-Croix −19%", "Zoo de Thoiry −18%",
      "Zoo de la Palmyre −18%", "Zoo de Cerza −17%", "Parc des Oiseaux −17%",
      "La Vallée des Singes −17%", "Planète Sauvage −14%", "Zoo d'Amnéville −13%",
      "Pairi Daiza −9%",
    ],
  },
  {
    group: "sorties",
    title: "Aquariums",
    icon: "🐠",
    max: "jusqu'à −33%",
    highlight: null,
    brands: [
      "Océanopolis −33%", "Aquarium de Lyon −23%", "Planet Ocean Montpellier −22%",
      "Aquarium Oniria −20%", "Aquarium de Barcelone −18%", "Sea Life −17%",
      "Musée Océanographique de Monaco −17%", "Nausicaá −16%",
      "Seaquarium Le Grau-du-Roi −15%", "Aquarium de Touraine −15%",
      "Aquarium des Tropiques −14%", "Aquarium de Saint-Malo −13%",
      "Aquarium de Paris −13%", "Aquarium de Biarritz −10%",
    ],
  },
  {
    group: "sorties",
    title: "Parcs aquatiques",
    icon: "🏊",
    max: "jusqu'à −32%",
    highlight: null,
    brands: [
      "Vitam −32%", "Aquaboulevard −30%", "Aqualibi −28%",
      "Bellewaerde Aquapark −25%", "Les Antilles de Jonzac −19%",
      "Aquatic Landes −15%", "Water Glisse Passion −10%", "Nautiland Haguenau −5%",
    ],
  },
  {
    group: "sorties",
    title: "Spa, thalasso & thermes",
    icon: "💆",
    max: "jusqu'à −42%",
    highlight: null,
    brands: [
      "Galéa −42%", "Thalassoleil −26%", "Aquatonic −22%", "Les Iléades −22%",
      "Cap Natura Lyon −20%", "O Club Les Atlantides −15%",
      "Calicéo −9% à −14%", "BodyFloat Paris −14%", "Spas de France −10%",
      "Caracalla Therme −10%", "Villa Pompéi Amnéville −9%",
      "Vita Classica −9%", "ValVital −6%",
    ],
  },
  {
    group: "sorties",
    title: "Activités sportives",
    icon: "🧗",
    max: "jusqu'à −60%",
    highlight: null,
    brands: [
      "Skipower (carte Espace Diamant) −60%", "Vertical'Art −36%",
      "Speedkart −43%", "Climb Up −26%", "Trampoline Park You Jump −21%",
      "B'Up Clermont −17%", "South Block Park −15%", "Uniclimb −15%",
      "Bloc Session −13%", "Jump Arena −11%", "UrbanSoccer / UrbanPadel −5%",
    ],
  },
  {
    group: "sorties",
    title: "Ski & montagne",
    icon: "🎿",
    max: "jusqu'à −23%",
    highlight: null,
    brands: [
      "Val d'Allos / Espace Lumière −23%", "Pra Loup / Espace Lumière −23%",
      "Auron / Isola 2000 −17%", "Valberg −16%",
      "Skipower carte Espace Diamant −60%",
    ],
  },
  {
    group: "sorties",
    title: "Musées, monuments & visites",
    icon: "🏛️",
    max: "jusqu'à −50%",
    highlight: null,
    brands: [
      "Centre Pompidou Metz −50%", "Bateaux Mouches −50%",
      "Passeport Monuments Nationaux −25%", "Musée de l'Homme −24%",
      "Musée National de l'Automobile −23%", "Muséum national d'Histoire naturelle −22%",
      "Musée Grévin −20%", "Aven d'Orgnac −18%", "Musée du Vin Paris −17%",
      "Musée de la Romanité Nîmes −17%", "Carrières des Lumières −12%",
      "Aéroscopia −10%", "Atelier des Lumières −9%",
    ],
  },
  {
    group: "sorties",
    title: "Vacances & voyages",
    icon: "✈️",
    max: "jusqu'à −16%",
    highlight: null,
    brands: [
      "Smartbox −16%", "MMV −9%", "Accor / Ibis week-end −8%",
      "Costa Croisières −7%", "Cabanes de France −7%", "GetYourGuide −6%",
      "VeryChic −6%", "Weekendesk −6%", "lastminute −6%", "FlixBus −5%",
      "Campings.com −4,5%", "Sixt −4%", "Havas Voyages −4%", "Ulysse −3,7%",
      "Airbnb −3%", "Pierre & Vacances −3%", "Center Parcs −2,5%",
    ],
  },

  // ----- Achats du quotidien -----
  {
    group: "achats",
    title: "Grande distribution & courses",
    icon: "🛒",
    max: "jusqu'à −5%",
    highlight: "Bons d'achat au montant de votre choix",
    brands: [
      "Carrefour −5%", "Auchan −4,2%", "E.Leclerc −4%", "Monoprix −4%",
      "Magasins U −4%", "Intermarché −3%", "Netto −3%", "Le Chéquier Vert −3%",
      "Cdiscount −2%", "Wondergift −2%", "Amazon",
    ],
  },
  {
    group: "achats",
    title: "Mode",
    icon: "👕",
    max: "jusqu'à −10%",
    highlight: null,
    brands: [
      "Gémo −10%", "Adidas −10%", "Etam −10%", "Zalando −9%", "Darjeeling −9%",
      "BZB −8%", "Promod −7%", "Jules −7%", "Sarenza −7%",
      "Primark −6,2%", "Galeries Lafayette −6%", "H&M −5%", "Nike −5%",
      "Courir −5%", "La Redoute AMPM −5%", "Bonobo −4%",
    ],
  },
  {
    group: "achats",
    title: "Beauté & bijoux",
    icon: "💄",
    max: "jusqu'à −15%",
    highlight: null,
    brands: [
      "Swarovski −15%", "Patyka −15%", "Blissim −13%", "Carte Fleurance −13%",
      "Dr Pierre Ricaud −11,4%", "Cleor −11%", "Respire −11%", "Clarins −10%",
      "Les Georgettes −10%", "Marionnaud −8,5%", "Yves Rocher −8%",
      "Rituals −8%", "Sephora −7%", "Passion Beauté −7%",
      "Mademoiselle Bio −6%", "Maty −5%",
    ],
  },
  {
    group: "achats",
    title: "Maison & bricolage",
    icon: "🔧",
    max: "jusqu'à −11%",
    highlight: null,
    brands: [
      "Bonsoirs −11%", "Mondial Tissus −10%", "Interflora −9%", "Jardiland −8%",
      "Wecandoo −8%", "Nature & Découvertes −6%", "Camif −6%", "Leroy Merlin −5%",
      "Castorama −5%", "Maisons du Monde −5%", "Zoomalia −4,5%",
      "Bricomarché −4%", "IKEA −4%", "Gifi −4%", "Electro Dépôt −3%",
    ],
  },
  {
    group: "achats",
    title: "High-tech",
    icon: "💻",
    max: "jusqu'à −10%",
    highlight: null,
    brands: [
      "Devialet −10%", "Norton −9%", "Le Petit Fumeur −8%", "Kaspersky −4%",
      "Fnac Darty −4%", "Apple Gift Card −2,5%", "Cdiscount −2%", "Amazon",
    ],
  },
  {
    group: "achats",
    title: "Sport & salles de sport",
    icon: "🏋️",
    max: "jusqu'à −48%",
    highlight: "Abonnement salle jusqu'à −31%",
    brands: [
      "MySportRoom −48%", "Training Go −36%", "Jooks −33%",
      "Neoness / KeepCool −31%", "Forest Hill −31%", "Fitness Park −21%",
      "Episod Sports Studios −20%", "Swedish Fit −17%", "Domyos Fitness Club −16%",
      "Vert Marine −16%", "Gymnésia −13%", "L'Orange Bleue −10%",
      "FizzUp −8%", "Strava −7%", "Au Vieux Campeur −6%", "Decathlon −3,5%",
    ],
  },
  {
    group: "achats",
    title: "Abonnements digitaux",
    icon: "📺",
    max: "jusqu'à −25%",
    highlight: null,
    brands: [
      "Deezer −25%", "Deezer Family 12 mois −20%", "Xbox −14,55%",
      "digiSchool −11%", "Babbel −10%", "L'Équipe −8%", "Benshi −7%",
      "Sony −6%", "Crunchyroll −6%", "Molotov −5%", "Google −4,3%",
      "Netflix −4%", "Meta Quest −4%", "Disney+ −2%",
    ],
  },
  {
    group: "achats",
    title: "Culture & presse",
    icon: "📚",
    max: "jusqu'à −21%",
    highlight: null,
    brands: [
      "Pandacraft −21%", "ViaPresse −20%", "Easialy magazines −20%",
      "Storyplay'R −19%", "Prismashop −12%", "Abonnement magazines −9%",
      "Rougier & Plé −8%", "CEWE −7%", "A2Presse −7%", "Cultura −6%",
      "Furet du Nord / Decitre −5,5%", "Ticketmaster −4%", "BDfugue −4%",
    ],
  },
  {
    group: "achats",
    title: "Gastronomie & vins",
    icon: "🍷",
    max: "jusqu'à −14%",
    highlight: null,
    brands: [
      "Bateau Le Théo −14%", "Les 2 Marmottes −10%", "Quitoque −10%",
      "Maison Carrousel −10%", "Ecomiam −9%", "Vinoclub −9%", "Lavinia −8%",
      "SodaStream −8%", "Champmarket −8%", "Le Petit Ballon −7%", "Eataly −7%",
      "Madame Brasserie −6%", "Rrraw −6%", "TheFork −5%", "Uber Eats −4%",
      "Deliveroo −3%",
    ],
  },
  {
    group: "achats",
    title: "Bien-être & santé",
    icon: "🧘",
    max: "jusqu'à −42%",
    highlight: null,
    brands: [
      "Le Klube Dijon −42%", "Institut Beauté & Spa Aloria −22%", "Aqua'Villa −17%",
      "Guinot Mary Cohr −13%", "Zen by Deezer −13%", "Clarins −10%",
      "Grand Optical −9%", "Epycure −9%", "Hypnoledge −9%", "Visorando −8%",
      "VO2Fast −7%", "Withings −7%", "Comme Avant −7%", "Aroma-Zone −6%",
      "DietSensor −6%", "Kwit −5%",
    ],
  },
  {
    group: "achats",
    title: "Jouets & jeux",
    icon: "🧸",
    max: "jusqu'à −13%",
    highlight: null,
    brands: [
      "Figured'Art −13%", "Oxybul −11,5%", "King Jouet −10%", "Nintendo −10%",
      "Minecraft −9%", "Ane & Gramme −7%", "Cultura −6%", "Roblox −6%",
      "LEGO −5,5%", "Fortnite −4,65%", "EA −4%", "Blacknut −4%", "JouéClub −3%",
    ],
  },
  {
    group: "achats",
    title: "Bébé & enfant",
    icon: "🍼",
    max: "jusqu'à −11%",
    highlight: null,
    brands: [
      "Okaïdi-Obaïbi −11%", "Absorba −10,1%", "Jacadi −9%", "Aubert −9%",
      "DPAM −8%", "Tamboor −8%", "Natalys −7%", "Sergent Major −7%",
      "Papate −7%", "Petit Bateau −6%", "Vertbaudet −6%",
      "Les Petits Raffineurs −6%", "Orchestra −5%",
    ],
  },
  {
    group: "achats",
    title: "Consommation responsable",
    icon: "🌱",
    max: "jusqu'à −15%",
    highlight: null,
    brands: [
      "Seize Point Neuf −15%", "SPRiNG −12%", "Umaï −7%", "Ubac −7%",
      "Ilya −7%", "Lukine −7%", "Maître Savonitto −7%", "Les Raffineurs −6%",
      "WeDressFair −6%", "El Market −6%", "Recyclivre −5%",
      "The Trust Society −5%", "Panafrica −4%", "Modetic −3,5%",
      "Label Emmaüs −2%",
    ],
  },
];

// Jeu d'icônes linéaires maison : remplace les emojis, hérite de currentColor
const ICONS: Record<string, string[]> = {
  building: ["M5 21V8l7-4 7 4v13", "M3 21h18", "M9.5 21v-5h5v5", "M9 11h1.5", "M13.5 11H15"],
  tag: ["M20.3 13.1l-7.2 7.2a1.9 1.9 0 01-2.7 0L3.7 13.6V4h9.6l7 7a1.9 1.9 0 010 2.1z", "M8 8.5h.01"],
  sun: ["M16 12a4 4 0 11-8 0 4 4 0 018 0z", "M12 3v2", "M12 19v2", "M3 12h2", "M19 12h2", "M5.6 5.6l1.4 1.4", "M17 17l1.4 1.4", "M18.4 5.6L17 7", "M7 17l-1.4 1.4"],
  heart: ["M12 20s-7-4.4-7-9.5A4 4 0 0112 8a4 4 0 017 2.5C19 15.6 12 20 12 20z"],
  bell: ["M18 16.5V11a6 6 0 10-12 0v5.5L4 19h16z", "M10 22h4"],
  pin: ["M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z", "M14 10a2 2 0 11-4 0 2 2 0 014 0z"],
  chat: ["M4 4h16v12H9.5L4 20z", "M8 9h8", "M8 12.5h5"],
  award: ["M17 9a5 5 0 11-10 0 5 5 0 0110 0z", "M9 13.6L8 22l4-2.2 4 2.2-1-8.4"],
  card: ["M3 6h18v12H3z", "M3 10h18", "M6.5 14.5h3"],
  scale: ["M12 4v16", "M5 7.5h14", "M8 20h8", "M7.5 7.5L4 14h7z", "M16.5 7.5L13 14h7z"],
  columns: ["M3 9l9-5 9 5", "M4 21h16", "M5.5 21V10", "M18.5 21V10", "M12 21V10"],
  users: ["M9.5 11a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4z", "M3 20c0-3 2.9-5 6.5-5s6.5 2 6.5 5", "M16.5 11.2a3 3 0 100-6", "M18 20c0-2 .6-3.6-1-4.6"],
  clipboard: ["M8 5H6v16h12V5h-2", "M9 3h6v3H9z", "M9 11h6", "M9 15h4"],
  shield: ["M12 3.5l7 2.8v4.9c0 4.2-2.9 7.6-7 9.3-4.1-1.7-7-5.1-7-9.3V6.3z", "M9.2 12l2 2 3.6-3.8"],
  check: ["M4.5 12.5l4.6 4.6L19.5 6.7"],
  cross: ["M6.5 6.5l11 11", "M17.5 6.5l-11 11"],
  arrow: ["M4 12h15", "M13.5 6.5L20 12l-6.5 5.5"],
  spark: ["M12 3l1.9 5.4L19 10l-5.1 1.6L12 17l-1.9-5.4L5 10l5.1-1.6z"],
  ticket: ["M3 9.5a2 2 0 002-2h14a2 2 0 002 2v5a2 2 0 00-2 2H5a2 2 0 00-2-2z", "M9 7.5v9"],
};

function Icon({ name, className = "w-5 h-5" }: { name: keyof typeof ICONS | string; className?: string }) {
  const paths = ICONS[name] ?? ICONS.spark;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

function Stars({ className = "h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 20" className={className} aria-label="4,8 sur 5" role="img">
      {[0, 20, 40, 60, 80].map((x) => (
        <g key={x} transform={`translate(${x} 0)`}>
          <rect width="19" height="19" rx="2.5" fill="#00B67A" />
          <path d="M9.5 3.6l1.8 4.1 4.4.4-3.3 2.9 1 4.3-3.9-2.3-3.9 2.3 1-4.3L3.3 8.1l4.4-.4z" fill="#fff" />
        </g>
      ))}
    </svg>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--muted)" }}>
      {children}
    </p>
  );
}

function CTA({
  href, onClick, children, variant = "solid", className = "",
}: {
  href: string; onClick?: () => void; children: React.ReactNode;
  variant?: "solid" | "ghost" | "light"; className?: string;
}) {
  const base = "group inline-flex items-center gap-2.5 rounded-[3px] font-semibold transition-colors duration-300";
  const styles =
    variant === "solid" ? { backgroundColor: "var(--accent)", color: "#fff" }
    : variant === "light" ? { backgroundColor: "#fff", color: "var(--ink)" }
    : { backgroundColor: "transparent", color: "var(--ink)", border: "1px solid var(--line-strong)" };
  return (
    <a href={href} onClick={onClick} style={styles} className={`${base} px-7 py-4 ${className}`}>
      {children}
      <Icon name="arrow" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="faq border-b rule">
      <summary className="flex items-start justify-between py-6 gap-6 cursor-pointer list-none">
        <span className="display text-lg sm:text-xl pr-4">{q}</span>
        <span className="marker relative mt-1.5 w-4 h-4 flex-shrink-0" style={{ color: "var(--accent)" }} aria-hidden="true">
          <span className="absolute top-1/2 left-0 w-4 h-px -translate-y-1/2" style={{ backgroundColor: "currentColor" }} />
          <span className="bar absolute left-1/2 top-0 h-4 w-px -translate-x-1/2" style={{ backgroundColor: "currentColor" }} />
        </span>
      </summary>
      <p className="pb-6 pr-10 leading-relaxed" style={{ color: "var(--muted)" }}>{a}</p>
    </details>
  );
}

// Enseignes du catalogue disposant d'un vectoriel monochrome propre.
// Les logos sont déjà à l'encre de la page (#0A2540), pas de filtre CSS.
const catalogBrands = [
  { name: "Airbnb", logo: "/logos/brands/airbnb.svg" },
  { name: "Carrefour", logo: "/logos/brands/carrefour.svg" },
  { name: "Auchan", logo: "/logos/brands/auchan.svg" },
  { name: "Monoprix", logo: "/logos/brands/monoprix.svg" },
  { name: "Magasins U", logo: "/logos/brands/magasinsu.svg" },
  { name: "Intermarché", logo: "/logos/brands/intermarche.svg" },
  { name: "Netto", logo: "/logos/brands/netto.svg" },
  { name: "Adidas", logo: "/logos/brands/adidas.svg" },
  { name: "Zalando", logo: "/logos/brands/zalando.svg" },
  { name: "Nike", logo: "/logos/brands/nike.svg" },
  { name: "Leroy Merlin", logo: "/logos/brands/leroymerlin.svg" },
  { name: "Castorama", logo: "/logos/brands/castorama.svg" },
  { name: "IKEA", logo: "/logos/brands/ikea.svg" },
  { name: "Norton", logo: "/logos/brands/norton.svg" },
  { name: "Kaspersky", logo: "/logos/brands/kaspersky.svg" },
  { name: "Strava", logo: "/logos/brands/strava.svg" },
  { name: "Deezer", logo: "/logos/brands/deezer.svg" },
  { name: "Sony", logo: "/logos/brands/sony.svg" },
  { name: "Crunchyroll", logo: "/logos/brands/crunchyroll.svg" },
  { name: "Google", logo: "/logos/brands/google.svg" },
  { name: "Netflix", logo: "/logos/brands/netflix.svg" },
  { name: "Cultura", logo: "/logos/brands/cultura.svg" },
  { name: "Ticketmaster", logo: "/logos/brands/ticketmaster.svg" },
  { name: "Uber Eats", logo: "/logos/brands/ubereats.svg" },
  { name: "Deliveroo", logo: "/logos/brands/deliveroo.svg" },
  { name: "Roblox", logo: "/logos/brands/roblox.svg" },
  { name: "Fortnite", logo: "/logos/brands/fortnite.svg" },
  { name: "EA", logo: "/logos/brands/ea.svg" },
  { name: "Apple", logo: "/logos/brands/apple.svg" },
  { name: "Fnac", logo: "/logos/brands/fnac.svg" },
  { name: "L'Équipe", logo: "/logos/brands/lequipe.svg" },
];

function CatalogCard({ cat, index }: { cat: (typeof catalog)[number]; index: number }) {
  const shown = cat.brands.slice(0, 5);
  const rest = cat.brands.slice(5);
  return (
    <article className="lift bg-white border rule rounded-[3px] p-6 flex flex-col">
      <div className="flex items-baseline justify-between gap-3 pb-4 mb-4 border-b rule">
        <span className="num text-[11px] font-semibold tracking-[0.18em]" style={{ color: "var(--muted)" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="display text-lg whitespace-nowrap" style={{ color: "var(--accent)" }}>{cat.max}</span>
      </div>
      <h3 className="display text-xl mb-3">{cat.title}</h3>
      {cat.highlight && (
        <p className="text-xs font-semibold mb-4 inline-flex items-start gap-1.5" style={{ color: "var(--ok)" }}>
          <Icon name="spark" className="w-3.5 h-3.5 mt-px flex-shrink-0" />
          {cat.highlight}
        </p>
      )}
      <ul className="space-y-2 flex-1">
        {shown.map((brand) => (
          <li key={brand} className="text-[13.5px] leading-snug flex gap-2.5" style={{ color: "var(--ink-soft)" }}>
            <span style={{ color: "var(--line-strong)" }}>·</span>
            <span>{brand}</span>
          </li>
        ))}
      </ul>
      {rest.length > 0 && (
        <details className="more mt-5">
          <summary className="underline-slide text-xs font-bold uppercase tracking-[0.12em] cursor-pointer list-none inline-block" style={{ color: "var(--blue)" }}>
            <span className="closed">+ {rest.length} enseignes</span>
            <span className="opened">Réduire</span>
          </summary>
          <ul className="space-y-2 mt-3">
            {rest.map((brand) => (
              <li key={brand} className="text-[13.5px] leading-snug flex gap-2.5" style={{ color: "var(--ink-soft)" }}>
                <span style={{ color: "var(--line-strong)" }}>·</span>
                <span>{brand}</span>
              </li>
            ))}
          </ul>
        </details>
      )}
    </article>
  );
}

export default function CEPage() {
  const logos = partners;

  return (
    <div className="lp-ce min-h-screen">
      <Pixel />

      {/* ---------------------------------------------------------------- Header */}
      <header
        className="sticky top-0 z-50 border-b rule"
        style={{ backgroundColor: "rgba(251,248,244,0.88)", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between gap-4">
          <img src="/logos/fnae-logo.png" alt="FNAE" width={826} height={254} fetchPriority="high" className="h-11 w-auto" />
          <div className="flex items-center gap-6">
            <a
              href="/lp-ce-auto-entrepreneur/choix/"
              style={{ backgroundColor: "var(--ink)" }}
              className="text-white px-5 py-2.5 rounded-[3px] text-[13px] font-semibold hover:opacity-90 transition"
            >
              Activer mes avantages
            </a>
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------------------- Hero */}
      <section
        className="grain relative overflow-hidden"
        style={{
          backgroundColor: "var(--ink)",
          backgroundImage:
            "radial-gradient(80rem 40rem at 78% -10%, rgba(26,114,180,0.55), transparent 60%), radial-gradient(45rem 30rem at 8% 110%, rgba(237,105,82,0.20), transparent 65%)",
        }}
      >
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-0 lg:pt-24">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-12 lg:gap-16 items-start pb-16">
            {/* Colonne récit */}
            <div className="text-white">
              <div data-rise style={{ animationDelay: "0ms" }} className="flex items-center gap-3 mb-8">
                <Stars className="h-[18px]" />
                <span className="text-sm font-semibold">4,8/5</span>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>· 471 avis Trustpilot</span>
              </div>

              <h1 data-rise style={{ animationDelay: "70ms" }} className="display text-[2.6rem] sm:text-6xl lg:text-[4.1rem] mb-7">
                Le{" "}
                <em className="italic" style={{ color: "var(--accent)" }}>comité d&apos;entreprise</em>
                {" "}des auto-entrepreneurs.
              </h1>

              <p data-rise className="text-lg sm:text-xl leading-relaxed max-w-2xl" style={{ animationDelay: "140ms", color: "rgba(255,255,255,0.74)" }}>
                Des réductions négociées chez{" "}
                <strong className="font-semibold" style={{ color: "#fff" }}>+350 enseignes</strong>{" "}
                (cinéma, parcs, vacances, courses, abonnements), et vos assurances, mutuelle et outils pros à tarif FNAE.
              </p>
            </div>

            {/* Colonne offre */}
            <div data-rise style={{ animationDelay: "280ms" }} className="bg-white rounded-[4px] p-8 sm:p-9" >
              <Eyebrow>Adhésion Pro · sans engagement</Eyebrow>
              <div className="flex items-baseline gap-2 mt-5 mb-1">
                <span className="display num text-[4.5rem] leading-none">64</span>
                <span className="display text-2xl" style={{ color: "var(--muted)" }}>€ / an</span>
              </div>
              <p className="text-sm mb-7" style={{ color: "var(--muted)" }}>
                soit <strong style={{ color: "var(--ink)" }}>5,33 € / mois</strong>, rentabilisé dès la première réduction utilisée.
              </p>
              <CTA href="/lp-ce-auto-entrepreneur/choix/" className="w-full justify-center">
                Activer mes avantages
              </CTA>
              <ul className="mt-7 pt-7 border-t rule space-y-3">
                {[
                  "Accès immédiat au catalogue complet",
                  "Bons d'achat et e-billets en quelques clics",
                  "Résiliable à tout moment",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--ink-soft)" }}>
                    <span style={{ color: "var(--ok)" }} className="mt-0.5 flex-shrink-0"><Icon name="check" className="w-4 h-4" /></span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bandeau de logos défilant */}
        <div className="relative z-10 border-t" style={{ borderColor: "rgba(255,255,255,0.14)", backgroundColor: "rgba(255,255,255,0.04)" }}>
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4">
            <p className="text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
              Vos avantages chez +350 enseignes
            </p>
          </div>
          <div className="marquee marquee-mask overflow-hidden pb-7">
            <div className="marquee-track items-center gap-12 px-8">
              {[...logos, ...logos].map((p, i) => (
                <img
                  key={`${p.name}-${i}`}
                  src={p.logo}
                  alt={i < logos.length ? p.name : ""}
                  aria-hidden={i >= logos.length}
                  className={`w-auto object-contain flex-shrink-0 ${p.wide ? "h-5 max-w-[132px]" : "h-7 max-w-[72px]"}`}
                  style={{ filter: "brightness(0) invert(1)", opacity: 0.72 }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- Chiffres */}
      <section className="border-b rule" style={{ backgroundColor: "var(--paper-2)" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid sm:grid-cols-3">
            {[
              { v: "80 000+", l: "adhérents" },
              { v: "4,8/5", l: "sur Trustpilot · 471 avis" },
              { v: "2009", l: "au service des indépendants" },
            ].map((s, i) => (
              <div
                key={s.l}
                className={`py-9 px-2 sm:px-6 ${i > 0 ? "border-t sm:border-t-0 sm:border-l" : ""} rule`}
              >
                <p className="display num text-4xl mb-1.5">{s.v}</p>
                <p className="text-[13px] leading-snug" style={{ color: "var(--muted)" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- Soutiens */}
      <section className="py-12 px-5 sm:px-8 border-b rule">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[10px] uppercase tracking-[0.2em] mb-8" style={{ color: "var(--muted)" }}>
            Siège dans les instances nationales
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-7">
            {[
              { src: "/logos/dgfip.svg", alt: "Direction Générale des Finances Publiques" },
              { src: "/logos/urssaf.svg", alt: "Urssaf" },
              { src: "/logos/inpi.svg", alt: "INPI" },
              { src: "/logos/cpsti.png", alt: "CPSTI" },
              { src: "/logos/cipav.svg", alt: "La CIPAV" },
              { src: "/logos/caisse-depots.svg", alt: "Caisse des Dépôts" },
            ].map((logo) => (
              <img key={logo.alt} src={logo.src} alt={logo.alt} loading="lazy" decoding="async" className="h-9 object-contain transition-all duration-500 hover:opacity-100" style={{ filter: "grayscale(100%)", opacity: 0.45 }} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- Le manque */}
      <section className="py-24 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Eyebrow>Le point de départ</Eyebrow>
            <h2 className="display text-4xl sm:text-5xl mt-5 mb-5">
              Les salariés ont leur CE.<br />
              <span style={{ color: "var(--muted)" }}>Vous, indépendant, vous n&apos;avez rien.</span>
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white border rule" style={{ minWidth: 560 }}>
              <caption className="sr-only">
                Avantages dont bénéficie un salarié, un indépendant seul, et un indépendant adhérent FNAE
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="text-left p-4 border-b rule" />
                  <th scope="col" className="p-4 border-b border-l rule text-[11px] font-semibold uppercase tracking-[0.1em] w-[110px]" style={{ color: "var(--muted)" }}>
                    Salarié
                  </th>
                  <th scope="col" className="p-4 border-b border-l rule text-[11px] font-semibold uppercase tracking-[0.1em] w-[110px]" style={{ color: "var(--muted)" }}>
                    Indépendant<br />seul
                  </th>
                  <th scope="col" className="p-4 border-b border-l text-[11px] font-semibold uppercase tracking-[0.1em] w-[130px] text-white" style={{ backgroundColor: "var(--ink)", borderColor: "var(--ink)" }}>
                    Indépendant<br />avec la FNAE
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Comité d'entreprise (CE / CSE)", icon: "building" },
                  { label: "Réductions enseignes", icon: "tag" },
                  { label: "Chèques vacances", icon: "sun" },
                  { label: "Mutuelle négociée", icon: "heart" },
                ].map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="text-left p-4 border-b rule font-medium">
                      <span className="flex items-center gap-3">
                        <span style={{ color: "var(--muted)" }}><Icon name={row.icon} className="w-[18px] h-[18px]" /></span>
                        <span className="text-[14.5px]">{row.label}</span>
                      </span>
                    </th>
                    <td className="p-4 border-b border-l rule text-center">
                      <span className="inline-flex" style={{ color: "var(--ok)" }}><Icon name="check" className="w-5 h-5" /></span>
                      <span className="sr-only">Oui</span>
                    </td>
                    <td className="p-4 border-b border-l rule text-center">
                      <span className="inline-flex" style={{ color: "var(--line-strong)" }}><Icon name="cross" className="w-5 h-5" /></span>
                      <span className="sr-only">Non</span>
                    </td>
                    <td className="p-4 border-b border-l rule text-center" style={{ backgroundColor: "#EEF4F9" }}>
                      <span className="inline-flex" style={{ color: "var(--ok)" }}><Icon name="check" className="w-5 h-5" /></span>
                      <span className="sr-only">Oui</span>
                    </td>
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="text-left p-4 font-semibold text-[14.5px]">Coût</th>
                  <td className="p-4 border-l rule text-center text-[13px]" style={{ color: "var(--muted)" }}>
                    Pris en charge
                  </td>
                  <td className="p-4 border-l rule text-center text-[13px]" style={{ color: "var(--muted)" }}>
                    Aucune offre
                  </td>
                  <td className="p-4 border-l rule text-center" style={{ backgroundColor: "#EEF4F9" }}>
                    <span className="display text-xl" style={{ color: "var(--accent)" }}>64 €</span>
                    <span className="block text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>par an</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-10 text-center">
            <CTA href="/lp-ce-auto-entrepreneur/choix/">Activer mes avantages</CTA>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- Catalogue */}
      <section className="py-24 px-5 sm:px-8 border-y rule" style={{ backgroundColor: "var(--paper-2)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-14">
            <Eyebrow>Le catalogue en détail</Eyebrow>
            <h2 className="display text-4xl sm:text-5xl mt-5 mb-6">
              Ce qu&apos;il y a vraiment dans votre club réductions
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
              Des milliers d&apos;offres sur votre plateforme adhérent : bons d&apos;achat au montant de votre choix, e-billets disponibles 24h/24 et tarifs négociés sur les sorties. Voici les taux réellement pratiqués, catégorie par catégorie.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 bg-white border rule rounded-[3px] mb-16">
            {[
              { value: "4 €", label: "la place de cinéma Pathé" },
              { value: "−55%", label: "sur les billets Disneyland Paris" },
              { value: "−31%", label: "sur votre abonnement salle de sport" },
              { value: "−5%", label: "sur vos courses alimentaires" },
            ].map((stat, i) => (
              <div key={stat.label} className={`p-7 ${i > 0 ? "lg:border-l" : ""} ${i % 2 === 1 ? "border-l" : ""} ${i < 2 ? "border-b lg:border-b-0" : ""} rule`}>
                <p className="display num text-4xl mb-2" style={{ color: "var(--accent)" }}>{stat.value}</p>
                <p className="text-[13px] leading-snug" style={{ color: "var(--muted)" }}>{stat.label}</p>
              </div>
            ))}
          </div>


          {/* Mur d'enseignes : les marques du catalogue dont j'ai un vectoriel propre */}
          <div className="bg-white border rule rounded-[3px] mb-16">
            <p className="text-[10px] uppercase tracking-[0.2em] px-6 pt-6 pb-5" style={{ color: "var(--muted)" }}>
              Quelques enseignes du catalogue
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-px" style={{ backgroundColor: "var(--line)" }}>
              {catalogBrands.map((b) => (
                <div key={b.name} className="bg-white flex flex-col items-center justify-center gap-2 py-6 px-2">
                  <img
                    src={b.logo}
                    alt={b.name}
                    title={b.name}
                    loading="lazy"
                    decoding="async"
                    className="h-7 w-auto max-w-full object-contain transition-opacity duration-300"
                    style={{ opacity: 0.62 }}
                  />
                  <span className="text-[10px] text-center leading-tight" style={{ color: "var(--muted)" }}>{b.name}</span>
                </div>
              ))}
              <div className="bg-white flex items-center justify-center py-6 px-2">
                <span className="text-[11px] font-semibold text-center leading-tight" style={{ color: "var(--ink)" }}>
                  + 320 autres
                </span>
              </div>
            </div>
          </div>

          {[
            { key: "sorties", label: "Sorties, loisirs & vacances" },
            { key: "achats", label: "Achats du quotidien & abonnements" },
          ].map((grp) => {
            const items = catalog.filter((c) => c.group === grp.key);
            return (
              <div key={grp.key} className="mb-16 last:mb-0">
                <div className="flex items-baseline gap-4 pb-4 mb-7 border-b" style={{ borderColor: "var(--line-strong)" }}>
                  <h3 className="display text-2xl">{grp.label}</h3>
                  <span className="num text-xs font-semibold" style={{ color: "var(--muted)" }}>
                    {items.length} catégories
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((cat, i) => <CatalogCard key={cat.title} cat={cat} index={i} />)}
                </div>
              </div>
            );
          })}

          <div className="mt-14 pt-10 border-t rule flex flex-col sm:flex-row items-start sm:items-center justify-between gap-7">
            <p className="text-xs max-w-xl leading-relaxed" style={{ color: "var(--muted)" }}>
              Taux relevés sur la plateforme adhérent et donnés à titre indicatif : ils évoluent selon les opérations des partenaires, les dates et les stocks disponibles. Liste non exhaustive.
            </p>
            <CTA href="/lp-ce-auto-entrepreneur/choix/" className="flex-shrink-0">Activer mes avantages</CTA>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- Offres pros */}
      <section className="py-24 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-14">
            <Eyebrow>Offres négociées</Eyebrow>
            <h2 className="display text-4xl sm:text-5xl mt-5 mb-6">
              Et aussi : vos assurances et vos outils pros à tarif FNAE
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
              Un CE, ce n&apos;est pas que les loisirs. La FNAE négocie aussi vos contrats d&apos;assurance, votre protection sociale et vos outils du quotidien, avec des conditions réservées aux adhérents.
            </p>
          </div>

          <div className="flex items-center gap-3 pb-4 mb-7 border-b" style={{ borderColor: "var(--line-strong)" }}>
            <Icon name="shield" className="w-5 h-5" />
            <h3 className="display text-2xl">Assurance & protection sociale</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-16">
            {insuranceOffers.map((offer) => (
              <article key={offer.name} className="lift bg-white border rule rounded-[3px] p-6 flex flex-col">
                <div className="flex items-baseline justify-between gap-3 mb-4">
                  <h4 className="display text-xl">{offer.name}</h4>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {offer.tags.map((tag) => (
                    <span key={tag} className="text-[10.5px] font-semibold uppercase tracking-[0.08em] px-2 py-1 rounded-[2px]" style={{ backgroundColor: "var(--paper-2)", color: "var(--ink-soft)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="display text-lg mb-4" style={{ color: "var(--accent)" }}>{offer.price}</p>
                <p className="text-[13.5px] leading-relaxed flex-1" style={{ color: "var(--muted)" }}>{offer.desc}</p>
                {offer.perk && (
                  <p className="text-xs font-semibold mt-5 pt-4 border-t rule flex items-start gap-2" style={{ color: "var(--ok)" }}>
                    <Icon name="spark" className="w-3.5 h-3.5 mt-px flex-shrink-0" />
                    <span>Adhérent FNAE : {offer.perk}</span>
                  </p>
                )}
              </article>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-px" style={{ backgroundColor: "var(--line)" }}>
            {otherOffers.map((group, gi) => (
              <div key={group.title} className="bg-white p-7">
                <div className="flex items-center gap-2.5 pb-4 mb-5 border-b rule">
                  <Icon name={["card", "clipboard", "scale"][gi]} className="w-[18px] h-[18px]" />
                  <h3 className="display text-lg">{group.title}</h3>
                </div>
                <ul className="space-y-4">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <span className="font-semibold text-sm">{item.name}</span>
                      <span className="block text-xs mt-0.5" style={{ color: "var(--muted)" }}>{item.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-xs mt-8 max-w-2xl leading-relaxed" style={{ color: "var(--muted)" }}>
            Tarifs et garanties indiqués à titre indicatif, selon votre activité et les options choisies. Ces offres s&apos;activent depuis votre espace adhérent, une fois votre adhésion validée.
          </p>

          <div className="mt-10 pt-10 border-t rule flex flex-col sm:flex-row items-start sm:items-center justify-between gap-7">
            <p className="text-lg max-w-md leading-snug">
              Ces conditions sont réservées aux adhérents.{" "}
              <strong>Votre adhésion ouvre l&apos;accès à toutes.</strong>
            </p>
            <CTA href="/lp-ce-auto-entrepreneur/choix/" className="flex-shrink-0">
              Activer mes avantages
            </CTA>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- Plus qu'un CE */}
      <section className="py-24 px-5 sm:px-8 border-y rule" style={{ backgroundColor: "var(--paper-2)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="max-w-xl mb-14">
            <Eyebrow>Inclus dans l&apos;adhésion</Eyebrow>
            <h2 className="display text-4xl sm:text-5xl mt-5 mb-6">Plus qu&apos;un CE</h2>
            <p className="text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
              Votre adhésion inclut aussi des outils concrets pour développer et protéger votre activité.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-14 gap-y-px">
            {[
              { icon: "bell", title: "Veille juridique ciblée", desc: "Alertes en temps réel sur les évolutions réglementaires qui concernent votre activité. Seuils TVA, plafonds CA, cotisations…" },
              { icon: "pin", title: "Annuaire Mon-Presta.fr", desc: "Référencez votre activité gratuitement sur l'annuaire dédié aux auto-entrepreneurs pour gagner en visibilité." },
              { icon: "chat", title: "Chatbot juridique 24/7", desc: "Posez vos questions juridiques à tout moment. Le chatbot répond instantanément sur les sujets courants du statut." },
              { icon: "award", title: "Badge adhérent FNAE", desc: "Affichez votre appartenance au plus grand syndicat des auto-entrepreneurs pour rassurer vos clients." },
            ].map((item) => (
              <div key={item.title} className="py-7 border-b rule flex gap-5">
                <span className="flex-shrink-0 mt-0.5" style={{ color: "var(--accent)" }}>
                  <Icon name={item.icon} className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="display text-xl mb-2">{item.title}</h3>
                  <p className="text-[14.5px] leading-relaxed" style={{ color: "var(--muted)" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- Avis */}
      <section className="py-24 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <Eyebrow>Ils ont adhéré</Eyebrow>
              <h2 className="display text-4xl sm:text-5xl mt-5">Ce que disent nos adhérents</h2>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Stars className="h-[18px]" />
              <span className="text-sm font-semibold">4,8/5</span>
              <span className="text-sm" style={{ color: "var(--muted)" }}>· 471 avis</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-px" style={{ backgroundColor: "var(--line)" }}>
            {[
              { quote: "Avec les réductions FNAE, j'ai économisé 380 € sur mes vacances l'été dernier. L'adhésion s'est rentabilisée 25 fois, et c'est sans compter le cinéma et les abonnements.", name: "Julie B.", role: "Coach sportive, Marseille · Adhérente Pro" },
              { quote: "J'ai observé avec satisfaction les actions menées par votre organisation qui se positionne comme un véritable rempart pour les entrepreneurs.", name: "Jean-Michel RUBALO", role: "Adhérent depuis 10 ans" },
              { quote: "Une question complexe reçoit une réponse simple ; tout besoin d'assistance est résolu dans la foulée.", name: "Marc Etienne BOUVIER", role: "Consultant en entreprise" },
            ].map((t) => (
              <figure key={t.name} className="bg-white p-8 flex flex-col">
                <span className="display text-5xl leading-none mb-4" style={{ color: "var(--accent)" }} aria-hidden="true">“</span>
                <blockquote className="text-[15px] leading-relaxed flex-1" style={{ color: "var(--ink-soft)" }}>{t.quote}</blockquote>
                <figcaption className="mt-7 pt-5 border-t rule">
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-8">
            <a href="https://fr.trustpilot.com/review/fnae.fr" target="_blank" rel="noopener noreferrer" className="underline-slide text-sm font-semibold" style={{ color: "var(--muted)" }}>
              Voir tous les avis sur Trustpilot
            </a>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- Légitimité */}
      <section className="grain relative overflow-hidden py-24 px-5 sm:px-8" style={{ backgroundColor: "var(--ink)" }}>
        <div className="relative z-10 max-w-5xl mx-auto text-white">
          <div className="max-w-2xl mb-14">
            <h2 className="display text-4xl sm:text-5xl">
              Un syndicat reconnu par l&apos;État, qui représente les indépendants dans les instances nationales
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-10">
            {[
              { icon: "columns", title: "Syndicat représentatif", desc: "Reconnu par l'État depuis 2020 · Fondé en 2009" },
              { icon: "users", title: "Membre de la CPME", desc: "Confédération des PME · Représentation patronale nationale" },
              { icon: "clipboard", title: "Instances nationales", desc: "Représentée au CPSTI, CAF, CIPAV et Caisse des Dépôts" },
            ].map((item) => (
              <div key={item.title} className="pt-6 border-t" style={{ borderColor: "rgba(255,255,255,0.22)" }}>
                <span style={{ color: "var(--accent)" }} className="inline-block mb-4"><Icon name={item.icon} className="w-6 h-6" /></span>
                <h3 className="display text-xl mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.62)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Tarifs (interactif) */}
      <Pricing />

      {/* ---------------------------------------------------------------- FAQ */}
      <section className="py-24 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[0.6fr_1fr] gap-12 lg:gap-16">
          <div className="lg:sticky lg:top-28 self-start">
            <Eyebrow>Questions fréquentes</Eyebrow>
            <h2 className="display text-4xl mt-5 mb-6">Tout ce qu&apos;il faut savoir avant d&apos;adhérer</h2>
            <a href="https://fnae.fr/contact/" className="underline-slide text-sm font-semibold" style={{ color: "var(--blue)" }}>
              Une autre question ? Contactez-nous
            </a>
          </div>
          <div className="border-t rule">
            {faqs.map((faq) => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- CTA final */}
      <section className="grain relative overflow-hidden py-24 px-5 sm:px-8" style={{ backgroundColor: "var(--accent)" }}>
        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <h2 className="display text-4xl sm:text-5xl mb-10">
            Retrouvez vos avantages perdus
          </h2>
          <CTA href="/lp-ce-auto-entrepreneur/choix/" variant="light" className="text-base">
            Activer mes avantages
          </CTA>
        </div>
      </section>

      {/* ---------------------------------------------------------------- Footer */}
      <footer className="py-12 px-5 sm:px-8" style={{ backgroundColor: "var(--ink)" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-7 text-sm">
          <img src="/logos/fnae-logo-blanc.png" alt="FNAE" loading="lazy" decoding="async" className="h-10 w-auto" />
          <div className="flex flex-wrap justify-center gap-x-7 gap-y-3 items-center" style={{ color: "rgba(255,255,255,0.6)" }}>
            <a href="https://fnae.fr/mentions-legales/" className="underline-slide">Mentions légales</a>
            <a href="https://fnae.fr/politique-de-confidentialite/" className="underline-slide">Confidentialité</a>
            <a href="https://fnae.fr/contact/" className="underline-slide">Contact</a>
          </div>
          <p style={{ color: "rgba(255,255,255,0.45)" }}>© 2009 – {new Date().getFullYear()} FNAE</p>
        </div>
      </footer>
    </div>
  );
}
