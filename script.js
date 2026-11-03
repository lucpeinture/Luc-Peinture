// Agrandir une photo au clic (galerie et avant/après)
const dlg = document.querySelector("#zoom"), big = dlg.querySelector("img");
const ouvrir = ev => { const i = ev.target; if (i.tagName === "IMG" && i.closest(".galerie,.duo")) { big.src = i.src; big.alt = i.alt; dlg.showModal(); } };
document.addEventListener("click", ouvrir);
document.addEventListener("keydown", ev => { if (ev.key === "Enter") ouvrir(ev); });
dlg.addEventListener("click", () => dlg.close());
