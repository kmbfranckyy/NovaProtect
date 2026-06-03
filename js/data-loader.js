const NOVA_DATA = {
  categories: [
    { id: "telephones", nom: "Telephones", icon: "📱", description: "Smartphones neufs, occasions selectionnees et boutiques mobiles." },
    { id: "accessoires", nom: "Accessoires mobiles", icon: "🔌", description: "Coques, verres trempes, cables, chargeurs et supports." },
    { id: "reparation", nom: "Reparation", icon: "🛠", description: "Techniciens pour ecran, batterie, charge et diagnostic." },
    { id: "tatouage", nom: "Salon de tatouage", icon: "✒", description: "Artistes verifies, hygiene, projets personnalises." },
    { id: "coiffure-femme", nom: "Coiffure femme", icon: "✂", description: "Coiffure, soins, brushing et prestations beaute." },
    { id: "marche-exotique", nom: "Marche exotique", icon: "🌿", description: "Banane, manioc, huiles, savon noir et produits specialises." },
    { id: "bijouterie", nom: "Bijouterie", icon: "◆", description: "Bijoux, accessoires et articles selectionnes." },
    { id: "voyage", nom: "Agence de voyage", icon: "✈", description: "Reservations, conseils et services touristiques fiables." },
    { id: "decoration-lumineuse", nom: "Decoration lumineuse", icon: "💡", description: "Ambiances LED, evenements, vitrines et decoration." },
    { id: "restaurants", nom: "Restaurants", icon: "🍽", description: "Etablissements verifies et commandes locales." },
    { id: "services-locaux", nom: "Services locaux", icon: "🤝", description: "Livraison, assistance, conseil et prestations de proximite." }
  ],
  entreprises: [
    { id: "nova-mobile-center", nom: "Nova Mobile Center", categorie: "telephones", plan: "premium", ville: "Casablanca", description: "Boutique specialisee en smartphones verifies et accessoires mobiles.", whatsapp: "https://wa.me/33635107150", socials: "@novaprotectoff", catalogue: ["iphone-13", "samsung-a55", "pack-protection"] },
    { id: "protect-access-store", nom: "Protect Access Store", categorie: "accessoires", plan: "smart", ville: "Rabat", description: "Coques, verres trempes et chargeurs selectionnes pour usage quotidien.", whatsapp: "https://wa.me/33635107150", socials: "@novaprotectoff", catalogue: ["coque-antichoc", "verre-ceramique", "chargeur-rapide"] },
    { id: "fix-phone-plus", nom: "Fix Phone Plus", categorie: "reparation", plan: "premium", ville: "Marrakech", description: "Technicien mobile pour remplacement d'ecran, batterie et diagnostic.", whatsapp: "https://wa.me/33635107150", socials: "@novaprotectoff", catalogue: ["reparation-ecran", "batterie-smartphone", "diagnostic-mobile"] },
    { id: "nova-tattoo-studio", nom: "Nova Tattoo Studio", categorie: "tatouage", plan: "premium", ville: "Casablanca", description: "Salon de tatouage verifie pour projets minimalistes et personnalises.", whatsapp: "https://wa.me/33635107150", socials: "@novaprotectoff", catalogue: ["tatouage-minimaliste", "tatouage-personnalise"] },
    { id: "beauty-nova-hair", nom: "Beauty Nova Hair", categorie: "coiffure-femme", plan: "smart", ville: "Agadir", description: "Salon de coiffure femme pour soins capillaires, brushing et coiffures.", whatsapp: "https://wa.me/33635107150", socials: "@novaprotectoff", catalogue: ["brushing", "soin-capillaire", "coiffure-evenement"] },
    { id: "afro-market-select", nom: "Afro Market Select", categorie: "marche-exotique", plan: "basic", ville: "Casablanca", description: "Produits exotiques : manioc, banane plantain, huiles et savon noir.", whatsapp: "https://wa.me/33635107150", socials: "@novaprotectoff", catalogue: ["manioc", "savon-noir", "huile-naturelle"] },
    { id: "bijoux-lumiere", nom: "Bijoux Lumiere", categorie: "bijouterie", plan: "smart", ville: "Tanger", description: "Bijouterie de proximite avec articles selectionnes et conseils clients.", whatsapp: "https://wa.me/33635107150", socials: "@novaprotectoff", catalogue: ["bracelet", "collier", "bague"] },
    { id: "nova-travel-agency", nom: "Nova Travel Agency", categorie: "voyage", plan: "premium", ville: "Casablanca", description: "Agence de voyage pour reservations, accompagnement et offres touristiques.", whatsapp: "https://wa.me/33635107150", socials: "@novaprotectoff", catalogue: ["reservation-vol", "sejour-weekend", "assistance-visa"] },
    { id: "lumi-deco-pro", nom: "Lumi Deco Pro", categorie: "decoration-lumineuse", plan: "basic", ville: "Rabat", description: "Decoration lumineuse pour boutiques, evenements et interieurs.", whatsapp: "https://wa.me/33635107150", socials: "@novaprotectoff", catalogue: ["ruban-led", "enseigne-lumineuse", "deco-evenement"] },
    { id: "saveur-fiable", nom: "Saveur Fiable", categorie: "restaurants", plan: "smart", ville: "Casablanca", description: "Restaurant partenaire verifie pour commandes et reservations locales.", whatsapp: "https://wa.me/33635107150", socials: "@novaprotectoff", catalogue: ["menu-midi", "commande-famille"] }
  ],
  produits: [
    { id: "iphone-13", nom: "iPhone 13 verifie", type: "produit", prix: "Sur demande", description: "Smartphone controle par partenaire Nova Protect." },
    { id: "samsung-a55", nom: "Samsung Galaxy A55", type: "produit", prix: "Sur demande", description: "Modele recent propose par boutique mobile verifiee." },
    { id: "pack-protection", nom: "Pack protection mobile", type: "produit", prix: "A partir de 99 DH", description: "Coque, verre trempe et installation." },
    { id: "coque-antichoc", nom: "Coque antichoc", type: "produit", prix: "A partir de 49 DH", description: "Protection smartphone pour usage quotidien." },
    { id: "verre-ceramique", nom: "Verre ceramique", type: "produit", prix: "A partir de 39 DH", description: "Protection ecran renforcee." },
    { id: "chargeur-rapide", nom: "Chargeur rapide", type: "produit", prix: "A partir de 79 DH", description: "Chargeur selectionne et teste." },
    { id: "reparation-ecran", nom: "Remplacement ecran", type: "service", prix: "Sur diagnostic", description: "Diagnostic puis remplacement selon modele." },
    { id: "batterie-smartphone", nom: "Remplacement batterie", type: "service", prix: "Sur diagnostic", description: "Controle autonomie et installation." },
    { id: "diagnostic-mobile", nom: "Diagnostic mobile", type: "service", prix: "A partir de 50 DH", description: "Identification rapide des pannes courantes." },
    { id: "tatouage-minimaliste", nom: "Tatouage minimaliste", type: "service", prix: "Sur devis", description: "Projet discret, propre et personnalise." },
    { id: "tatouage-personnalise", nom: "Projet tatouage personnalise", type: "service", prix: "Sur devis", description: "Creation selon brief client." },
    { id: "brushing", nom: "Brushing", type: "service", prix: "Sur demande", description: "Prestation coiffure femme." },
    { id: "soin-capillaire", nom: "Soin capillaire", type: "service", prix: "Sur demande", description: "Soin adapte au type de cheveux." },
    { id: "coiffure-evenement", nom: "Coiffure evenement", type: "service", prix: "Sur devis", description: "Coiffure pour ceremonies et sorties." },
    { id: "manioc", nom: "Manioc", type: "produit", prix: "Selon arrivage", description: "Produit exotique selectionne." },
    { id: "savon-noir", nom: "Savon noir", type: "produit", prix: "Selon format", description: "Produit naturel de soin." },
    { id: "huile-naturelle", nom: "Huiles naturelles", type: "produit", prix: "Selon format", description: "Huiles specialisees pour soin et cuisine." },
    { id: "bracelet", nom: "Bracelet", type: "produit", prix: "Sur demande", description: "Bijou selectionne." },
    { id: "collier", nom: "Collier", type: "produit", prix: "Sur demande", description: "Article de bijouterie." },
    { id: "bague", nom: "Bague", type: "produit", prix: "Sur demande", description: "Bijou disponible selon stock." },
    { id: "reservation-vol", nom: "Reservation vol", type: "service", prix: "Sur demande", description: "Recherche et reservation accompagnee." },
    { id: "sejour-weekend", nom: "Sejour weekend", type: "service", prix: "Sur devis", description: "Offres courtes durees." },
    { id: "assistance-visa", nom: "Assistance visa", type: "service", prix: "Sur devis", description: "Aide a la preparation du dossier." },
    { id: "ruban-led", nom: "Ruban LED", type: "produit", prix: "Sur demande", description: "Decoration lumineuse flexible." },
    { id: "enseigne-lumineuse", nom: "Enseigne lumineuse", type: "service", prix: "Sur devis", description: "Creation pour boutique et evenement." },
    { id: "deco-evenement", nom: "Decoration evenement", type: "service", prix: "Sur devis", description: "Ambiance lumineuse pour evenements." },
    { id: "menu-midi", nom: "Menu midi", type: "service", prix: "Sur demande", description: "Offre restaurant du jour." },
    { id: "commande-famille", nom: "Commande famille", type: "service", prix: "Sur demande", description: "Commande groupe ou famille." }
  ],
  plans: {
    clients: [
      { nom: "Gratuit", prix: "0 DH", description: "Acces aux categories et partenaires verifies." },
      { nom: "Client Plus", prix: "29 DH", description: "Recommandations prioritaires, alertes promotions et meilleurs profils." },
      { nom: "Client Premium", prix: "59 DH", description: "Accompagnement personnalise et offres reservees." }
    ],
    partenaires: [
      { nom: "Basic", prix: "30 DH", description: "Presence dans l'annuaire Nova Protect avec fiche simple." },
      { nom: "Smart", prix: "50 DH", description: "Meilleure visibilite, badge renforce et fiche enrichie." },
      { nom: "Premium", prix: "100 DH", description: "Priorite dans les resultats, mise en avant et catalogue complet." }
    ]
  }
};

async function loadNovaData() {
  const base = location.pathname.includes("/pages/") ? "../data/" : "data/";
  try {
    const [categories, entreprises, produits] = await Promise.all([
      fetch(base + "categories.json").then(r => r.ok ? r.json() : Promise.reject()),
      fetch(base + "entreprises.json").then(r => r.ok ? r.json() : Promise.reject()),
      fetch(base + "produits.json").then(r => r.ok ? r.json() : Promise.reject())
    ]);
    return { ...NOVA_DATA, categories, entreprises, produits };
  } catch (error) {
    return NOVA_DATA;
  }
}

function planRank(plan) {
  return { premium: 0, smart: 1, basic: 2 }[String(plan).toLowerCase()] ?? 3;
}

function labelForPlan(plan) {
  const key = String(plan).toLowerCase();
  return key.charAt(0).toUpperCase() + key.slice(1);
}

function normalizeText(value) {
  return String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
