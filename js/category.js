(async function initCategoryPage() {
  const data = await loadNovaData();
  const params = new URLSearchParams(window.location.search);
  const categoryId = params.get("categorie") || "telephones";
  const query = params.get("q") || "";
  const category = data.categories.find(item => item.id === categoryId) || data.categories[0];

  const title = document.querySelector("#categoryTitle");
  const description = document.querySelector("#categoryDescription");
  const input = document.querySelector("#categorySearch");
  const grid = document.querySelector("#partnerGrid");
  const count = document.querySelector("#resultCount");
  const empty = document.querySelector("#emptyState");

  document.title = `${category.nom} - Nova Protect`;
  title.textContent = category.nom;
  description.textContent = category.description;
  input.value = query;

  const partners = data.entreprises
    .filter(partner => partner.categorie === category.id)
    .sort((a, b) => planRank(a.plan) - planRank(b.plan) || a.nom.localeCompare(b.nom));

  function render(filter = "") {
    const cleaned = normalizeText(filter);
    const visible = partners.filter(partner => {
      const haystack = `${partner.nom} ${partner.description} ${partner.ville} ${partner.plan}`;
      return normalizeText(haystack).includes(cleaned);
    });

    grid.innerHTML = visible.map(partner => `
      <article class="partner-card">
        <div class="badge-row">
          <span class="badge verified">Verifie Nova</span>
          <span class="badge ${partner.plan}">${labelForPlan(partner.plan)}</span>
        </div>
        <h3>${partner.nom}</h3>
        <p>${partner.description}</p>
        <p><strong>${partner.ville}</strong></p>
        <div class="hero-actions">
          <a class="btn primary" href="boutique.html?id=${encodeURIComponent(partner.id)}">Voir le catalogue</a>
          <a class="btn secondary" href="${partner.whatsapp}" target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </article>
    `).join("");

    count.textContent = `${visible.length} partenaire(s) dans ${category.nom}`;
    empty.style.display = visible.length ? "none" : "block";
  }

  input.addEventListener("input", () => render(input.value));
  render(query);
})();
