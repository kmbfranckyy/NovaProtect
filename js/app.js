(async function initHome() {
  const data = await loadNovaData();
  const categoryGrid = document.querySelector("#categoryGrid");
  const quickLinks = document.querySelector("#quickLinks");
  const featuredPartners = document.querySelector("#featuredPartners");
  const clientPlans = document.querySelector("#clientPlans");
  const partnerPlans = document.querySelector("#partnerPlans");
  const globalSearch = document.querySelector("#globalSearch");
  const heroSearch = document.querySelector("#heroSearch");
  const heroSearchButton = document.querySelector("#heroSearchButton");

  function categoryHref(id) {
    return `pages/categorie.html?categorie=${encodeURIComponent(id)}`;
  }

  categoryGrid.innerHTML = data.categories.map(category => `
    <a class="category-card" href="${categoryHref(category.id)}">
      <span class="icon" aria-hidden="true">${category.icon}</span>
      <div>
        <h3>${category.nom}</h3>
        <p>${category.description}</p>
      </div>
    </a>
  `).join("");

  quickLinks.innerHTML = data.categories.slice(0, 7).map(category => `
    <a href="${categoryHref(category.id)}">${category.nom}</a>
  `).join("");

  const highlighted = [...data.entreprises]
    .sort((a, b) => planRank(a.plan) - planRank(b.plan))
    .slice(0, 3);

  featuredPartners.innerHTML = highlighted.map(partner => `
    <article class="partner-card">
      <div class="badge-row">
        <span class="badge verified">Verifie Nova</span>
        <span class="badge ${partner.plan}">${labelForPlan(partner.plan)}</span>
      </div>
      <h3>${partner.nom}</h3>
      <p>${partner.description}</p>
      <p><strong>${partner.ville}</strong></p>
      <a class="btn secondary" href="pages/boutique.html?id=${encodeURIComponent(partner.id)}">Voir le catalogue</a>
    </article>
  `).join("");

  clientPlans.innerHTML = data.plans.clients.map(plan => `
    <article class="plan-card">
      <h4>${plan.nom}</h4>
      <strong>${plan.prix}</strong>
      <p>${plan.description}</p>
    </article>
  `).join("");

  partnerPlans.innerHTML = data.plans.partenaires.map(plan => `
    <article class="plan-card">
      <h4>${plan.nom}</h4>
      <strong>${plan.prix}</strong>
      <p>${plan.description}</p>
    </article>
  `).join("");

  function findCategoryFromQuery(query) {
    const cleaned = normalizeText(query);
    return data.categories.find(category => {
      return normalizeText(category.nom).includes(cleaned)
        || normalizeText(category.id).includes(cleaned)
        || normalizeText(category.description).includes(cleaned);
    });
  }

  function goToSearch(value) {
    const category = findCategoryFromQuery(value);
    if (category) {
      window.location.href = categoryHref(category.id);
      return;
    }
    const fallback = data.categories[0];
    window.location.href = `${categoryHref(fallback.id)}&q=${encodeURIComponent(value)}`;
  }

  [globalSearch, heroSearch].forEach(input => {
    input?.addEventListener("keydown", event => {
      if (event.key === "Enter" && input.value.trim()) goToSearch(input.value.trim());
    });
  });

  heroSearchButton?.addEventListener("click", () => {
    const value = heroSearch.value.trim();
    if (value) goToSearch(value);
  });
})();
