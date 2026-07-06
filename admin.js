/**
 * NOVAprotect - Module Admin
 * ---------------------------
 * Alimente le tableau de bord admin.html.
 * Lit les donnees du localStorage (affiliation.js) et les affiche.
 *
 * Maintenance :
 *  - Ajouter une colonne de stats : ajouter la cle dans renderVendorRow()
 *  - Ajouter un nouveau vendeur : le declarer dans affiliation.js (NOVA_VENDORS)
 *  - Persister cote serveur : remplacer getStats() par un fetch() vers une API
 */

(function () {
  'use strict';

  /* Recuperer les stats d'un vendeur depuis localStorage */
  function getStats(refId) {
    try {
      return JSON.parse(localStorage.getItem('nova_stats_' + refId) || '{}');
    } catch (e) {
      return {};
    }
  }

  function formatDate(ts) {
    if (!ts) return '—';
    return new Date(ts).toLocaleString('fr-FR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }

  function getRefData() {
    try {
      var raw = localStorage.getItem('nova_ref');
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  /* ── RENDU TABLEAU VENDEURS ── */
  function renderVendors() {
    var tbody = document.getElementById('vendorsTableBody');
    if (!tbody) return;

    var vendors = window.NovaAffiliation
      ? window.NovaAffiliation.VENDORS
      : {};

    var rows = Object.values(vendors).map(function (v) {
      var stats = getStats(v.id);
      var baseUrl = window.location.origin + window.location.pathname.replace('admin.html', '') + '?ref=' + v.id;

      return '<tr>' +
        '<td><span class="admin-badge">' + v.id.toUpperCase() + '</span></td>' +
        '<td>' + v.nom + '</td>' +
        '<td><div class="admin-link-wrap"><code>' + baseUrl + '</code>' +
          '<button class="admin-copy-btn" onclick="adminCopyLink(\'' + baseUrl + '\', this)">Copier</button>' +
        '</div></td>' +
        '<td class="stat-num">' + (stats.clicks || 0) + '</td>' +
        '<td class="stat-num">' + (stats.demandes || 0) + '</td>' +
        '<td class="stat-muted">' + formatDate(stats.lastDemande) + '</td>' +
        '</tr>';
    });

    tbody.innerHTML = rows.length
      ? rows.join('')
      : '<tr><td colspan="6" style="text-align:center;color:#606090;padding:2rem">Aucun vendeur configure</td></tr>';
  }

  /* ── SESSION ACTIVE ── */
  function renderActiveRef() {
    var el = document.getElementById('activeRefInfo');
    if (!el) return;
    var data = getRefData();
    if (!data) {
      el.innerHTML = '<span style="color:#606090">Aucune reference active dans ce navigateur.</span>';
      return;
    }
    var expires = new Date(data.expiresAt).toLocaleString('fr-FR');
    var vendors = window.NovaAffiliation ? window.NovaAffiliation.VENDORS : {};
    var vendor = vendors[data.ref] || { nom: data.ref };
    el.innerHTML =
      '<span class="admin-badge">' + data.ref.toUpperCase() + '</span> &nbsp;' +
      vendor.nom + ' &nbsp;<span style="color:#606090;font-size:.75rem">expire le ' + expires + '</span>' +
      ' &nbsp;<button class="admin-copy-btn" style="background:#ff5577;border-color:#ff5577" onclick="if(window.NovaAffiliation)window.NovaAffiliation.clearRef();location.reload()">Effacer</button>';
  }

  /* ── STATS GLOBALES ── */
  function renderGlobalStats() {
    var vendors = window.NovaAffiliation ? window.NovaAffiliation.VENDORS : {};
    var totalClicks = 0, totalDemandes = 0;
    Object.keys(vendors).forEach(function (id) {
      var s = getStats(id);
      totalClicks += (s.clicks || 0);
      totalDemandes += (s.demandes || 0);
    });
    var el = document.getElementById('globalStats');
    if (!el) return;
    el.innerHTML =
      '<div class="admin-stat-card"><div class="admin-stat-n">' + totalClicks + '</div><div class="admin-stat-l">Clics total</div></div>' +
      '<div class="admin-stat-card"><div class="admin-stat-n">' + totalDemandes + '</div><div class="admin-stat-l">Demandes total</div></div>' +
      '<div class="admin-stat-card"><div class="admin-stat-n">' + Object.keys(vendors).length + '</div><div class="admin-stat-l">Vendeurs actifs</div></div>';
  }

  /* ── ACTIONS ── */
  window.adminCopyLink = function (url, btn) {
    navigator.clipboard.writeText(url).then(function () {
      btn.textContent = 'Copie !';
      setTimeout(function () { btn.textContent = 'Copier'; }, 2000);
    }).catch(function () {
      prompt('Copier ce lien :', url);
    });
  };

  window.adminResetStats = function (refId) {
    if (!confirm('Reinitialiser les statistiques de ' + refId.toUpperCase() + ' ?')) return;
    try { localStorage.removeItem('nova_stats_' + refId); } catch (e) {}
    renderVendors();
    renderGlobalStats();
  };

  /* ── INIT ── */
  function init() {
    renderGlobalStats();
    renderVendors();
    renderActiveRef();
    /* Rafraichissement automatique toutes les 30s */
    setInterval(function () {
      renderVendors();
      renderGlobalStats();
    }, 30000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
