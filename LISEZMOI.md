# Site Luc Sanchez Peinture – mode d'emploi

## Contenu du dossier
- `index.html` : structure de la page (rarement à modifier)
- `contenu.js` : **tous les textes** et la liste des photos
- `style.css` : couleurs, polices, mise en page
- `images/` : toutes les photos

## Photos à déposer (depuis Canva : Partager → Télécharger, ou clic droit sur l'image)
| Dossier / fichier | Contenu |
|---|---|
| `images/hero.jpg` | grande photo du haut (salon), environ 2000 px de large |
| `images/logo.png` | logo en PNG à fond transparent |
| `images/services/…` | 8 photos des prestations, noms listés dans `contenu.js` |
| `images/realisations/01.jpg, 02.jpg…` | photos de réalisations, numérotées sur 2 chiffres |
| `images/avant-apres/1.jpg … 4.jpg` | les 4 images avant/après |

Tant qu'une photo manque, une image grise « Photo à ajouter » s'affiche.
Conseil : photos d'environ 1600 px de large et moins de 500 Ko chacune.

## Modifier un texte
GitHub → fichier `contenu.js` → crayon (Edit) → modifier entre guillemets → **Commit changes**. Mise à jour en 1 à 2 minutes (Ctrl+F5).

## Ajouter une réalisation
Déposez `41.jpg` dans `images/realisations`, puis passez `nombre: 40` à `nombre: 41` dans `contenu.js`.

## Mettre en ligne
Remplacez les fichiers du dépôt GitHub par ceux-ci (Add file → Upload files). Pages : Settings → Pages → branche `main`, dossier `/ (root)`.

## À compléter
Téléphone, e-mail, zone d'intervention et SIRET dans `contenu.js` (ils ne figuraient pas sur la capture). Remplacez aussi le texte de description dans `index.html` si besoin.
