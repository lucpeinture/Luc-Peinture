/* ==========================================================================
   CONTENU DU SITE — FICHIER À PERSONNALISER
   --------------------------------------------------------------------------
   Modifie ici les textes, coordonnées et photos.
   Les chemins des images sont relatifs au dossier du site.
   Exemple : "images/mon-chantier.webp"
   ========================================================================== */

window.SITE_CONTENT = {

    // ----------------------------------------------------------------------
    // 1. IDENTITÉ ET COORDONNÉES
    // ----------------------------------------------------------------------
    businessName: "Luc Sanchez Peinture",
    phone: "07 68 67 32 28",          // À remplacer par le vrai numéro
    phoneLink: "+33768673228",         // Même numéro, sans espaces, avec +33
    email: "luc.pierre.sanchez@gmail.com",       // À remplacer par la vraie adresse
    area: "Toulouse et ses environs",  // Zone géographique d'intervention

    // ----------------------------------------------------------------------
    // 2. TEXTES DE LA PAGE D'ACCUEIL
    // ----------------------------------------------------------------------
    heroText: "Des espaces transformés avec soin, des finitions qui font la différence et un artisan à votre écoute.",
    heroNote: "Un travail soigné. Un résultat qui vous ressemble.",

    // ----------------------------------------------------------------------
    // 3. PRÉSENTATION DE L'ARTISAN
    // ----------------------------------------------------------------------
    artisanText: "Je suis Luc Sanchez. J'accorde une grande importance à la préparation, au conseil et à la qualité des finitions. Mon objectif : vous accompagner avec sérieux et simplicité, du premier échange jusqu'à la dernière touche.",

    // ----------------------------------------------------------------------
    // 4. GALERIE DES RÉALISATIONS
    // ----------------------------------------------------------------------
    // Pour ajouter une photo, duplique un bloc { ... } en conservant les virgules.
    // image    : chemin et nom du fichier dans le dossier images
    // alt      : description de la photo (utile pour l'accessibilité et Google)
    // category : petite catégorie affichée sur la photo
    // title    : titre de la réalisation
    // ----------------------------------------------------------------------
    portfolio: [
        {
            image: "images/AvantApres1.webp",
            alt: "Séjour rénové",
            category: "INTÉRIEUR",
            title: "Un intérieur lumineux"
        },
        {
            image: "images/AvantApres2.webp",
            alt: "Finition décorative",
            category: "DÉCORATION",
            title: "Le jeu des matières"
        },
        {
            image: "images/AvantApres3.webp",
            alt: "Pièce repeinte",
            category: "FINITIONS",
            title: "La justesse des tons"
        }
    ]

};
