#!/usr/bin/env python3
"""Génère index.html, sitemap.xml et robots.txt à partir de contenu.js.
Utilisation : python3 build.py   (dans le dossier du site)"""
import datetime, html, json, os, re


def e(t):
    return html.escape(str(t), quote=True)


def lire_contenu(chemin="contenu.js"):
    src = open(chemin, encoding="utf-8").read()
    src = src[src.find("const SITE"):] if "const SITE" in src else src
    src = src[src.index("{"):src.rindex("}") + 1]
    # 1. retirer les commentaires, sans toucher aux textes entre guillemets
    out, i, n, dans = [], 0, len(src), False
    while i < n:
        c = src[i]
        if dans:
            out.append(c)
            if c == "\\":
                out.append(src[i + 1]); i += 1
            elif c == '"':
                dans = False
        elif c == '"':
            dans = True; out.append(c)
        elif src.startswith("//", i):
            while i < n and src[i] != "\n":
                i += 1
            continue
        elif src.startswith("/*", i):
            i = src.index("*/", i) + 2
            continue
        else:
            out.append(c)
        i += 1
    # 2. clés sans guillemets et virgules finales -> JSON valide
    morceaux = re.split(r'("(?:\\.|[^"\\])*")', "".join(out))
    for k in range(0, len(morceaux), 2):
        p = re.sub(r"([{,]\s*)([A-Za-z_]\w*)(\s*:)", r'\1"\2"\3', morceaux[k])
        morceaux[k] = re.sub(r",(\s*[}\]])", r"\1", p)
    try:
        return json.loads("".join(morceaux))
    except json.JSONDecodeError as err:
        raise SystemExit(f"Erreur dans contenu.js (vers la ligne {err.lineno}) : {err.msg}\n"
                         "Vérifiez les guillemets \" \" et les virgules.")


def tel_intl(t):
    d = re.sub(r"\D", "", t)
    return "+33" + d[1:] if d.startswith("0") else "+" + d


def liste_photos(dossier):
    ext = (".jpg", ".jpeg", ".png", ".webp", ".avif")
    return sorted(f for f in os.listdir(dossier) if f.lower().endswith(ext)) if os.path.isdir(dossier) else []


def img(src, alt, extra=""):
    return (f'<img src="{e(src)}" alt="{e(alt)}" loading="lazy" {extra}'
            'onerror="this.onerror=null;this.src=\'images/placeholder.svg\'">')


def construire(S):
    seo, C, E, R, AA = S.get("seo", {}), S["contact"], S["entreprise"], S["realisations"], S["avantApres"]
    nom = seo.get("nom", "Luc Sanchez Peinture")
    ville = seo.get("ville", "Toulouse")
    villes = seo.get("villes", [])
    url = seo["url"].rstrip("/") + "/" if seo.get("url") else ""
    titre = seo.get("titre", f"{nom} – Peintre en bâtiment à {ville}")
    desc = seo.get("description", S["baseline"])

    ld = {"@context": "https://schema.org", "@type": "HousePainter", "name": nom,
          "alternateName": seo.get("nomCommercial"), "url": url, "telephone": tel_intl(C["telephone"]),
          "email": C["email"], "description": desc,
          "image": url + "images/hero.jpg" if url else "", "logo": url + "images/logo.png" if url else "",
          "address": {"@type": "PostalAddress", "addressLocality": ville,
                      "addressRegion": seo.get("region", "Occitanie"), "addressCountry": "FR"},
          "areaServed": [{"@type": "City", "name": v} for v in villes],
          "knowsAbout": seo.get("metiers", []),
          "makesOffer": [{"@type": "Offer", "itemOffered": {"@type": "Service", "name": s["titre"],
                          "description": s["texte"]}} for s in S["services"]]}
    ld = {k: v for k, v in ld.items() if v}

    services = "".join(
        f'<li>{img(s["photo"], s["titre"])}<div class="bandeau"><span class="ico" aria-hidden="true">{e(s["icone"])}</span>'
        f'<div><h3>{e(s["titre"])}</h3><p>{e(s["texte"])}</p></div></div></li>' for s in S["services"])

    fichiers = liste_photos(R["dossier"]) or [f'{i:02d}.{R.get("extension", "jpg")}' for i in range(1, R.get("nombre", 0) + 1)]
    alts = R.get("alts", {})
    galerie = "".join(img(R["dossier"] + f, alts.get(f, f"Réalisation {i} – peinture et rénovation à {ville}"), 'tabindex="0" ')
                      for i, f in enumerate(fichiers, 1))
    avant_apres = "".join(img(p, f"Avant / après {i} – {nom}", 'tabindex="0" ') for i, p in enumerate(AA["photos"], 1))

    accroche = f'<p class="accroche">{e(E["accroche"])}</p>' if E.get("accroche") else ""
    zones = (f'<p class="zones"><strong>Zones d\'intervention :</strong> {e(", ".join(villes))}.</p>' if villes else "")
    fs = str(C.get("formspree", "")).strip()
    bouton = ('<p class="cta"><button class="btn" type="button" data-devis>Demande de devis</button></p>' if fs
              else '<p class="cta"><a class="btn" href="#contact">Demande de devis</a></p>')
    travaux = "".join(f'<option>{e(s["titre"])}</option>' for s in S["services"])
    formulaire = (f'''<dialog id="devis" aria-labelledby="devis-titre"><div class="cadre">
  <h2 id="devis-titre">Demande de devis</h2>
  <form action="https://formspree.io/f/{e(fs)}" method="POST">
    <label>Nom <input name="nom" required autocomplete="name"></label>
    <label>Téléphone <input name="telephone" type="tel" autocomplete="tel"></label>
    <label>E-mail <input name="email" type="email" required autocomplete="email"></label>
    <label>Commune du chantier <input name="commune"></label>
    <label>Type de travaux <select name="travaux"><option value="">Choisir…</option>{travaux}<option>Autre</option></select></label>
    <label>Votre projet <textarea name="message" rows="4" required></textarea></label>
    <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" style="display:none">
    <input type="hidden" name="_subject" value="Demande de devis – {e(nom)}">
    <p class="rgpd">Ces informations servent uniquement à répondre à votre demande.</p>
    <p class="retour" role="status" aria-live="polite"></p>
    <div class="actions"><button class="btn" type="submit">Envoyer ma demande</button><button class="btn sec" type="button" data-fermer>Fermer</button></div>
  </form></div></dialog>''' if fs else "")
    tel = e(C["telephone"].replace(" ", ""))
    meta_url = (f'<link rel="canonical" href="{e(url)}">\n<meta property="og:url" content="{e(url)}">\n'
                f'<meta property="og:image" content="{e(url)}images/hero.jpg">\n' if url else "")

    page = f"""<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{e(titre)}</title>
<meta name="description" content="{e(desc)}">
{meta_url}<meta property="og:title" content="{e(titre)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="fr_FR">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#1c3144">
<link rel="icon" href="images/logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Kaushan+Script&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
<link rel="stylesheet" href="seo.css">
<script type="application/ld+json">
{json.dumps(ld, ensure_ascii=False, indent=1)}
</script>
</head>
<body>
<header class="hero" id="accueil">
  <img class="hero-img" src="images/hero.jpg" alt="Salon repeint par {e(nom)}" fetchpriority="high" onerror="this.style.visibility='hidden'">
  <img class="logo" src="images/logo.png" alt="{e(nom)} – intérieur et extérieur" onerror="this.style.visibility='hidden'">
  <h1 class="sr-only">{e(nom)} – peintre en bâtiment à {e(ville)}</h1>
  <p class="baseline">{e(S["baseline"])}</p>
</header>
<main>
  <section id="entreprise" class="centre"><h2>{e(E["titre"])}</h2>{accroche}{"".join(f"<p>{e(t)}</p>" for t in E["texte"])}{bouton}</section>
  <section id="services"><ul class="services">{services}</ul></section>
  <section id="realisations"><h2>{e(R["titre"])}</h2><div class="galerie">{galerie}</div></section>
  <section id="avant-apres"><h2>{e(AA["titre"])}</h2><div class="duo">{avant_apres}</div></section>
  <section id="contact" class="centre"><h2>{e(C["titre"])}</h2><p>{e(C["texte"])}</p>
    <p class="coord"><a href="tel:{tel}">{e(C["telephone"])}</a> · <a href="mailto:{e(C["email"])}">{e(C["email"])}</a></p><p>{e(C["zone"])}</p></section>
</main>
<footer>{zones}<p>© {datetime.date.today().year} {e(S["mentions"])}</p></footer>
{formulaire}
<dialog id="zoom"><img alt=""><button aria-label="Fermer">×</button></dialog>
<script src="script.js"></script>
</body>
</html>
"""
    return page, url


if __name__ == "__main__":
    site = lire_contenu()
    page, url = construire(site)
    open("index.html", "w", encoding="utf-8").write(page)
    open("robots.txt", "w", encoding="utf-8").write("User-agent: *\nAllow: /\n" + (f"Sitemap: {url}sitemap.xml\n" if url else ""))
    if url:
        open("sitemap.xml", "w", encoding="utf-8").write(
            '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
            f"  <url><loc>{url}</loc><lastmod>{datetime.date.today().isoformat()}</lastmod></url>\n</urlset>\n")
    print("OK : index.html, robots.txt et sitemap.xml générés." if url else "OK : index.html généré (renseignez seo.url pour le sitemap).")
