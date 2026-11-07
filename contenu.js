// ============================================================
//  TEXTES ET PHOTOS DU SITE : modifiez uniquement ce qui est
//  entre guillemets "..." . Les photos sont dans le dossier images.
// ============================================================
const SITE = {
  baseline: "Vos envies, notre savoir faire",

  entreprise: {
    titre: "Notre entreprise",
    accroche: "Peinture et rénovation sur Toulouse et villes proches",
    texte: [
      "15 ans d'expérience à votre service.",
      "Nous saurons vous accompagner dans vos projets, qu'il s'agisse de neuf comme de rénovation."
    ]
  },

  // photo = images/services/NOM.jpg (à déposer dans le dossier images/services)
  services: [
    { icone: "🖌️", titre: "Peinture intérieure", texte: "Des finitions impeccables pour un intérieur qui vous ressemble", photo: "images/services/peinture-interieure.jpg" },
    { icone: "🏠", titre: "Peinture extérieure", texte: "Protégez et embellissez vos façades durablement", photo: "images/services/peinture-exterieure.jpg" },
    { icone: "🧱", titre: "Enduits techniques", texte: "Des murs parfaits, plus de possibilités", photo: "images/services/enduits-techniques.jpg" },
    { icone: "🌿", titre: "Papier peint / Tapisserie", texte: "Apportez du caractère à vos espaces", photo: "images/services/papier-peint.jpg" },
    { icone: "✨", titre: "Peinture & enduits décoratifs", texte: "Sublimez vos murs avec des finitions uniques", photo: "images/services/enduits-decoratifs.jpg" },
    { icone: "🪵", titre: "Pose de parquet", texte: "Stratifié, massif et sol PVC pour des sols durables et élégants", photo: "images/services/pose-parquet.jpg" },
    { icone: "🛡️", titre: "Vitrification de parquets", texte: "Redonnez vie à vos sols et protégez-les durablement", photo: "images/services/vitrification.jpg" },
    { icone: "🪟", titre: "Pose de toiles de verre", texte: "Une solution solide et élégante pour vos murs", photo: "images/services/toile-de-verre.jpg" }
  ],

  // Réalisations : photos nommées 01.jpg, 02.jpg, 03.jpg... dans images/realisations
  realisations: {
    titre: "Nos réalisations",
    dossier: "images/realisations/",
    nombre: 40,
    extension: "jpg",
    alts: {
      "01.webp": "Salon peint avec des teintes intemporelles",
      "02.webp": "Description de la deuxième photo"
    }
  },


  // Photos « avant / après » (une image contenant les deux)
  avantApres: {
    titre: "Avant / Après",
    photos: [
      "images/avant-apres/1.jpg",
      "images/avant-apres/2.jpg",
      "images/avant-apres/3.jpg",
      "images/avant-apres/4.jpg"
    ]
  },

  contact: {
    titre: "Contact",
    texte: "Devis gratuit, n'hésitez pas à nous contacter.",
    telephone: "07 68 67 32 28",
    email: "contact@lsz-peinture.fr",
    formspree: "xljjzvwq",
    zone: "Intervention : Toulouse et alentours"
  },

  seo: {
    url: "https://lsz-peinture.fr/",
    nom: "Luc Sanchez Peinture",
    nomCommercial: "Luc Peinture",
    ville: "Toulouse",
    region: "Occitanie",
    titre: "Luc Sanchez Peinture – Peintre en bâtiment à Toulouse",
    description: "Peintre en bâtiment à Toulouse et environs : peinture intérieure et extérieure, décoration, pose de parquet, rénovation. 15 ans d'expérience. Devis gratuit.",
    metiers: ["Peintre en bâtiment", "Décorateur", "Pose de parquet", "Rénovation", "Peinture intérieure", "Peinture extérieure"],
    villes: ["Aucamville", "Aussonne", "Balma", "Beauzelle", "Blagnac", "Bruguières", "Castanet-Tolosan", "Castelginest", "Colomiers", "Cornebarrieu", "Cugnaux", "Escalquens", "Fenouillet", "Fonsorbes", "Frouzins", "Labarthe-sur-Lèze", "Launaguet", "Léguevin", "L’Union", "Mondonville", "Muret", "Pibrac", "Plaisance-du-Touch", "Portet-sur-Garonne", "Quint-Fonsegrives", "Ramonville-Saint-Agne", "Roques", "Saint-Alban", "Saint-Jean", "Saint-Jory", "Saint-Orens-de-Gameville", "La Salvetat-Saint-Gilles", "Seysses", "Tournefeuille", "Villeneuve-Tolosane", "Toulouse"]
  },

  mentions: "Luc Sanchez Peinture – SIRET : 885 380 766 00042"
};
