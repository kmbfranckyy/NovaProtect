var produits = [];
var plans = [];

var fallbackProduits = [
  {
    nom: "Samsung Galaxy A15",
    entreprise: "Nova Mobile Store",
    categorie: "Smartphones Samsung",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=700&q=80&fit=crop",
    description: "Smartphone accessible pour appels, reseaux sociaux et usage quotidien.",
    contact: "https://wa.me/33635107150"
  },
  {
    nom: "Samsung Galaxy A25",
    entreprise: "Nova Mobile Store",
    categorie: "Smartphones Samsung",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=700&q=80&fit=crop",
    description: "Modele polyvalent pour clients recherchant autonomie et fiabilite.",
    contact: "https://wa.me/33635107150"
  },
  {
    nom: "Samsung Galaxy A35",
    entreprise: "Nova Mobile Store",
    categorie: "Smartphones Samsung",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=700&q=80&fit=crop",
    description: "Gamme intermediaire adaptee au multimedia et aux applications modernes.",
    contact: "https://wa.me/33635107150"
  },
  {
    nom: "Samsung Galaxy A55",
    entreprise: "Nova Mobile Store",
    categorie: "Smartphones Samsung",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=700&q=80&fit=crop",
    description: "Smartphone avance avec finition premium et bonnes performances.",
    contact: "https://wa.me/33635107150"
  },
  {
    nom: "iPhone 13",
    entreprise: "Nova Mobile Store",
    categorie: "iPhone",
    image: "https://images.unsplash.com/photo-1632633173522-2f3a4f10c12f?w=700&q=80&fit=crop",
    description: "iPhone fiable pour profiter d'iOS avec un budget maitrise.",
    contact: "https://wa.me/33635107150"
  },
  {
    nom: "Redmi Note 13",
    entreprise: "TechZone Local",
    categorie: "Smartphones Xiaomi Redmi",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700&q=80&fit=crop",
    description: "Telephone populaire avec grand ecran et bon rapport qualite-prix.",
    contact: "https://wa.me/33635107150"
  },
  {
    nom: "Chargeurs rapides",
    entreprise: "Mobi Access",
    categorie: "Accessoires",
    image: "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?w=700&q=80&fit=crop",
    description: "Chargeurs compatibles Android et iPhone pour boutiques partenaires.",
    contact: "https://wa.me/33635107150"
  }
];

var fallbackPlans = [
  {
    type: "Client",
    nom: "Basic",
    prix: "29,99",
    devise: "MAD",
    periode: "mois",
    description: "Acces simple au reseau NovaProtect pour trouver des produits et partenaires fiables.",
    avantages: ["Recherche catalogue", "Acces aux partenaires verifies", "Contact direct WhatsApp"],
    populaire: false,
    contact: "https://wa.me/33635107150"
  },
  {
    type: "Client",
    nom: "Smart",
    prix: "54,99",
    devise: "MAD",
    periode: "mois",
    description: "Experience amelioree pour comparer les offres et profiter des partenaires recommandes.",
    avantages: ["Tous les avantages Basic", "Priorite sur les recommandations", "Alertes offres partenaires"],
    populaire: true,
    contact: "https://wa.me/33635107150"
  },
  {
    type: "Client",
    nom: "Premium",
    prix: "99,99",
    devise: "MAD",
    periode: "mois",
    description: "Accompagnement premium pour achats, demandes rapides et orientation partenaire.",
    avantages: ["Tous les avantages Smart", "Assistance prioritaire", "Orientation personnalisee"],
    populaire: false,
    contact: "https://wa.me/33635107150"
  },
  {
    type: "Partenaire",
    nom: "Starter",
    prix: "99,99",
    devise: "MAD",
    periode: "mois",
    description: "Premiere presence marketplace pour un commerce local ou vendeur verifie.",
    avantages: ["Badge partenaire", "Fiche entreprise", "Produits dans le catalogue"],
    populaire: false,
    contact: "https://wa.me/33635107150"
  },
  {
    type: "Partenaire",
    nom: "Business",
    prix: "199,99",
    devise: "MAD",
    periode: "mois",
    description: "Visibilite renforcee pour vendre plus et recevoir plus de demandes qualifiees.",
    avantages: ["Tous les avantages Starter", "Mise en avant catalogue", "Support partenaire prioritaire"],
    populaire: true,
    contact: "https://wa.me/33635107150"
  },
  {
    type: "Partenaire",
    nom: "Premium",
    prix: "399,99",
    devise: "MAD",
    periode: "mois",
    description: "Pack complet pour partenaires ambitieux avec visibilite maximale sur NovaProtect.",
    avantages: ["Tous les avantages Business", "Placement premium", "Campagnes NovaProtect"],
    populaire: false,
    contact: "https://wa.me/33635107150"
  }
];

function normalizeText(value) {
  return String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function observeFadeItems() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".fu").forEach(function(el) { el.classList.add("on"); });
    return;
  }

  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        setTimeout(function() { entry.target.classList.add("on"); }, 80);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(".fu").forEach(function(el) { obs.observe(el); });
}

function getCategories() {
  var categories = produits.map(function(item) { return item.categorie; });
  return ["Tous"].concat(categories.filter(function(cat, index) {
    return cat && categories.indexOf(cat) === index;
  }));
}

function renderFilters() {
  var wrap = document.getElementById("filterPills");
  if (!wrap) return;

  wrap.innerHTML = getCategories().map(function(cat) {
    return '<button class="filter-pill" type="button" data-filter="' + escapeHtml(cat) + '">' + escapeHtml(cat) + '</button>';
  }).join("");
}

function renderDiscover() {
  var track = document.getElementById("discoverTrack");
  if (!track) return;

  var seen = {};
  var partenaires = produits
    .map(function(item) { return { nom: item.entreprise, specialite: item.categorie }; })
    .filter(function(partner) {
      if (!partner.nom || seen[partner.nom]) return false;
      seen[partner.nom] = true;
      return true;
    });

  var items = partenaires.concat(partenaires);
  track.innerHTML = items.map(function(partner) {
    return '<div class="discover-item"><span class="discover-dot"></span><div><strong>' +
      escapeHtml(partner.nom) + '</strong><small>' + escapeHtml(partner.specialite) + '</small></div></div>';
  }).join("");
}

function productMatches(item, query, filter) {
  var haystack = normalizeText([item.nom, item.categorie, item.entreprise].join(" "));
  var categoryOk = !filter || filter === "Tous" || item.categorie === filter;
  return categoryOk && (!query || haystack.indexOf(query) !== -1);
}

function createProductCard(item) {
  return '<article class="product-card fu on">' +
    '<img class="product-img" src="' + escapeHtml(item.image) + '" alt="' + escapeHtml(item.nom) + '" loading="lazy">' +
    '<div class="product-body">' +
      '<div class="product-meta"><span>' + escapeHtml(item.categorie) + '</span><span>' + escapeHtml(item.entreprise) + '</span></div>' +
      '<h3>' + escapeHtml(item.nom) + '</h3>' +
      '<p>' + escapeHtml(item.description) + '</p>' +
      '<a class="product-contact" href="' + escapeHtml(item.contact) + '" target="_blank" rel="noopener">Contacter</a>' +
    '</div>' +
  '</article>';
}

function afficherProduits() {
  var catalogue = document.getElementById("catalogue");
  var empty = document.getElementById("emptyState");
  var count = document.getElementById("resultCount");
  var search = document.getElementById("search");
  var activeFilter = document.querySelector(".filter-pill.active");
  if (!catalogue || !empty || !count) return;

  var query = normalizeText(search ? search.value : "");
  var filter = activeFilter ? activeFilter.getAttribute("data-filter") : "Tous";
  var filtered = produits.filter(function(item) { return productMatches(item, query, filter); });

  catalogue.innerHTML = filtered.map(createProductCard).join("");
  empty.style.display = filtered.length ? "none" : "block";
  count.textContent = filtered.length + " produit" + (filtered.length > 1 ? "s" : "") + " affiche" + (filtered.length > 1 ? "s" : "");
}

function bindCatalogueEvents() {
  var search = document.getElementById("search");
  var filters = document.getElementById("filterPills");

  if (search) {
    search.addEventListener("input", afficherProduits);
  }

  if (filters) {
    filters.addEventListener("click", function(event) {
      var button = event.target.closest("[data-filter]");
      if (!button) return;

      filters.querySelectorAll(".filter-pill").forEach(function(item) {
        item.classList.remove("active");
      });
      button.classList.add("active");
      afficherProduits();
    });
  }
}

function loadCatalogue() {
  return fetch("catalogue.json", { cache: "no-store" })
    .then(function(response) {
      if (!response.ok) return fallbackProduits;
      return response.json();
    })
    .then(function(data) {
      return Array.isArray(data) ? data : fallbackProduits;
    })
    .catch(function() {
      return fallbackProduits;
    });
}

function createPlanCard(plan) {
  var popular = plan.populaire ? " is-popular" : "";
  var badge = plan.populaire ? '<span class="plan-badge">Populaire</span>' : "";
  var avantages = Array.isArray(plan.avantages) ? plan.avantages : [];

  return '<article class="plan-card fu on' + popular + '">' +
    badge +
    '<span class="plan-type">' + escapeHtml(plan.type) + '</span>' +
    '<h3>' + escapeHtml(plan.nom) + '</h3>' +
    '<div class="plan-price"><strong>' + escapeHtml(plan.prix) + '</strong><span>' + escapeHtml(plan.devise) + '/' + escapeHtml(plan.periode) + '</span></div>' +
    '<p class="plan-desc">' + escapeHtml(plan.description) + '</p>' +
    '<ul class="plan-list">' + avantages.map(function(item) { return '<li>' + escapeHtml(item) + '</li>'; }).join("") + '</ul>' +
    '<a class="plan-cta" href="' + escapeHtml(plan.contact) + '" target="_blank" rel="noopener">Choisir ' + escapeHtml(plan.nom) + '</a>' +
  '</article>';
}

function renderPlans() {
  var clientWrap = document.getElementById("clientPlans");
  var partnerWrap = document.getElementById("partnerPlans");
  if (!clientWrap || !partnerWrap) return;

  clientWrap.innerHTML = plans
    .filter(function(plan) { return normalizeText(plan.type) === "client"; })
    .map(createPlanCard)
    .join("");

  partnerWrap.innerHTML = plans
    .filter(function(plan) { return normalizeText(plan.type) === "partenaire"; })
    .map(createPlanCard)
    .join("");
}

function loadPlans() {
  return fetch("plans.json", { cache: "no-store" })
    .then(function(response) {
      if (!response.ok) return fallbackPlans;
      return response.json();
    })
    .then(function(data) {
      return Array.isArray(data) ? data : fallbackPlans;
    })
    .catch(function() {
      return fallbackPlans;
    });
}

document.addEventListener("DOMContentLoaded", function() {
  observeFadeItems();

  loadCatalogue().then(function(data) {
    produits = data;
    renderDiscover();
    renderFilters();

    var firstFilter = document.querySelector(".filter-pill");
    if (firstFilter) firstFilter.classList.add("active");

    afficherProduits();
    bindCatalogueEvents();
  });

  loadPlans().then(function(data) {
    plans = data;
    renderPlans();
  });
});
