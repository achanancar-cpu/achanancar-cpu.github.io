/* =====================================================================
 * ACHANAN CAR — script principal
 * ---------------------------------------------------------------------
 * ===================================================================== */
/* La configuration est dans assets/js/config.js */


(function () {
  "use strict";
  var d = document, LANGS = ["fr", "ar", "en"], lang = "fr";
  d.documentElement.classList.remove("no-js");

  // ---------- Langue ----------
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function t(key, vars) {
    var dict = (window.I18N && I18N[lang]) || {}, s = dict[key];
    if (s == null) s = (I18N.fr && I18N.fr[key]) || key;
    if (vars) Object.keys(vars).forEach(function (k) { s = s.split("{" + k + "}").join(vars[k]); });
    return s;
  }
  function frT(key) { return (I18N.fr && I18N.fr[key]) || key; }
  function qs(name) { var m = new RegExp("[?&]" + name + "=([^&#]*)").exec(location.search); return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : ""; }

  function applyLang(l) {
    lang = LANGS.indexOf(l) > -1 ? l : "fr";
    var html = d.documentElement;
    html.lang = lang; html.dir = lang === "ar" ? "rtl" : "ltr";
    d.querySelectorAll("[data-i18n]").forEach(function (el) { el.innerHTML = t(el.getAttribute("data-i18n")); });
    d.querySelectorAll("[data-i18n-ph]").forEach(function (el) { el.placeholder = t(el.getAttribute("data-i18n-ph")); });
    d.querySelectorAll("[data-i18n-content]").forEach(function (el) { el.content = t(el.getAttribute("data-i18n-content")); });
    d.querySelectorAll("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"))); });
    d.querySelectorAll(".lang button").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-lang") === lang); b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang); });
    d.querySelectorAll("a[data-wa]").forEach(function (a) { a.href = waLink(t("wa.hello")); });
    store("ac_lang", lang);
    renderCars();
  }
  function waLink(text) { return "https://wa.me/" + CONFIG.whatsapp + (text ? "?text=" + encodeURIComponent(text) : ""); }

  d.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { applyLang(b.getAttribute("data-lang")); });
  });

  // ---------- Menu mobile ----------
  var burger = d.querySelector(".burger"), menu = d.getElementById("menu");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", open);
    });
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }); });
  }
  var y = d.getElementById("year"); if (y) y.textContent = new Date().getFullYear();

  // ---------- Email + réseaux sociaux (depuis CONFIG) ----------
  if (CONFIG.email) {
    var mail = "mailto:" + CONFIG.email;
    d.querySelectorAll("[data-email]").forEach(function (li) { li.hidden = false; li.innerHTML = '<a href="' + mail + '">' + CONFIG.email + "</a>"; });
    d.querySelectorAll("[data-email-row]").forEach(function (li) { li.hidden = false; });
    d.querySelectorAll("[data-email-inline]").forEach(function (s) { s.innerHTML = '<a href="' + mail + '">' + CONFIG.email + "</a>"; });
  }
  var SOC = {
    facebook: "M14 13.5h2.5l1-4H14v-2c0-1 0-2 2-2h1.5V2.1C17.2 2.1 15.9 2 14.5 2 11.6 2 9.5 3.7 9.5 7v2.5h-3v4h3V22h4.5z",
    instagram: "M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.4 5.6 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.6 18.4 4 16.4 4H7.6zm9.6 1.5a1.3 1.3 0 1 1 0 2.5 1.3 1.3 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
    tiktok: "M16.6 5.8a4.3 4.3 0 0 1-1-2.8h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.9 5.7V9.1a7.4 7.4 0 0 0 4.3 1.4V7.4s-1.9.1-3.3-1.6z",
    whatsapp: "M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14c-.2.6-1.3 1.2-1.8 1.3-.5 0-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.6-4.1-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.1.1.3 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 1.9 1.1.9 2 1.2 2.3 1.4.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"
  };
  d.querySelectorAll("[data-social]").forEach(function (box) {
    var links = [["whatsapp", waLink("")]];
    ["facebook", "instagram", "tiktok"].forEach(function (k) { if (CONFIG.social[k]) links.push([k, CONFIG.social[k]]); });
    box.innerHTML = links.map(function (l) {
      return '<a href="' + l[1] + '" target="_blank" rel="noopener" aria-label="' + l[0] + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + SOC[l[0]] + '"/></svg></a>';
    }).join("");
  });

  // ---------- Voitures ----------
  var ICON = {
    year: "M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V10h14v10z",
    fuel: "M19.8 7.2 16.2 3.6l-1 1 2 2.1A2.5 2.5 0 0 0 18.5 11c.4 0 .7-.1 1-.2V18a1 1 0 0 1-2 0v-4.5c0-1.1-.9-2-2-2h-1V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v16h10v-7.5h1.5V18a2.5 2.5 0 0 0 5 0V8.5c0-.5-.2-1-.7-1.3zM12 10H6V5h6v5z",
    gear: "M6 3a2 2 0 0 0-1 3.7v10.6A2 2 0 1 0 7 17.3V13h4v4.3a2 2 0 1 0 2 0V13h4c1.1 0 2-.9 2-2V6.7A2 2 0 1 0 17 6.7V11h-4V6.7a2 2 0 1 0-2 0V11H7V6.7A2 2 0 0 0 6 3z",
    seat: "M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 2c-2.3 0-7 1.2-7 3.5V19h14v-2.5C15 14.2 10.3 13 8 13zm8 0c-.3 0-.6 0-1 .1 1.2.8 2 2 2 3.4V19h6v-2.5c0-2.3-4.7-3.5-7-3.5z",
    wa: "M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14c-.2.6-1.3 1.2-1.8 1.3-.5 0-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.6-4.1-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.1.1.3 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 1.9 1.1.9 2 1.2 2.3 1.4.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"
  };
  function svg(p) { return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + p + '"/></svg>'; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function illu(c) { return "assets/img/cars/" + c.id + ".svg"; }

  function carCard(c) {
    c.cats = (c.cats && c.cats.length) ? c.cats : ["eco"];
    var name = c.brand + " " + c.model, photos = (c.photos && c.photos.length) ? c.photos : [illu(c)];
    var isIllu = !(c.photos && c.photos.length);
    var dots = photos.length > 1 ? '<div class="car-dots">' + photos.map(function (p, i) {
      return '<button type="button" data-i="' + i + '" aria-label="' + esc(t("car.photo", { i: i + 1 })) + '"' + (i ? "" : ' class="on"') + "></button>";
    }).join("") + "</div>" : "";
    var msg = t("wa.car", { car: name, year: c.year || "" }).replace(" ()", "");
    return '<article class="car" data-id="' + esc(c.id) + '">' +
      '<div class="car-media"><span class="car-tag">' + esc(t("cat." + c.cats[0])) + '</span>' +
      '<img ' + (isIllu ? 'class="illu" ' : "") + 'src="' + esc(photos[0]) + '" alt="' + esc("Location " + name + " Casablanca") + '" loading="lazy" width="400" height="250" data-photos="' + esc(JSON.stringify(photos)) + '" data-fallback="' + illu(c) + '" data-fallback2="assets/img/cars/cat-' + esc(c.cats[0] || "eco") + '.svg">' + dots + "</div>" +
      '<div class="car-body"><div class="car-title"><h3>' + esc(name) + "</h3><span>" + c.year + "</span></div>" +
      '<ul class="specs">' + (c.year ? "<li>" + svg(ICON.year) + esc(t("car.year")) + " " + c.year + "</li>" : "") + "<li>" + svg(ICON.fuel) + esc(t("car.fuel." + c.fuel)) +
      "</li><li>" + svg(ICON.gear) + esc(t("car.trans." + c.trans)) + "</li><li>" + svg(ICON.seat) + esc(t("car.seats", { n: c.seats })) + "</li>" + (c.year ? "" : "<li>" + svg(ICON.year) + esc(t("cat." + c.cats[0])) + "</li>") + "</ul>" +
      '<div class="price"><span>' + esc(t("car.price")) + "</span><b>" + esc(t("cat." + c.cats[0])) + "</b></div>" +
      '<div class="car-actions"><a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="' + waLink(msg) + '">' + svg(ICON.wa) + esc(t("btn.bookwa")) + "</a>" +
      '<a class="btn btn-outline btn-sm" href="reservation.html?car=' + encodeURIComponent(c.id) + '">' + esc(t("btn.form")) + "</a></div></div></article>";
  }

  var currentFilter = "all";
  function renderCars() {
    var cars = window.CARS || [];
    var feat = d.getElementById("featured");
    if (feat) feat.innerHTML = cars.filter(function (c) { return c.featured; }).slice(0, 6).map(carCard).join("");
    var cat = d.getElementById("catalog");
    if (cat) {
      var list = cars.filter(function (c) { return currentFilter === "all" || c.cats.indexOf(currentFilter) > -1; });
      cat.innerHTML = list.length ? list.map(carCard).join("") : '<p class="empty" style="grid-column:1/-1">' + esc(t("car.empty")) + "</p>";
      var cnt = d.getElementById("count"); if (cnt) cnt.textContent = t("car.count", { n: list.length });
      d.querySelectorAll(".chip").forEach(function (b) { var on = b.getAttribute("data-filter") === currentFilter; b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); });
    }
    d.querySelectorAll(".car-media img").forEach(function (img) {
      img.addEventListener("error", function () {
        var f1 = img.getAttribute("data-fallback"), f2 = img.getAttribute("data-fallback2");
        img.classList.add("illu");
        if (img.src.indexOf(f1) === -1 && img.src.indexOf(f2) === -1) img.src = f1;
        else if (img.src.indexOf(f2) === -1) img.src = f2;
      });
    });
  }
  d.addEventListener("click", function (e) {
    var dot = e.target.closest && e.target.closest(".car-dots button");
    if (dot) {
      var media = dot.closest(".car-media"), img = media.querySelector("img"), photos = JSON.parse(img.getAttribute("data-photos"));
      img.classList.remove("illu"); img.src = photos[+dot.getAttribute("data-i")];
      media.querySelectorAll(".car-dots button").forEach(function (b) { b.classList.toggle("on", b === dot); });
    }
    var chip = e.target.closest && e.target.closest(".chip");
    if (chip) {
      currentFilter = chip.getAttribute("data-filter"); renderCars();
      try { history.replaceState(null, "", currentFilter === "all" ? location.pathname : "#" + currentFilter); } catch (err) {}
    }
  });
  var hash = location.hash.replace("#", "");
  if (["eco", "berline", "suv", "auto", "hybrid", "family"].indexOf(hash) > -1) currentFilter = hash;

  // ---------- Animation d'apparition ----------
  var rev = d.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }); }, { threshold: .12 });
    rev.forEach(function (el) { io.observe(el); });
  } else rev.forEach(function (el) { el.classList.add("in"); });

  // ---------- Dates ----------
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function localISO(dt, withTime) { var s = dt.getFullYear() + "-" + pad(dt.getMonth() + 1) + "-" + pad(dt.getDate()); return withTime ? s + "T" + pad(dt.getHours()) + ":" + pad(dt.getMinutes()) : s; }
  function fmt(v) { if (!v) return ""; var p = v.split("T"), dd = p[0].split("-"); return dd[2] + "/" + dd[1] + "/" + dd[0] + (p[1] ? " " + p[1] : ""); }
  var today = localISO(new Date());

  // Recherche rapide (accueil)
  var qStart = d.getElementById("q-start"), qEnd = d.getElementById("q-end");
  if (qStart && qEnd) {
    qStart.min = today; qEnd.min = today;
    qStart.addEventListener("change", function () { qEnd.min = qStart.value || today; if (qEnd.value && qEnd.value < qStart.value) qEnd.value = qStart.value; });
  }

  // ---------- API Google Apps Script ----------
  function api(payload) {
    return fetch(CONFIG.apiUrl, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json(); })
      .then(function (j) { if (!j.ok) { var e = new Error(j.error || "error"); e.code = j.error; throw e; } return j; });
  }
  function fillCarSelect() {
    var sel = d.getElementById("b-car"); if (!sel) return;
    var keep = sel.value || qs("car");
    var first = sel.querySelector('option[value=""]');
    sel.innerHTML = ""; if (first) sel.appendChild(first);
    (window.CARS || []).forEach(function (c) { var o = d.createElement("option"); o.value = c.id; o.textContent = c.brand + " " + c.model + (c.year ? " (" + c.year + ")" : ""); sel.appendChild(o); });
    if (keep && sel.querySelector('option[value="' + String(keep).replace(/"/g, "") + '"]')) sel.value = keep;
  }
  if (CONFIG.apiUrl) {
    var cached = null; try { cached = JSON.parse(sessionStorage.getItem("ac_cars") || "null"); } catch (e) {}
    if (cached && cached.length) { window.CARS = cached; renderCars(); fillCarSelect(); }
    fetch(CONFIG.apiUrl + "?action=cars").then(function (r) { return r.json(); }).then(function (j) {
      if (j.ok && j.cars) { window.CARS = j.cars; try { sessionStorage.setItem("ac_cars", JSON.stringify(j.cars)); } catch (e) {} renderCars(); fillCarSelect(); }
    }).catch(function () { /* on garde la liste locale */ });
  }

  // ---------- Envoi par email (Web3Forms, seulement si pas d'API) ----------
  function send(payload) {
    if (!CONFIG.web3formsKey) return Promise.reject(new Error("no-key"));
    payload.access_key = CONFIG.web3formsKey;
    return fetch("https://api.web3forms.com/submit", {
      method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(payload)
    }).then(function (r) { return r.json(); }).then(function (j) { if (!j.success) throw new Error(j.message || "error"); return j; });
  }
  function showAlert(box, ok, titleKey, textKey, waText, ref) {
    box.className = "alert show " + (ok ? "ok" : "err");
    box.innerHTML = "<h3>" + t(titleKey) + "</h3>" + (ref ? '<p class="ref">' + t("f.ref") + ' : <b dir="ltr">' + esc(ref) + "</b></p>" : "") + "<p>" + t(textKey) + "</p>" +
      (waText ? '<a class="btn btn-wa" target="_blank" rel="noopener" href="' + waLink(waText) + '">' + svg(ICON.wa) + t("f.ok.wa") + "</a>" : "");
    box.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function markInvalid(form) {
    var bad = null;
    form.querySelectorAll("[required]").forEach(function (el) {
      var empty = el.type === "checkbox" ? !el.checked : !String(el.value).trim();
      el.classList.toggle("field-error", empty); if (empty && !bad) bad = el;
    });
    return bad;
  }
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, PHONE_RE = /^[+0-9][0-9\s().-]{7,}$/;

  // Réservation
  var bf = d.getElementById("booking");
  if (bf) {
    var el = function (id) { return d.getElementById(id); };
    var bStart = el("b-start"), bEnd = el("b-end"), nowMin = localISO(new Date(), true);
    bStart.min = nowMin; bEnd.min = nowMin;
    bStart.addEventListener("change", function () { bEnd.min = bStart.value || nowMin; });
    // Pré-remplissage depuis l'URL (?car=, ?pickup=, ?start=, ?end=, ?cat=)
    var pc = qs("car"); if (pc && el("b-car").querySelector('option[value="' + pc.replace(/"/g, "") + '"]')) el("b-car").value = pc;
    var pk = qs("pickup"); if (pk && el("b-pickup").querySelector('option[value="' + pk.replace(/"/g, "") + '"]')) { el("b-pickup").value = pk; el("b-dropoff").value = pk; }
    var ps = qs("start"); if (/^\d{4}-\d{2}-\d{2}$/.test(ps)) bStart.value = ps + "T10:00";
    var pe = qs("end"); if (/^\d{4}-\d{2}-\d{2}$/.test(pe)) bEnd.value = pe + "T10:00";
    var pcat = qs("cat");
    if (pcat && !pc) { var first = (window.CARS || []).filter(function (c) { return c.cats.indexOf(pcat) > -1; })[0]; if (first) el("b-msg").value = t("quick.cat") + " : " + t("cat." + pcat); }

    bf.addEventListener("submit", function (e) {
      e.preventDefault();
      var box = el("b-alert"); box.className = "alert";
      if (el("b-hp").value) return; // robot
      var bad = markInvalid(bf);
      var err = null;
      if (bad) err = "f.err.required";
      else if (!PHONE_RE.test(el("b-phone").value.trim())) { err = "f.err.phone"; bad = el("b-phone"); }
      else if (!EMAIL_RE.test(el("b-email").value.trim())) { err = "f.err.email"; bad = el("b-email"); }
      else if (new Date(bStart.value) < new Date(Date.now() - 5 * 60000)) { err = "f.err.past"; bad = bStart; }
      else if (new Date(bEnd.value) <= new Date(bStart.value)) { err = "f.err.dates"; bad = bEnd; }
      if (err) {
        box.className = "alert show err"; box.innerHTML = "<p>" + t(err) + "</p>";
        if (bad) { bad.classList.add("field-error"); bad.focus(); } return;
      }
      var carSel = el("b-car"), carTxt = carSel.value ? carSel.options[carSel.selectedIndex].text : t("f.car.any");
      var pickTxt = function (sel, L) { return (L === "fr" ? frT : t)("loc." + sel.value); };
      var data = {
        name: el("b-name").value.trim(), phone: el("b-phone").value.trim(), email: el("b-email").value.trim(),
        car: carSel.value ? carTxt : frT("f.car.any"), start: fmt(bStart.value), end: fmt(bEnd.value),
        pickup: pickTxt(el("b-pickup"), "fr"), dropoff: pickTxt(el("b-dropoff"), "fr"),
        address: el("b-address").value.trim(), message: el("b-msg").value.trim()
      };
      var lines = [t("wa.booking"), "",
        "• " + t("f.name") + " : " + data.name, "• " + t("f.phone") + " : " + data.phone, "• " + t("f.email") + " : " + data.email,
        "• " + t("f.car") + " : " + carTxt, "• " + t("f.start") + " : " + data.start, "• " + t("f.end") + " : " + data.end,
        "• " + t("f.pickup") + " : " + pickTxt(el("b-pickup")), "• " + t("f.dropoff") + " : " + pickTxt(el("b-dropoff"))];
      if (data.address) lines.push("• " + t("f.address") + " : " + data.address);
      if (data.message) lines.push("• " + t("f.msg") + " : " + data.message);
      lines.push("", t("wa.verify"));
      var waText = lines.join("\n");

      var btn = el("b-submit"), label = btn.innerHTML; btn.disabled = true; btn.innerHTML = t("f.sending");
      if (CONFIG.apiUrl) {
        api({ action: "book", name: data.name, phone: data.phone, email: data.email, car: carSel.value, start: bStart.value, end: bEnd.value,
              pickup: el("b-pickup").value, dropoff: el("b-dropoff").value, address: data.address, message: data.message, lang: lang, botcheck: el("b-hp").value })
        .then(function (j) {
          var wt = waText.replace(t("wa.booking"), t("wa.booking") + "\n" + t("f.ref") + " : " + j.ref);
          showAlert(box, true, "f.ok.title", "f.ok.text2", wt, j.ref); bf.reset();
        }).catch(function (er) {
          var map = { bad_dates: "f.err.dates", past_date: "f.err.past", bad_phone: "f.err.phone", bad_email: "f.err.email", missing_fields: "f.err.required" };
          if (map[er.code]) { box.className = "alert show err"; box.innerHTML = "<p>" + t(map[er.code]) + "</p>"; }
          else showAlert(box, false, "f.err.title", "f.err.text", waText);
        }).then(function () { btn.disabled = false; btn.innerHTML = label; });
        return;
      }
      send({
        subject: frT("f.subject") + " — " + data.name + " — " + data.start, from_name: "Site ACHANAN CAR",
        "Nom et prénom": data.name, "Téléphone": data.phone, email: data.email, "Voiture souhaitée": data.car,
        "Départ": data.start, "Retour": data.end, "Lieu de livraison": data.pickup, "Lieu de restitution": data.dropoff,
        "Adresse / vol": data.address || "-", "Message": data.message || "-", "Langue du client": lang.toUpperCase(),
        "Statut": "À VÉRIFIER — disponibilité non confirmée", botcheck: ""
      }).then(function () {
        showAlert(box, true, "f.ok.title", "f.ok.text", waText); bf.reset();
      }).catch(function () {
        showAlert(box, false, "f.err.title", "f.err.text", waText);
      }).then(function () { btn.disabled = false; btn.innerHTML = label; });
    });
  }

  // Contact
  var cf = d.getElementById("contact");
  if (cf) {
    cf.addEventListener("submit", function (e) {
      e.preventDefault();
      var g = function (id) { return d.getElementById(id); }, box = g("c-alert");
      if (g("c-hp").value) return;
      var bad = markInvalid(cf), err = null;
      if (bad) err = "f.err.required";
      else if (!PHONE_RE.test(g("c-phone").value.trim())) { err = "f.err.phone"; bad = g("c-phone"); }
      else if (g("c-email").value.trim() && !EMAIL_RE.test(g("c-email").value.trim())) { err = "f.err.email"; bad = g("c-email"); }
      if (err) { box.className = "alert show err"; box.innerHTML = "<p>" + t(err) + "</p>"; bad.classList.add("field-error"); bad.focus(); return; }
      var name = g("c-name").value.trim(), phone = g("c-phone").value.trim(), mail = g("c-email").value.trim(), msg = g("c-msg").value.trim();
      var waText = t("wa.hello") + "\n\n" + msg + "\n\n— " + name + " (" + phone + ")";
      var btn = g("c-submit"), label = btn.innerHTML; btn.disabled = true; btn.innerHTML = t("f.sending");
      var payload = { subject: frT("ct.subject") + " — " + name, from_name: "Site ACHANAN CAR", "Nom": name, "Téléphone": phone, "Message": msg, "Langue du client": lang.toUpperCase(), botcheck: "" };
      if (mail) payload.email = mail;
      send(payload).then(function () { showAlert(box, true, "ct.ok.title", "ct.ok.text", null); cf.reset(); })
        .catch(function () { showAlert(box, false, "f.err.title", "f.err.text", waText); })
        .then(function () { btn.disabled = false; btn.innerHTML = label; });
    });
  }
  d.querySelectorAll("input,select,textarea").forEach(function (f) { f.addEventListener("input", function () { f.classList.remove("field-error"); }); });

  // ---------- Démarrage ----------
  var start = qs("lang") || store("ac_lang") || "fr";
  applyLang(start);
})();
