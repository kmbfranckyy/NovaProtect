/**
 * NOVAprotect - Module d'affiliation
 * ------------------------------------
 * Detecte le parametre ?ref=vX dans l'URL,
 * le sauvegarde dans localStorage avec une expiration,
 * et l'injecte automatiquement dans tous les messages WhatsApp.
 *
 * Maintenance :
 *  - Ajouter un vendeur : ajouter son id dans NOVA_VENDORS
 *  - Changer la duree : modifier EXPIRY_DAYS
 *  - Lire la ref courante : window.NovaAffiliation.getRef()
 */

(function () {
  'use strict';

  /* ── CONFIG ── */
  var STORAGE_KEY = 'nova_ref';
  var EXPIRY_DAYS = 30;

  var NOVA_VENDORS = {
    v1: { id: 'v1', nom: 'Vendeur 1' },
    v2: { id: 'v2', nom: 'Vendeur 2' },
    v3: { id: 'v3', nom: 'Vendeur 3' },
    v4: { id: 'v4', nom: 'Vendeur 4' },
    v5: { id: 'v5', nom: 'Vendeur 5' }
  };

  /* ── UTILITAIRES STOCKAGE ── */
  function saveRef(refId) {
    if (!refId) return;
    var data = {
      ref: refId.toLowerCase(),
      savedAt: Date.now(),
      expiresAt: Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  function loadRef() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || !data.ref || !data.expiresAt) return null;
      if (Date.now() > data.expiresAt) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return data.ref;
    } catch (e) {
      return null;
    }
  }

  function clearRef() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  }

  /* ── DETECTION URL ── */
  function detectFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var ref = params.get('ref');
    if (!ref) return null;
    ref = ref.toLowerCase().trim();
    if (NOVA_VENDORS[ref]) {
      saveRef(ref);
      return ref;
    }
    return null;
  }

  /* ── LECTURE ACTIVE ── */
  function getRef() {
    return loadRef();
  }

  function getVendor() {
    var ref = getRef();
    if (!ref) return null;
    return NOVA_VENDORS[ref] || null;
  }

  function getVendorLabel() {
    var vendor = getVendor();
    if (!vendor) return null;
    return vendor.nom + ' (' + vendor.id.toUpperCase() + ')';
  }

  /* ── INJECTION DANS LES MESSAGES WHATSAPP ── */
  function injectRef(message) {
    var ref = getRef();
    if (!ref) return message;
    var vendor = NOVA_VENDORS[ref];
    var label = vendor
      ? vendor.nom + ' (' + vendor.id.toUpperCase() + ')'
      : ref.toUpperCase();
    return message + '\n\nReference vendeur : ' + label;
  }

  /**
   * Surcharge buildNovaMsg pour ajouter la ref automatiquement
   * si la fonction existe dans le contexte global (index.html)
   */
  function patchBuildNovaMsg() {
    if (typeof window.buildNovaMsg !== 'function') return;
    var original = window.buildNovaMsg;
    window.buildNovaMsg = function (partenaire, service, ville) {
      var ref = getRef();
      if (!ref) return original(partenaire, service, ville);
      var vendor = NOVA_VENDORS[ref];
      var label = vendor ? vendor.nom + ' (' + vendor.id.toUpperCase() + ')' : ref.toUpperCase();
      var now = new Date();
      var date = now.toLocaleDateString('fr-FR');
      var heure = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      return encodeURIComponent(
        '\uD83D\uDD14 NOVAprotect | Nouvelle demande' +
        '\n\n\uD83D\uDCCB Partenaire : ' + partenaire +
        '\n\uD83C\uDFAF Service : ' + service +
        '\n\uD83D\uDCCD Ville : ' + ville +
        '\n\uD83D\uDD50 ' + date + ' \u00E0 ' + heure +
        '\n\n\u27A1\uFE0F A dispatcher vers le partenaire concern\u00E9.' +
        '\n\n\uD83C\uDFF7\uFE0F R\u00E9f. vendeur : ' + label
      );
    };
  }

  /**
   * Surcharge sendCartToWhatsapp pour ajouter la ref au panier
   */
  function patchSendCart() {
    if (typeof window.sendCartToWhatsapp !== 'function') return;
    var original = window.sendCartToWhatsapp;
    window.sendCartToWhatsapp = function () {
      var ref = getRef();
      if (!ref) { original(); return; }
      var vendor = NOVA_VENDORS[ref];
      var label = vendor ? vendor.nom + ' (' + vendor.id.toUpperCase() + ')' : ref.toUpperCase();
      /* Patch temporaire de injectRef dans le panier */
      var _origOpen = window.open;
      window.open = function (url, target) {
        if (url && url.includes('wa.me')) {
          var decoded = decodeURIComponent(url.split('?text=')[1] || '');
          var patched = decoded + '\n\nReference vendeur : ' + label;
          url = url.split('?text=')[0] + '?text=' + encodeURIComponent(patched);
        }
        return _origOpen.call(window, url, target);
      };
      original();
      /* Restaurer window.open apres l'appel */
      setTimeout(function () { window.open = _origOpen; }, 1000);
    };
  }

  /* ── STATISTIQUES LEGERES (enregistrement local) ── */
  function recordClick() {
    var ref = getRef();
    if (!ref) return;
    try {
      var statsKey = 'nova_stats_' + ref;
      var stats = JSON.parse(localStorage.getItem(statsKey) || '{}');
      stats.clicks = (stats.clicks || 0) + 1;
      stats.lastClick = Date.now();
      localStorage.setItem(statsKey, JSON.stringify(stats));
    } catch (e) {}
  }

  function recordDemande() {
    var ref = getRef();
    if (!ref) return;
    try {
      var statsKey = 'nova_stats_' + ref;
      var stats = JSON.parse(localStorage.getItem(statsKey) || '{}');
      stats.demandes = (stats.demandes || 0) + 1;
      stats.lastDemande = Date.now();
      localStorage.setItem(statsKey, JSON.stringify(stats));
    } catch (e) {}
  }

  function getStats(refId) {
    try {
      return JSON.parse(localStorage.getItem('nova_stats_' + refId) || '{}');
    } catch (e) {
      return {};
    }
  }

  /* ── INIT ── */
  function init() {
    detectFromUrl();
    /* Attendre que les fonctions principales soient chargees */
    var attempts = 0;
    var interval = setInterval(function () {
      attempts++;
      if (typeof window.buildNovaMsg === 'function') {
        patchBuildNovaMsg();
        clearInterval(interval);
      }
      if (attempts > 30) clearInterval(interval);
    }, 100);

    var cartAttempts = 0;
    var cartInterval = setInterval(function () {
      cartAttempts++;
      if (typeof window.sendCartToWhatsapp === 'function') {
        patchSendCart();
        clearInterval(cartInterval);
      }
      if (cartAttempts > 30) clearInterval(cartInterval);
    }, 100);
  }

  /* ── API PUBLIQUE ── */
  window.NovaAffiliation = {
    getRef: getRef,
    getVendor: getVendor,
    getVendorLabel: getVendorLabel,
    injectRef: injectRef,
    saveRef: saveRef,
    clearRef: clearRef,
    recordDemande: recordDemande,
    recordClick: recordClick,
    getStats: getStats,
    VENDORS: NOVA_VENDORS
  };

  /* Lancer au plus tot */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
