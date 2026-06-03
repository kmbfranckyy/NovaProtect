(async function initShopPage() {
  const data = await loadNovaData();
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || data.entreprises[0].id;
  const partner = data.entreprises.find(item => item.id === id) || data.entreprises[0];
  const category = data.categories.find(item => item.id === partner.categorie);
  const products = data.produits.filter(product => partner.catalogue.includes(product.id));

  document.title = `${partner.nom} - Nova Protect`;
  document.querySelector("#shopName").textContent = partner.nom;
  document.querySelector("#shopDescription").textContent = partner.description;

  document.querySelector("#shopProfile").innerHTML = `
    <div class="profile-image">${partner.nom.split(" ").map(word => word[0]).slice(0, 2).join("")}</div>
    <div class="badge-row">
      <span class="badge verified">Partenaire verifie</span>
      <span class="badge ${partner.plan}">${labelForPlan(partner.plan)}</span>
    </div>
    <h2>${partner.nom}</h2>
    <p>${partner.description}</p>
    <p><strong>Secteur :</strong> ${category ? category.nom : partner.categorie}</p>
    <p><strong>Zone :</strong> ${partner.ville}</p>
    <p><strong>Reseaux :</strong> ${partner.socials}</p>
    <div class="hero-actions">
      <a class="btn primary" href="${partner.whatsapp}" target="_blank" rel="noreferrer">Contacter sur WhatsApp</a>
      <a class="btn secondary" href="categorie.html?categorie=${encodeURIComponent(partner.categorie)}">Retour secteur</a>
    </div>
  `;

  document.querySelector("#productGrid").innerHTML = products.map(product => `
    <article class="product-card">
      <span class="badge">${product.type}</span>
      <h3>${product.nom}</h3>
      <p>${product.description}</p>
      <p><strong>${product.prix}</strong></p>
    </article>
  `).join("");
})();
