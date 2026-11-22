/* ACHANAN CAR — Espace agence (réservations + voitures)
 * Les données sont lues et enregistrées dans le Google Sheet via l'API Apps Script (CONFIG.apiUrl). */
(function () {
  "use strict";
  var d = document, $ = function (id) { return d.getElementById(id); };

  /* ---------------- Textes FR / AR ---------------- */
  var TXT = {
    fr: {
      "login.title": "Espace agence", "login.sub": "Gestion des réservations et des voitures", "login.pw": "Mot de passe", "login.go": "Se connecter", "back": "← Retour au site",
      "err.bad_password": "Mot de passe incorrect.", "err.locked": "Trop d'essais. Réessayez dans 15 minutes.", "err.no_password_set": "Aucun mot de passe défini : dans le Google Sheet, menu ACHANAN CAR › 2. Définir le mot de passe admin.",
      "err.network": "Connexion impossible. Vérifiez internet et l'adresse apiUrl dans config.js.", "err.noapi": "L'adresse de l'API n'est pas encore configurée (apiUrl dans assets/js/config.js). Suivez le guide, étape 3.",
      "err.auth": "Session expirée, reconnectez-vous.", "err.setup_required": "Le Google Sheet n'est pas installé : menu ACHANAN CAR › 1. Installer.", "err.missing_fields": "Marque et modèle obligatoires.", "err.missing_category": "Choisissez au moins une catégorie.", "err.generic": "Erreur : ",
      "tab.dash": "Tableau de bord", "tab.bookings": "Demandes", "tab.cars": "Voitures", "refresh": "Actualiser", "sheet": "Ouvrir le Google Sheet", "logout": "Déconnexion",
      "search": "Rechercher : nom, téléphone, référence, voiture…",
      "kpi.new": "Nouvelles demandes", "kpi.wait": "En attente du client", "kpi.upcoming": "Confirmées à venir", "kpi.now": "Locations en cours", "kpi.avail": "Voitures disponibles", "kpi.maint": "En maintenance",
      "dash.moves": "Départs et retours (aujourd'hui et demain)", "dash.latest": "Dernières demandes à traiter", "dash.none": "Rien de prévu.", "dash.nolatest": "Aucune demande en attente. 👍",
      "mv.out": "DÉPART", "mv.in": "RETOUR", "today": "Aujourd'hui", "tomorrow": "Demain",
      "st.all": "Toutes", "st.nouvelle": "Nouvelle", "st.attente": "En attente", "st.confirmee": "Confirmée", "st.refusee": "Refusée", "st.annulee": "Annulée", "st.terminee": "Terminée",
      "et.disponible": "Disponible", "et.louee": "Louée", "et.maintenance": "Maintenance",
      "bk.none": "Aucune demande.", "bk.client": "Client", "bk.phone": "Téléphone", "bk.email": "Email", "bk.car": "Voiture", "bk.start": "Départ", "bk.end": "Retour",
      "bk.pickup": "Livraison", "bk.dropoff": "Restitution", "bk.address": "Adresse / vol", "bk.message": "Message", "bk.lang": "Langue", "bk.created": "Reçue le",
      "bk.status": "Statut", "bk.price": "Prix convenu", "bk.price.ph": "ex. 1 500 MAD", "bk.note": "Note interne (non visible par le client)", "bk.assign": "Voiture attribuée",
      "bk.save": "Enregistrer", "bk.wa": "Écrire au client sur WhatsApp", "bk.call": "Appeler", "bk.days": "jour(s)", "bk.saved": "Demande mise à jour.",
      "bk.conflict": "Attention : cette voiture est déjà confirmée sur ces dates :", "bk.force": "Confirmer quand même", "bk.waHint": "Le message WhatsApp est rédigé dans la langue du client selon le statut.", "nopref": "Pas de préférence",
      "cars.title": "Flotte", "cars.add": "+ Ajouter une voiture", "cars.edit": "Modifier la voiture", "cars.new": "Nouvelle voiture", "cars.none": "Aucune voiture. Ajoutez la première !",
      "car.brand": "Marque", "car.model": "Modèle", "car.year": "Année", "car.fuel": "Carburant", "car.trans": "Boîte", "car.seats": "Places", "car.cats": "Catégories (au moins une)",
      "car.photos": "Photos (la 1re est la principale)", "car.upload": "📷 Ajouter des photos", "car.addurl": "Ajouter le lien", "car.urlph": "ou collez le lien d'une photo (https://…)",
      "car.featured": "Afficher sur la page d'accueil", "car.active": "Visible sur le site", "car.state": "État", "car.plate": "Immatriculation (interne)", "car.notes": "Notes internes", "car.order": "Ordre d'affichage",
      "car.save": "Enregistrer", "car.delete": "Supprimer", "car.confirmDel": "Supprimer définitivement cette voiture ? Les anciennes demandes restent dans le Google Sheet.", "car.saved": "Voiture enregistrée.", "car.deleted": "Voiture supprimée.",
      "car.upcoming": "réservation(s) confirmée(s) à venir", "car.rentedNow": "En location maintenant", "car.hidden": "Masquée du site", "uploading": "Envoi de la photo…", "uploaded": "Photo ajoutée. Pensez à enregistrer.",
      "cancel": "Annuler", "confirm": "Confirmer", "loading": "Chargement…",
      "fuel.diesel": "Diesel", "fuel.essence": "Essence", "fuel.hybride": "Hybride", "fuel.electrique": "Électrique", "trans.manuelle": "Manuelle", "trans.auto": "Automatique",
      "cat.eco": "Économique", "cat.berline": "Berline", "cat.suv": "SUV / 4x4", "cat.auto": "Automatique", "cat.hybrid": "Hybride", "cat.family": "Familiale 7 places"
    },
    ar: {
      "login.title": "فضاء الوكالة", "login.sub": "تدبير طلبات الحجز والسيارات", "login.pw": "كلمة السر", "login.go": "دخول", "back": "→ الرجوع إلى الموقع",
      "err.bad_password": "كلمة السر غير صحيحة.", "err.locked": "محاولات كثيرة. أعد المحاولة بعد 15 دقيقة.", "err.no_password_set": "لم يتم تحديد كلمة السر: في Google Sheet، القائمة ACHANAN CAR › 2. Définir le mot de passe admin.",
      "err.network": "تعذر الاتصال. تحقق من الإنترنت ومن رابط apiUrl في config.js.", "err.noapi": "رابط الـ API غير مضبوط بعد (apiUrl في assets/js/config.js). اتبع الدليل، المرحلة 3.",
      "err.auth": "انتهت الجلسة، المرجو الدخول من جديد.", "err.setup_required": "Google Sheet غير مثبت: القائمة ACHANAN CAR › 1. Installer.", "err.missing_fields": "الماركة والموديل إجباريان.", "err.missing_category": "اختر فئة واحدة على الأقل.", "err.generic": "خطأ: ",
      "tab.dash": "لوحة القيادة", "tab.bookings": "الطلبات", "tab.cars": "السيارات", "refresh": "تحديث", "sheet": "فتح Google Sheet", "logout": "خروج",
      "search": "بحث: الاسم، الهاتف، رقم الطلب، السيارة…",
      "kpi.new": "طلبات جديدة", "kpi.wait": "في انتظار الزبون", "kpi.upcoming": "مؤكدة قادمة", "kpi.now": "كراء جارٍ الآن", "kpi.avail": "سيارات متوفرة", "kpi.maint": "في الصيانة",
      "dash.moves": "الخروج والإرجاع (اليوم وغداً)", "dash.latest": "آخر الطلبات التي تنتظر المعالجة", "dash.none": "لا شيء مبرمج.", "dash.nolatest": "لا توجد طلبات في الانتظار. 👍",
      "mv.out": "خروج", "mv.in": "إرجاع", "today": "اليوم", "tomorrow": "غداً",
      "st.all": "الكل", "st.nouvelle": "جديد", "st.attente": "في الانتظار", "st.confirmee": "مؤكد", "st.refusee": "مرفوض", "st.annulee": "ملغى", "st.terminee": "منتهي",
      "et.disponible": "متوفرة", "et.louee": "مكتراة", "et.maintenance": "صيانة",
      "bk.none": "لا توجد طلبات.", "bk.client": "الزبون", "bk.phone": "الهاتف", "bk.email": "البريد", "bk.car": "السيارة", "bk.start": "الانطلاق", "bk.end": "الإرجاع",
      "bk.pickup": "مكان الاستلام", "bk.dropoff": "مكان الإرجاع", "bk.address": "العنوان / الرحلة", "bk.message": "الرسالة", "bk.lang": "اللغة", "bk.created": "تاريخ الطلب",
      "bk.status": "الحالة", "bk.price": "الثمن المتفق عليه", "bk.price.ph": "مثال: 1500 درهم", "bk.note": "ملاحظة داخلية (لا يراها الزبون)", "bk.assign": "السيارة المخصصة",
      "bk.save": "حفظ", "bk.wa": "مراسلة الزبون على واتساب", "bk.call": "اتصال", "bk.days": "يوم", "bk.saved": "تم تحديث الطلب.",
      "bk.conflict": "تنبيه: هذه السيارة مؤكدة مسبقاً في هذه التواريخ:", "bk.force": "تأكيد رغم ذلك", "bk.waHint": "رسالة واتساب تُكتب بلغة الزبون حسب حالة الطلب.", "nopref": "بدون تفضيل",
      "cars.title": "الأسطول", "cars.add": "+ إضافة سيارة", "cars.edit": "تعديل السيارة", "cars.new": "سيارة جديدة", "cars.none": "لا توجد سيارات. أضف الأولى!",
      "car.brand": "الماركة", "car.model": "الموديل", "car.year": "السنة", "car.fuel": "الوقود", "car.trans": "علبة السرعات", "car.seats": "المقاعد", "car.cats": "الفئات (واحدة على الأقل)",
      "car.photos": "الصور (الأولى هي الرئيسية)", "car.upload": "📷 إضافة صور", "car.addurl": "إضافة الرابط", "car.urlph": "أو الصق رابط صورة (https://…)",
      "car.featured": "عرضها في الصفحة الرئيسية", "car.active": "ظاهرة في الموقع", "car.state": "الحالة", "car.plate": "رقم التسجيل (داخلي)", "car.notes": "ملاحظات داخلية", "car.order": "ترتيب العرض",
      "car.save": "حفظ", "car.delete": "حذف", "car.confirmDel": "حذف هذه السيارة نهائياً؟ الطلبات القديمة تبقى في Google Sheet.", "car.saved": "تم حفظ السيارة.", "car.deleted": "تم حذف السيارة.",
      "car.upcoming": "حجز(ات) مؤكدة قادمة", "car.rentedNow": "مكتراة الآن", "car.hidden": "مخفية من الموقع", "uploading": "جاري رفع الصورة…", "uploaded": "تمت إضافة الصورة. لا تنس الحفظ.",
      "cancel": "إلغاء", "confirm": "تأكيد", "loading": "جاري التحميل…",
      "fuel.diesel": "ديزل", "fuel.essence": "بنزين", "fuel.hybride": "هجين", "fuel.electrique": "كهربائي", "trans.manuelle": "يدوية", "trans.auto": "أوتوماتيكية",
      "cat.eco": "اقتصادية", "cat.berline": "سيدان", "cat.suv": "SUV / 4x4", "cat.auto": "أوتوماتيكية", "cat.hybrid": "هجينة", "cat.family": "عائلية 7 مقاعد"
    }
  };
  // Messages WhatsApp au client, dans SA langue
  var WA = {
    fr: { wait: "Bonjour {nom}, ACHANAN CAR a bien reçu votre demande {ref} pour {voiture} du {depart} au {retour}. Nous vérifions la disponibilité et revenons vers vous rapidement.",
          ok: "Bonjour {nom}, ACHANAN CAR vous confirme votre réservation {ref} : {voiture}, du {depart} au {retour}. Livraison : {livraison}.{prix} Merci de votre confiance !",
          no: "Bonjour {nom}, désolé, {voiture} n'est pas disponible du {depart} au {retour} (demande {ref}). Souhaitez-vous que nous vous proposions une autre voiture ?",
          price: " Prix : {p}." },
    ar: { wait: "السلام عليكم {nom}، توصلت ACHANAN CAR بطلبك {ref} لسيارة {voiture} من {depart} إلى {retour}. نحن نتحقق من التوفر وسنعود إليك بسرعة.",
          ok: "السلام عليكم {nom}، تؤكد لك ACHANAN CAR حجزك {ref}: {voiture}، من {depart} إلى {retour}. مكان الاستلام: {livraison}.{prix} شكراً على ثقتك!",
          no: "السلام عليكم {nom}، نعتذر، سيارة {voiture} غير متوفرة من {depart} إلى {retour} (الطلب {ref}). هل تريد أن نقترح عليك سيارة أخرى؟",
          price: " الثمن: {p}." },
    en: { wait: "Hello {nom}, ACHANAN CAR has received your request {ref} for {voiture} from {depart} to {retour}. We are checking availability and will get back to you shortly.",
          ok: "Hello {nom}, ACHANAN CAR confirms your booking {ref}: {voiture}, from {depart} to {retour}. Delivery: {livraison}.{prix} Thank you for choosing us!",
          no: "Hello {nom}, sorry, the {voiture} is not available from {depart} to {retour} (request {ref}). Would you like us to suggest another car?",
          price: " Price: {p}." }
  };
  var STATUTS = ["nouvelle", "attente", "confirmee", "refusee", "annulee", "terminee"];
  var ETATS = ["disponible", "louee", "maintenance"];
  var CATS = ["eco", "berline", "suv", "auto", "hybrid", "family"];
  var FUELS = ["diesel", "essence", "hybride", "electrique"];

  var lang = "fr";
  try { lang = localStorage.getItem("ac_admin_lang") || "fr"; } catch (e) {}
  var S = { token: null, cars: [], bookings: [], filter: "all", q: "", tab: "dash", sheetUrl: "" };
  try { S.token = sessionStorage.getItem("ac_token"); } catch (e) {}

  function t(k) { return (TXT[lang] && TXT[lang][k]) || TXT.fr[k] || k; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function applyLang() {
    d.documentElement.lang = lang; d.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    d.querySelectorAll("[data-t]").forEach(function (el) { el.textContent = t(el.getAttribute("data-t")); });
    d.querySelectorAll("[data-t-ph]").forEach(function (el) { el.placeholder = t(el.getAttribute("data-t-ph")); });
    d.querySelectorAll("[data-t-title]").forEach(function (el) { el.title = t(el.getAttribute("data-t-title")); el.setAttribute("aria-label", el.title); });
    $("lang-toggle").textContent = lang === "ar" ? "FR" : "ع";
    try { localStorage.setItem("ac_admin_lang", lang); } catch (e) {}
    if (S.token && !$("app").hidden) renderAll();
  }

  /* ---------------- API ---------------- */
  function api(payload) {
    if (!CONFIG.apiUrl) return Promise.reject(Object.assign(new Error("noapi"), { code: "noapi" }));
    if (S.token && !payload.token) payload.token = S.token;
    return fetch(CONFIG.apiUrl, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) })
      .catch(function () { throw Object.assign(new Error("network"), { code: "network" }); })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (j.ok) return j;
        if (j.error === "auth") { logout(true); }
        var e = new Error(j.error || "error"); e.code = j.error; e.data = j; throw e;
      });
  }
  function errText(e) { var k = "err." + (e.code || ""); return TXT.fr[k] ? t(k) : t("err.generic") + (e.code || e.message); }
  var toastTimer;
  function toast(msg, isErr) {
    var el = $("toast"); el.textContent = msg; el.className = "toast show" + (isErr ? " err" : "");
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { el.className = "toast"; }, 3500);
  }

  /* ---------------- Connexion ---------------- */
  $("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var msg = $("login-msg"), btn = this.querySelector("button[type=submit]"); msg.textContent = "";
    if (!CONFIG.apiUrl) { msg.textContent = t("err.noapi"); return; }
    btn.disabled = true;
    api({ action: "login", password: $("pw").value }).then(function (j) {
      S.token = j.token; try { sessionStorage.setItem("ac_token", j.token); } catch (x) {}
      $("pw").value = ""; showApp();
    }).catch(function (er) { msg.textContent = errText(er); }).then(function () { btn.disabled = false; });
  });
  d.querySelectorAll(".lang-mini button").forEach(function (b) { b.addEventListener("click", function () { lang = b.getAttribute("data-lang"); applyLang(); }); });
  $("lang-toggle").addEventListener("click", function () { lang = lang === "ar" ? "fr" : "ar"; applyLang(); });
  $("logout").addEventListener("click", function () { api({ action: "logout" }).catch(function () {}); logout(false); });
  $("refresh").addEventListener("click", load);

  function logout(expired) {
    S.token = null; try { sessionStorage.removeItem("ac_token"); } catch (e) {}
    $("app").hidden = true; $("login").hidden = false; closeModal();
    $("login-msg").textContent = expired ? t("err.auth") : "";
  }
  function showApp() { $("login").hidden = true; $("app").hidden = false; load(); }

  function load() {
    d.body.classList.add("loading");
    return api({ action: "list" }).then(function (j) {
      S.cars = j.cars || []; S.bookings = j.bookings || []; S.sheetUrl = j.sheetUrl || "";
      $("sheet-link").href = S.sheetUrl || "#"; renderAll();
    }).catch(function (e) { if (e.code !== "auth") toast(errText(e), true); })
      .then(function () { d.body.classList.remove("loading"); });
  }

  /* ---------------- Onglets ---------------- */
  d.querySelectorAll(".ad-tabs button").forEach(function (b) { b.addEventListener("click", function () { showTab(b.getAttribute("data-tab")); }); });
  function showTab(name) {
    S.tab = name;
    d.querySelectorAll(".ad-tabs button").forEach(function (b) { var on = b.getAttribute("data-tab") === name; b.classList.toggle("on", on); b.setAttribute("aria-selected", on); });
    ["dash", "bookings", "cars"].forEach(function (n) { $("tab-" + n).hidden = n !== name; });
    try { history.replaceState(null, "", "#" + name); } catch (e) {}
  }

  /* ---------------- Dates ---------------- */
  function pd(s) { var m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(s || ""); return m ? new Date(+m[1], m[2] - 1, +m[3], +m[4], +m[5]) : null; }
  function fd(s) { var m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}:\d{2})/.exec(s || ""); return m ? m[3] + "/" + m[2] + "/" + m[1] + " " + m[4] : esc(s); }
  function dayKey(dt) { return dt.getFullYear() * 10000 + (dt.getMonth() + 1) * 100 + dt.getDate(); }
  function days(b) { var a = pd(b.depart), z = pd(b.retour); return a && z ? Math.max(1, Math.ceil((z - a) / 864e5)) : "–"; }
  function carById(id) { return S.cars.filter(function (c) { return c.id === id; })[0]; }
  function rentedNow(carId) {
    var now = new Date();
    return S.bookings.some(function (b) { return b.voiture_id === carId && b.statut === "confirmee" && pd(b.depart) <= now && pd(b.retour) > now; });
  }

  /* ---------------- Rendu ---------------- */
  function renderAll() { renderDash(); renderBookings(); renderCars(); var n = count("nouvelle"); $("new-count").hidden = !n; $("new-count").textContent = n; }
  function count(st) { return S.bookings.filter(function (b) { return b.statut === st; }).length; }
  function badge(st) { return '<span class="badge s-' + esc(st) + '">' + esc(t("st." + st)) + "</span>"; }

  function renderDash() {
    var now = new Date();
    var upcoming = S.bookings.filter(function (b) { return b.statut === "confirmee" && pd(b.depart) > now; }).length;
    var current = S.bookings.filter(function (b) { return b.statut === "confirmee" && pd(b.depart) <= now && pd(b.retour) > now; }).length;
    var active = S.cars.filter(function (c) { return c.actif; });
    var avail = active.filter(function (c) { return c.etat === "disponible" && !rentedNow(c.id); }).length;
    var maint = S.cars.filter(function (c) { return c.etat === "maintenance"; }).length;
    var K = [["hot", count("nouvelle"), "kpi.new", "bookings:nouvelle"], ["gold", count("attente"), "kpi.wait", "bookings:attente"],
             ["ok", upcoming, "kpi.upcoming", "bookings:confirmee"], ["", current, "kpi.now", "bookings:confirmee"],
             ["ok", avail, "kpi.avail", "cars"], ["gold", maint, "kpi.maint", "cars"]];
    $("kpis").innerHTML = K.map(function (k) { return '<div class="kpi ' + k[0] + '" role="button" tabindex="0" data-go="' + k[3] + '"><b>' + k[1] + "</b><span>" + esc(t(k[2])) + "</span></div>"; }).join("");

    var today = dayKey(now), tom = dayKey(new Date(now.getTime() + 864e5)), moves = [];
    S.bookings.forEach(function (b) {
      if (b.statut !== "confirmee") return;
      var a = pd(b.depart), z = pd(b.retour);
      if (a && (dayKey(a) === today || dayKey(a) === tom)) moves.push({ when: a, type: "out", b: b, day: dayKey(a) === today ? "today" : "tomorrow" });
      if (z && (dayKey(z) === today || dayKey(z) === tom)) moves.push({ when: z, type: "in", b: b, day: dayKey(z) === today ? "today" : "tomorrow" });
    });
    moves.sort(function (x, y) { return x.when - y.when; });
    $("moves").innerHTML = moves.length ? moves.map(function (m) {
      var hh = ("0" + m.when.getHours()).slice(-2) + ":" + ("0" + m.when.getMinutes()).slice(-2);
      return '<div class="move" data-ref="' + esc(m.b.ref) + '" role="button" tabindex="0"><span class="tag ' + m.type + '">' + t("mv." + m.type) + "</span><div><b>" + esc(t(m.day)) + " " + hh + "</b> · " +
        esc(m.b.voiture) + "<br><span class='muted'>" + esc(m.b.nom) + " · " + esc(m.type === "out" ? m.b.livraison : m.b.restitution) + "</span></div></div>";
    }).join("") : '<p class="empty-s">' + t("dash.none") + "</p>";

    var todo = S.bookings.filter(function (b) { return b.statut === "nouvelle" || b.statut === "attente"; }).slice(0, 6);
    $("latest").innerHTML = todo.length ? todo.map(function (b) {
      return '<div class="move" data-ref="' + esc(b.ref) + '" role="button" tabindex="0">' + badge(b.statut) + "<div><b>" + esc(b.nom) + "</b> · " + esc(b.voiture) +
        "<br><span class='muted'>" + fd(b.depart) + " → " + fd(b.retour) + "</span></div></div>";
    }).join("") : '<p class="empty-s">' + t("dash.nolatest") + "</p>";
  }

  function renderBookings() {
    $("status-filter").innerHTML = ["all"].concat(STATUTS).map(function (s) {
      var n = s === "all" ? S.bookings.length : count(s);
      return '<button type="button" class="chip' + (S.filter === s ? " on" : "") + '" data-filter="' + s + '">' + esc(t("st." + s)) + "<small>" + n + "</small></button>";
    }).join("");
    var q = S.q.toLowerCase();
    var list = S.bookings.filter(function (b) {
      if (S.filter !== "all" && b.statut !== S.filter) return false;
      if (!q) return true;
      return [b.ref, b.nom, b.telephone, b.email, b.voiture].join(" ").toLowerCase().indexOf(q) > -1;
    });
    $("booking-list").innerHTML = list.length ? list.map(function (b) {
      return '<article class="bk s-' + esc(b.statut) + '-b" data-ref="' + esc(b.ref) + '" role="button" tabindex="0">' +
        "<div><h3>" + esc(b.nom) + '</h3><span class="ref" dir="ltr">' + esc(b.ref) + '</span><div class="meta" dir="ltr">' + esc(b.telephone) + "</div></div>" +
        '<div class="meta"><b>' + esc(b.voiture) + "</b><br>" + fd(b.depart) + " → " + fd(b.retour) + " · " + days(b) + " " + esc(t("bk.days")) + "</div>" +
        '<div class="meta">' + esc(b.livraison) + (b.prix ? "<br><b>" + esc(b.prix) + "</b>" : "") + "</div>" +
        '<div class="st">' + badge(b.statut) + "</div></article>";
    }).join("") : '<p class="empty-s">' + t("bk.none") + "</p>";
  }

  function carImg(c, cls) {
    var src = (c.photos && c.photos[0]) || "assets/img/cars/" + c.id + ".svg";
    var fb = "assets/img/cars/cat-" + ((c.categories && c.categories[0]) || "eco") + ".svg";
    var illu = !(c.photos && c.photos[0]);
    return '<img class="' + (illu ? "illu " : "") + (cls || "") + '" src="' + esc(src) + '" alt="" loading="lazy" onerror="this.onerror=null;this.className=\'illu\';this.src=\'' + fb + '\'">';
  }
  function renderCars() {
    var now = new Date();
    $("car-list").innerHTML = S.cars.length ? S.cars.map(function (c) {
      var up = S.bookings.filter(function (b) { return b.voiture_id === c.id && b.statut === "confirmee" && pd(b.retour) > now; }).length;
      var rn = rentedNow(c.id);
      return '<article class="ac' + (c.actif ? "" : " off") + '"><div class="ac-img">' + carImg(c) + '</div><div class="ac-b"><h3>' + esc(c.marque + " " + c.modele) + " <span class='muted'>" + esc(c.annee) + "</span></h3>" +
        '<div class="row"><span class="badge e-' + esc(c.etat) + '">' + esc(t("et." + c.etat)) + "</span>" + (rn ? '<span class="badge e-louee">' + esc(t("car.rentedNow")) + "</span>" : "") +
        (c.actif ? "" : '<span class="badge s-annulee">' + esc(t("car.hidden")) + "</span>") + (c.vedette ? " ★" : "") + "</div>" +
        '<div class="row">' + esc(t("fuel." + c.carburant)) + " · " + esc(t("trans." + c.boite)) + " · " + esc(c.places) + " 👤" + (c.immatriculation ? ' · <span dir="ltr">' + esc(c.immatriculation) + "</span>" : "") + "</div>" +
        '<div class="row">' + up + " " + esc(t("car.upcoming")) + "</div></div>" +
        '<div class="ac-f"><button type="button" class="btn btn-dark btn-sm" data-edit="' + esc(c.id) + '">' + esc(t("cars.edit")) + "</button>" +
        '<button type="button" class="btn btn-outline btn-sm" data-cycle="' + esc(c.id) + '">' + esc(t("car.state")) + " ↻</button></div></article>";
    }).join("") : '<p class="empty-s">' + t("cars.none") + "</p>";
  }

  /* ---------------- Clics ---------------- */
  d.addEventListener("click", function (e) {
    var el;
    if ((el = e.target.closest("[data-go]"))) { var g = el.getAttribute("data-go").split(":"); if (g[1]) { S.filter = g[1]; renderBookings(); } showTab(g[0]); return; }
    if ((el = e.target.closest("#status-filter .chip"))) { S.filter = el.getAttribute("data-filter"); renderBookings(); return; }
    if ((el = e.target.closest("[data-ref]"))) { openBooking(el.getAttribute("data-ref")); return; }
    if ((el = e.target.closest("[data-edit]"))) { openCar(el.getAttribute("data-edit")); return; }
    if ((el = e.target.closest("[data-cycle]"))) { cycleState(el.getAttribute("data-cycle"), el); return; }
    if (e.target.id === "add-car") { openCar(null); return; }
    if (e.target.classList.contains("modal-x") || e.target.id === "modal") closeModal();
  });
  d.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
    if ((e.key === "Enter" || e.key === " ") && e.target.matches("[role=button][tabindex]")) { e.preventDefault(); e.target.click(); }
  });
  $("search").addEventListener("input", function () { S.q = this.value; renderBookings(); });

  function openModal(html) { $("modal-body").innerHTML = html; $("modal").hidden = false; d.body.style.overflow = "hidden"; }
  function closeModal() { $("modal").hidden = true; d.body.style.overflow = ""; }

  /* ---------------- Fiche demande ---------------- */
  function waPhone(p) {
    var n = String(p || "").replace(/[^\d+]/g, "");
    if (n.indexOf("+") === 0) n = n.slice(1); else if (n.indexOf("00") === 0) n = n.slice(2); else if (n.indexOf("0") === 0 && n.length === 10) n = "212" + n.slice(1);
    return n.replace(/\D/g, "");
  }
  function waMessage(b) {
    var L = WA[b.langue] || WA.fr, key = b.statut === "confirmee" ? "ok" : (b.statut === "refusee" ? "no" : "wait");
    var vars = { nom: b.nom, ref: b.ref, voiture: b.voiture, depart: fd(b.depart), retour: fd(b.retour), livraison: b.livraison, prix: b.prix ? L.price.replace("{p}", b.prix) : "" };
    return L[key].replace(/\{(\w+)\}/g, function (_, k) { return vars[k] == null ? "" : vars[k]; });
  }
  function openBooking(ref) {
    var b = S.bookings.filter(function (x) { return x.ref === ref; })[0]; if (!b) return;
    var carOpts = '<option value="">' + esc(t("nopref")) + "</option>" + S.cars.map(function (c) {
      return '<option value="' + esc(c.id) + '"' + (c.id === b.voiture_id ? " selected" : "") + ">" + esc(c.marque + " " + c.modele + (c.annee ? " (" + c.annee + ")" : "")) + (c.actif ? "" : " — " + t("car.hidden")) + "</option>";
    }).join("");
    var rows = [["bk.client", esc(b.nom)], ["bk.phone", '<span dir="ltr">' + esc(b.telephone) + "</span>"], ["bk.email", esc(b.email || "–")],
      ["bk.car", esc(b.voiture)], ["bk.start", fd(b.depart)], ["bk.end", fd(b.retour) + " (" + days(b) + " " + esc(t("bk.days")) + ")"],
      ["bk.pickup", esc(b.livraison)], ["bk.dropoff", esc(b.restitution)], ["bk.address", esc(b.adresse || "–")], ["bk.message", esc(b.message || "–")],
      ["bk.lang", esc((b.langue || "fr").toUpperCase())], ["bk.created", fd(b.cree_le)]];
    openModal('<h2><span dir="ltr">' + esc(b.ref) + "</span> " + badge(b.statut) + "</h2>" +
      '<dl class="dl">' + rows.map(function (r) { return "<dt>" + esc(t(r[0])) + "</dt><dd>" + r[1] + "</dd>"; }).join("") + "</dl>" +
      '<form id="bk-form" class="fgrid">' +
      '<div><label for="bk-st">' + esc(t("bk.status")) + '</label><select id="bk-st">' + STATUTS.map(function (s) { return '<option value="' + s + '"' + (s === b.statut ? " selected" : "") + ">" + esc(t("st." + s)) + "</option>"; }).join("") + "</select></div>" +
      '<div><label for="bk-car">' + esc(t("bk.assign")) + '</label><select id="bk-car">' + carOpts + "</select></div>" +
      '<div><label for="bk-price">' + esc(t("bk.price")) + '</label><input id="bk-price" value="' + esc(b.prix) + '" placeholder="' + esc(t("bk.price.ph")) + '"></div>' +
      '<div class="full"><label for="bk-note">' + esc(t("bk.note")) + '</label><textarea id="bk-note" style="min-height:70px">' + esc(b.note_interne) + "</textarea></div>" +
      '<div class="full" id="bk-warn"></div>' +
      '<div class="full mrow"><button type="submit" class="btn btn-gold">' + esc(t("bk.save")) + "</button>" +
      '<a class="btn btn-wa" id="bk-wa" target="_blank" rel="noopener" href="#">' + esc(t("bk.wa")) + "</a>" +
      '<a class="btn btn-outline" href="tel:' + esc(String(b.telephone).replace(/[^\d+]/g, "")) + '">' + esc(t("bk.call")) + "</a></div>" +
      '<p class="full muted small" style="margin:0">' + esc(t("bk.waHint")) + "</p></form>");
    var updWa = function () {
      var preview = Object.assign({}, b, { statut: $("bk-st").value, prix: $("bk-price").value.trim() });
      var c = carById($("bk-car").value); preview.voiture = c ? c.marque + " " + c.modele : b.voiture;
      $("bk-wa").href = "https://wa.me/" + waPhone(b.telephone) + "?text=" + encodeURIComponent(waMessage(preview));
    };
    ["bk-st", "bk-price", "bk-car"].forEach(function (id) { $(id).addEventListener("input", updWa); $(id).addEventListener("change", updWa); });
    updWa();
    $("bk-form").addEventListener("submit", function (e) { e.preventDefault(); saveBooking(b, false); });
  }
  function saveBooking(b, force) {
    var btn = $("bk-form").querySelector("button[type=submit]"); btn.disabled = true;
    api({ action: "updateBooking", ref: b.ref, statut: $("bk-st").value, voiture_id: $("bk-car").value, prix: $("bk-price").value.trim(), note_interne: $("bk-note").value.trim(), force: !!force })
      .then(function (j) {
        var i = S.bookings.indexOf(b); if (i > -1) S.bookings[i] = j.booking;
        renderAll(); toast(t("bk.saved")); openBooking(b.ref);
      }).catch(function (e) {
        if (e.code === "conflict") {
          $("bk-warn").innerHTML = '<div class="warn">' + esc(t("bk.conflict")) + "<ul>" + e.data.conflicts.map(function (c) {
            return '<li><span dir="ltr">' + esc(c.ref) + "</span> — " + esc(c.nom) + " : " + fd(c.depart) + " → " + fd(c.retour) + "</li>";
          }).join("") + '</ul><button type="button" class="btn btn-danger btn-sm" id="bk-force" style="margin-top:.6rem">' + esc(t("bk.force")) + "</button></div>";
          $("bk-force").addEventListener("click", function () { saveBooking(b, true); });
        } else toast(errText(e), true);
      }).then(function () { if ($("bk-form")) { var bt = $("bk-form").querySelector("button[type=submit]"); if (bt) bt.disabled = false; } });
  }

  /* ---------------- Fiche voiture ---------------- */
  var editPhotos = [];
  function openCar(id) {
    var c = id ? carById(id) : { id: "", marque: "", modele: "", annee: String(new Date().getFullYear()), carburant: "diesel", boite: "manuelle", places: "5", categories: [], photos: [], vedette: false, actif: true, etat: "disponible", immatriculation: "", notes: "", ordre: "" };
    if (!c) return;
    editPhotos = (c.photos || []).slice();
    var opt = function (arr, cur, pre) { return arr.map(function (v) { return '<option value="' + v + '"' + (v === cur ? " selected" : "") + ">" + esc(t(pre + v)) + "</option>"; }).join(""); };
    openModal("<h2>" + esc(t(id ? "cars.edit" : "cars.new")) + (id ? ' <span class="muted small" dir="ltr">' + esc(c.id) + "</span>" : "") + "</h2>" +
      '<form id="car-form" class="fgrid">' +
      '<div><label for="c-brand">' + esc(t("car.brand")) + ' *</label><input id="c-brand" required value="' + esc(c.marque) + '" placeholder="Dacia"></div>' +
      '<div><label for="c-model">' + esc(t("car.model")) + ' *</label><input id="c-model" required value="' + esc(c.modele) + '" placeholder="Logan"></div>' +
      '<div><label for="c-year">' + esc(t("car.year")) + '</label><input id="c-year" type="number" min="1990" max="2100" value="' + esc(c.annee) + '"></div>' +
      '<div><label for="c-seats">' + esc(t("car.seats")) + '</label><input id="c-seats" type="number" min="2" max="9" value="' + esc(c.places) + '"></div>' +
      '<div><label for="c-fuel">' + esc(t("car.fuel")) + '</label><select id="c-fuel">' + opt(FUELS, c.carburant, "fuel.") + "</select></div>" +
      '<div><label for="c-trans">' + esc(t("car.trans")) + '</label><select id="c-trans">' + opt(["manuelle", "auto"], c.boite, "trans.") + "</select></div>" +
      '<div class="full"><label>' + esc(t("car.cats")) + ' *</label><div class="cat-checks">' + CATS.map(function (k) {
        return '<label><input type="checkbox" name="cat" value="' + k + '"' + ((c.categories || []).indexOf(k) > -1 ? " checked" : "") + "> " + esc(t("cat." + k)) + "</label>";
      }).join("") + "</div></div>" +
      '<div class="full"><label>' + esc(t("car.photos")) + '</label><div class="photos" id="c-photos"></div><div class="ph-add">' +
      '<span class="btn btn-dark btn-sm file-btn">' + esc(t("car.upload")) + '<input type="file" id="c-file" accept="image/*" multiple></span>' +
      '<input type="url" id="c-url" placeholder="' + esc(t("car.urlph")) + '"><button type="button" class="btn btn-outline btn-sm" id="c-url-add">' + esc(t("car.addurl")) + "</button></div></div>" +
      '<div><label for="c-state">' + esc(t("car.state")) + '</label><select id="c-state">' + opt(ETATS, c.etat, "et.") + "</select></div>" +
      '<div><label for="c-plate">' + esc(t("car.plate")) + '</label><input id="c-plate" dir="ltr" value="' + esc(c.immatriculation) + '"></div>' +
      '<div><label class="switch"><input type="checkbox" id="c-active"' + (c.actif ? " checked" : "") + "> " + esc(t("car.active")) + "</label></div>" +
      '<div><label class="switch"><input type="checkbox" id="c-feat"' + (c.vedette ? " checked" : "") + "> " + esc(t("car.featured")) + "</label></div>" +
      '<div><label for="c-order">' + esc(t("car.order")) + '</label><input id="c-order" type="number" min="1" value="' + esc(c.ordre) + '"></div>' +
      '<div class="full"><label for="c-notes">' + esc(t("car.notes")) + '</label><textarea id="c-notes" style="min-height:70px">' + esc(c.notes) + "</textarea></div>" +
      '<div class="full" id="c-msg"></div>' +
      '<div class="full mrow"><button type="submit" class="btn btn-gold">' + esc(t("car.save")) + "</button>" +
      (id ? '<button type="button" class="btn btn-danger" id="c-del">' + esc(t("car.delete")) + "</button>" : "") + "</div></form>");
    renderPhotos();
    $("c-file").addEventListener("change", function () { uploadFiles(Array.prototype.slice.call(this.files), c); this.value = ""; });
    $("c-url-add").addEventListener("click", function () {
      var u = $("c-url").value.trim(); if (!/^https:\/\//.test(u)) { $("c-url").classList.add("field-error"); return; }
      editPhotos.push(u); $("c-url").value = ""; renderPhotos();
    });
    if (id) $("c-del").addEventListener("click", function () {
      $("c-msg").innerHTML = '<div class="warn">' + esc(t("car.confirmDel")) + '<div class="mrow"><button type="button" class="btn btn-danger btn-sm" id="c-del-yes">' + esc(t("confirm")) +
        '</button><button type="button" class="btn btn-outline btn-sm" id="c-del-no">' + esc(t("cancel")) + "</button></div></div>";
      $("c-del-no").addEventListener("click", function () { $("c-msg").innerHTML = ""; });
      $("c-del-yes").addEventListener("click", function () {
        this.disabled = true;
        api({ action: "deleteCar", id: id }).then(function () { closeModal(); toast(t("car.deleted")); load(); }).catch(function (e) { toast(errText(e), true); });
      });
    });
    $("car-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var cats = Array.prototype.map.call(d.querySelectorAll("#car-form input[name=cat]:checked"), function (x) { return x.value; });
      if (!$("c-brand").value.trim() || !$("c-model").value.trim()) { toast(t("err.missing_fields"), true); return; }
      if (!cats.length) { toast(t("err.missing_category"), true); return; }
      var btn = this.querySelector("button[type=submit]"); btn.disabled = true;
      api({ action: "saveCar", car: { id: c.id, marque: $("c-brand").value.trim(), modele: $("c-model").value.trim(), annee: $("c-year").value, places: $("c-seats").value,
        carburant: $("c-fuel").value, boite: $("c-trans").value, categories: cats, photos: editPhotos, etat: $("c-state").value, immatriculation: $("c-plate").value.trim(),
        actif: $("c-active").checked, vedette: $("c-feat").checked, ordre: $("c-order").value, notes: $("c-notes").value.trim() } })
        .then(function () { closeModal(); toast(t("car.saved")); load(); })
        .catch(function (er) { toast(errText(er), true); btn.disabled = false; });
    });
  }
  function renderPhotos() {
    $("c-photos").innerHTML = editPhotos.map(function (u, i) {
      return '<div class="ph"><img src="' + esc(u) + '" alt=""><button type="button" data-rm="' + i + '" aria-label="×">×</button></div>';
    }).join("");
    $("c-photos").querySelectorAll("[data-rm]").forEach(function (b) { b.addEventListener("click", function () { editPhotos.splice(+b.getAttribute("data-rm"), 1); renderPhotos(); }); });
  }
  function compress(file) {
    return new Promise(function (res, rej) {
      var img = new Image(), url = URL.createObjectURL(file);
      img.onload = function () {
        var max = 1400, w = img.naturalWidth, h = img.naturalHeight, r = Math.min(1, max / Math.max(w, h));
        var cv = d.createElement("canvas"); cv.width = Math.round(w * r); cv.height = Math.round(h * r);
        cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height); URL.revokeObjectURL(url);
        res(cv.toDataURL("image/jpeg", 0.82).split(",")[1]);
      };
      img.onerror = function () { URL.revokeObjectURL(url); rej(new Error("bad_image")); };
      img.src = url;
    });
  }
  function uploadFiles(files, c) {
    var chain = Promise.resolve();
    files.forEach(function (f) {
      chain = chain.then(function () {
        toast(t("uploading"));
        return compress(f).then(function (data) {
          return api({ action: "uploadPhoto", mime: "image/jpeg", data: data, name: ($("c-brand").value + "-" + $("c-model").value) || "photo" });
        }).then(function (j) { editPhotos.push(j.url); renderPhotos(); toast(t("uploaded")); })
          .catch(function (e) { toast(errText(e), true); });
      });
    });
  }
  function cycleState(id, btn) {
    var c = carById(id); if (!c) return;
    var next = ETATS[(ETATS.indexOf(c.etat) + 1) % ETATS.length];
    btn.disabled = true;
    var payload = Object.assign({}, c, { etat: next });
    api({ action: "saveCar", car: payload }).then(function () { c.etat = next; renderAll(); toast(t("car.state") + " : " + t("et." + next)); })
      .catch(function (e) { toast(errText(e), true); btn.disabled = false; });
  }

  /* ---------------- Démarrage ---------------- */
  applyLang();
  var h = location.hash.replace("#", "");
  if (["dash", "bookings", "cars"].indexOf(h) > -1) showTab(h);
  if (!CONFIG.apiUrl) $("login-msg").textContent = t("err.noapi");
  if (S.token) showApp();
})();
