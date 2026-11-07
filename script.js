// Agrandir une photo au clic (galerie et avant/après)
const dlg = document.querySelector("#zoom"), big = dlg.querySelector("img"), leg = dlg.querySelector(".legende");
const ouvrir = ev => { const i = ev.target; if (i.tagName === "IMG" && i.closest(".galerie,.duo")) { big.src = i.src; big.alt = i.alt; const c = i.closest("figure"); const t = c && c.querySelector("figcaption"); leg.textContent = t ? t.textContent : ""; dlg.showModal(); } };
document.addEventListener("click", ouvrir);
document.addEventListener("keydown", ev => { if (ev.key === "Enter") ouvrir(ev); });
dlg.addEventListener("click", () => dlg.close());

// Formulaire de demande de devis (envoi via Formspree)
const devis = document.querySelector("#devis");
if (devis) {
  document.querySelectorAll("[data-devis]").forEach(b => b.addEventListener("click", () => devis.showModal()));
  devis.addEventListener("click", ev => { if (ev.target === devis || ev.target.matches("[data-fermer]")) devis.close(); });
  const f = devis.querySelector("form"), msg = devis.querySelector(".retour");
  f.addEventListener("submit", async ev => {
    ev.preventDefault();
    const b = f.querySelector("button[type=submit]");
    b.disabled = true; msg.textContent = "Envoi en cours…";
    try {
      const r = await fetch(f.action, { method: "POST", body: new FormData(f), headers: { Accept: "application/json" } });
      if (!r.ok) throw new Error(r.status);
      f.reset(); msg.textContent = "Merci ! Votre demande a bien été envoyée, nous vous répondrons rapidement.";
    } catch (err) { msg.textContent = "L'envoi a échoué. Vous pouvez nous appeler ou nous écrire directement."; }
    b.disabled = false;
  });
}
