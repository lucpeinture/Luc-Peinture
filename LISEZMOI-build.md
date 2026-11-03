# Générer le site : build.py

1. Modifiez vos textes dans `contenu.js` (et déposez vos photos dans `images/`).
2. Dans un terminal, dans le dossier du site : `python3 build.py`
3. Le script réécrit `index.html`, `robots.txt` et `sitemap.xml`. Ne modifiez plus `index.html` à la main : il est régénéré à chaque fois.
4. Vérifiez en ouvrant `index.html` dans le navigateur, puis Stage, Commit et Pousser dans git-cola.

Les photos de `images/realisations/` sont détectées automatiquement (tous les .jpg, .jpeg, .png, .webp, classés par nom).
Pour décrire une photo (utile pour Google), ajoutez dans `realisations` :
`alts: { "01.jpg": "Salon repeint en beige avec boiseries blanches" },`
