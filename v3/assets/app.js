/* v3: språk (nb/en/ru) og sesong (vinter/sommer). Ingen avhengigheter. */
(function () {
  var LANGS = ["nb", "en", "ru"];
  var SEASONS = ["vinter", "sommer"];

  function param(name) {
    var m = new RegExp("[?&]" + name + "=([^&]+)").exec(location.search);
    return m ? decodeURIComponent(m[1]) : null;
  }
  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  function defaultSeason() {
    var m = new Date().getMonth() + 1; // 1..12
    return (m >= 11 || m <= 4) ? "vinter" : "sommer";
  }

  var lang = param("lang") || load("lgb_lang") || (navigator.language || "nb").slice(0, 2);
  if (LANGS.indexOf(lang) < 0) lang = "nb";
  var season = param("sesong") || load("lgb_season") || defaultSeason();
  if (SEASONS.indexOf(season) < 0) season = defaultSeason();

  function t(key) {
    var d = window.I18N[lang] || window.I18N.nb;
    return (key in d) ? d[key] : (window.I18N.nb[key] !== undefined ? window.I18N.nb[key] : key);
  }

  function applyLang() {
    document.documentElement.lang = lang === "nb" ? "nb" : lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = t(el.getAttribute("data-i18n"));
      if (Array.isArray(v)) {
        el.innerHTML = "";
        v.forEach(function (s) { var li = document.createElement("li"); li.textContent = s; el.appendChild(li); });
      } else {
        el.textContent = v;
      }
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) { el.placeholder = t(el.getAttribute("data-i18n-ph")); });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"))); });
    document.querySelectorAll("[data-i18n-title]").forEach(function (el) { document.title = t(el.getAttribute("data-i18n-title")); });
    document.querySelectorAll(".langsw a").forEach(function (a) {
      var isCur = a.getAttribute("data-lang") === lang;
      if (isCur) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    store("lgb_lang", lang);
  }

  function applySeason() {
    document.body.setAttribute("data-season", season);
    document.querySelectorAll("[data-season-btn]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-season-btn") === season ? "true" : "false");
    });
    document.querySelectorAll("[data-only-season]").forEach(function (el) {
      var s = el.getAttribute("data-only-season");
      el.hidden = !(s === season || s === "alle");
    });
    document.querySelectorAll("[data-season-name]").forEach(function (el) {
      el.textContent = t(season === "vinter" ? "season_winter" : "season_summer");
    });
    store("lgb_season", season);
  }

  window.LGB = {
    setLang: function (l) { if (LANGS.indexOf(l) >= 0) { lang = l; applyLang(); applySeason(); } },
    setSeason: function (s) { if (SEASONS.indexOf(s) >= 0) { season = s; applySeason(); } },
    get lang() { return lang; }, get season() { return season; }, t: t
  };

  document.addEventListener("DOMContentLoaded", function () {
    applyLang(); applySeason();
    document.querySelectorAll(".langsw a[data-lang]").forEach(function (a) {
      a.addEventListener("click", function (e) { e.preventDefault(); window.LGB.setLang(a.getAttribute("data-lang")); });
    });
    document.querySelectorAll("[data-season-btn]").forEach(function (b) {
      b.addEventListener("click", function () { window.LGB.setSeason(b.getAttribute("data-season-btn")); });
    });
    document.querySelectorAll("[data-season-link]").forEach(function (a) {
      a.addEventListener("click", function () { window.LGB.setSeason(a.getAttribute("data-season-link")); });
    });
  });
})();
