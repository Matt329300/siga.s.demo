/* Siga Siga – drobne skrypty. Strona działa też bez JS (poza menu-kartą na telefonie, które wtedy nie jest potrzebne – linki są w stopce sekcji). */
(function () {
  "use strict";

  /* ---------- Menu (karta nawigacji) ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");

  function closeNav() {
    nav.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  }
  function openNav() {
    nav.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    var first = nav.querySelector("a");
    if (first) first.focus();
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.hidden ? openNav() : closeNav();
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !nav.hidden) { closeNav(); toggle.focus(); }
    });
    document.addEventListener("click", function (e) {
      if (!nav.hidden && !nav.contains(e.target) && e.target !== toggle) closeNav();
    });
  }

  /* ---------- Godziny: "dziś" + czy teraz otwarte ---------- */
  // Dni: 0 = niedziela ... 6 = sobota. Godziny w czasie warszawskim.
  // null = zamknięte; "unknown" = brak danych; close: null = godzina zamknięcia nieznana.
  // Źródło: profil lokalu na Instagramie (@sigasigawarsaw: „śr-cz 13-21 | pt-sb 13-22 | nd 13-20”)
  // oraz Google Maps (pon. i wt. zamknięte) – stan 22.11.2026.
  var HOURS = {
    0: { open: 13, close: 20 },
    1: null,
    2: null,
    3: { open: 13, close: 21 },
    4: { open: 13, close: 21 },
    5: { open: 13, close: 22 },
    6: { open: 13, close: 22 }
  };

  function warsawNow() {
    try {
      var parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Warsaw", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false
      }).formatToParts(new Date());
      var map = {};
      parts.forEach(function (p) { map[p.type] = p.value; });
      var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      return { day: days[map.weekday], hour: parseInt(map.hour, 10) % 24 + parseInt(map.minute, 10) / 60 };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), hour: d.getHours() + d.getMinutes() / 60 };
    }
  }

  var now = warsawNow();
  var row = document.querySelector('.hours__table tr[data-day="' + now.day + '"]');
  if (row) row.classList.add("is-today");

  var status = document.getElementById("hours-status");
  if (status) {
    var h = HOURS[now.day];
    var text, closed = false;
    if (h === "unknown") {
      text = "";
    } else if (h === null) {
      text = "Dziś zamknięte. Zapraszamy od środy.";
      closed = true;
    } else if (now.hour < h.open) {
      text = "Dziś otwieramy o " + h.open + ":00.";
    } else if (h.close === null) {
      text = "Dziś otwarte od " + h.open + ":00.";
    } else if (now.hour < h.close) {
      text = "Teraz otwarte – do " + h.close + ":00.";
    } else {
      text = "Na dziś już zamknięte.";
      closed = true;
    }
    status.textContent = text;
    if (closed) status.classList.add("is-closed-now");
  }

  /* ---------- Menu PL / EN ---------- */
  // Obie wersje karty są w HTML; przełącznik pokazuje jedną z nich. Wybór zapamiętywany w przeglądarce.
  var langBlocks = document.querySelectorAll(".menu-lang");
  var langButtons = document.querySelectorAll(".lang-switch__btn");

  function setMenuLang(lang) {
    langBlocks.forEach(function (el) { el.hidden = el.getAttribute("data-lang") !== lang; });
    langButtons.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-set-lang") === lang)); });
    try { localStorage.setItem("sigasiga-menu-lang", lang); } catch (e) { /* brak dostępu – trudno */ }
  }

  document.querySelectorAll("[data-set-lang]").forEach(function (el) {
    el.addEventListener("click", function () { setMenuLang(el.getAttribute("data-set-lang")); });
  });

  var startLang = null;
  if (/^#(en|menu-en)$/i.test(location.hash) || /[?&]lang=en\b/i.test(location.search)) startLang = "en";
  if (!startLang) { try { startLang = localStorage.getItem("sigasiga-menu-lang"); } catch (e) { /* ignoruj */ } }
  if (startLang === "en") setMenuLang("en");

  /* ---------- Rok w stopce ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
