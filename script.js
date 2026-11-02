const $ = s => document.querySelector(s);
const e = t => String(t ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const S = SITE;
const PH = "images/placeholder.svg";

$("#baseline").textContent = S.baseline;

$("#entreprise").innerHTML = `<h2>${e(S.entreprise.titre)}</h2>${S.entreprise.texte.map(t => `<p>${e(t)}</p>`).join("")}`;

$("#services").innerHTML = `<ul class="services">${S.services.map(s => `
  <li><img src="${e(s.photo)}" alt="${e(s.titre)}" loading="lazy">
  <div class="bandeau"><span class="ico" aria-hidden="true">${e(s.icone)}</span><div><h3>${e(s.titre)}</h3><p>${e(s.texte)}</p></div></div></li>`).join("")}</ul>`;

const R = S.realisations;
const photos = Array.from({ length: R.nombre }, (_, i) => `${R.dossier}${String(i + 1).padStart(2, "0")}.${R.extension}`);
$("#realisations").innerHTML = `<h2>${e(R.titre)}</h2><div class="galerie">${photos.map((p, i) => `<img src="${e(p)}" alt="Réalisation ${i + 1}" loading="lazy" tabindex="0">`).join("")}</div>`;

$("#avant-apres").innerHTML = `<h2>${e(S.avantApres.titre)}</h2><div class="duo">${S.avantApres.photos.map((p, i) => `<img src="${e(p)}" alt="Avant / après ${i + 1}" loading="lazy" tabindex="0">`).join("")}</div>`;

const C = S.contact;
$("#contact").innerHTML = `<h2>${e(C.titre)}</h2><p>${e(C.texte)}</p><p class="coord"><a href="tel:${e(C.telephone.replace(/\s/g, ""))}">${e(C.telephone)}</a> · <a href="mailto:${e(C.email)}">${e(C.email)}</a></p><p>${e(C.zone)}</p>`;
$("#pied").innerHTML = `<p>© ${new Date().getFullYear()} ${e(S.mentions)}</p>`;

// Photo introuvable : image grise de remplacement
document.addEventListener("error", ev => {
  const i = ev.target;
  if (i.tagName === "IMG" && !i.src.endsWith(PH)) { if (i.classList.contains("logo") || i.classList.contains("hero-img")) i.style.visibility = "hidden"; else i.src = PH; }
}, true);

// Agrandir une photo au clic
const dlg = $("#zoom"), big = dlg.querySelector("img");
const ouvrir = ev => { const i = ev.target; if (i.tagName === "IMG" && i.closest(".galerie,.duo")) { big.src = i.src; big.alt = i.alt; dlg.showModal(); } };
document.addEventListener("click", ouvrir);
document.addEventListener("keydown", ev => { if (ev.key === "Enter") ouvrir(ev); });
dlg.addEventListener("click", () => dlg.close());
