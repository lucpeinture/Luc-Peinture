/* ==========================================================================
   SCRIPT PRINCIPAL DU SITE
   --------------------------------------------------------------------------
   Ce fichier fait fonctionner les éléments interactifs :
   - insertion des textes définis dans content.js ;
   - création de la galerie de photos ;
   - menu de navigation sur mobile ;
   - préparation d'un e-mail depuis le formulaire de contact.

   En principe, tu n'as pas besoin de modifier ce fichier pour changer les
   textes ou les photos : fais ces modifications dans content.js.
   ========================================================================== */

(function () {
    "use strict";

    // ----------------------------------------------------------------------
    // 1. RÉCUPÉRATION DU CONTENU PERSONNALISABLE
    // ----------------------------------------------------------------------
    // content.js doit être chargé avant ce fichier dans index.html.
    const content = window.SITE_CONTENT || {};

    // ----------------------------------------------------------------------
    // 2. REMPLACEMENT DES TEXTES DANS LA PAGE
    // ----------------------------------------------------------------------
    // Chaque élément HTML portant data-content="..." reçoit la valeur
    // correspondante définie dans content.js.
    document.querySelectorAll("[data-content]").forEach((element) => {
        const contentKey = element.dataset.content;
        const contentValue = content[contentKey];

        if (contentValue !== undefined && contentValue !== null) {
            element.textContent = contentValue;
        }
    });

    // Le numéro cliquable utilise un lien tel: distinct du texte affiché.
    const phoneLink = document.querySelector('[data-contact="phoneLink"]');
    if (phoneLink && content.phoneLink) {
        phoneLink.href = "tel:" + content.phoneLink;
    }

    // Le titre de l'onglet du navigateur reprend le nom de l'entreprise.
    document.title = (content.businessName || "Luc Sanchez Peinture")
        + " | Peinture & décoration";

    // Affiche automatiquement l'année en cours dans le pied de page.
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // ----------------------------------------------------------------------
    // 3. GALERIE DES RÉALISATIONS
    // ----------------------------------------------------------------------
    // Les cartes sont générées à partir de la liste portfolio de content.js.
    // Les fonctions d'échappement plus bas évitent d'interpréter les textes
    // et noms de fichiers comme du code HTML.
    const portfolioGrid = document.getElementById("portfolio-grid");

    if (portfolioGrid && Array.isArray(content.portfolio)) {
        portfolioGrid.innerHTML = content.portfolio.map((project, index) => {
            const image = escapeHTML(project.image || "");
            const alternativeText = escapeHTML(
                project.alt || project.title || "Réalisation"
            );
            const category = escapeHTML(project.category || "RÉALISATION");
            const title = escapeHTML(project.title || "Projet");
            const largeClass = index === 0 ? "project-large" : "";

            return `
                <figure class="project ${largeClass}">
                    <img src="${image}" alt="${alternativeText}" loading="lazy">
                    <figcaption>
                        <span>${category}</span>
                        <strong>${title}</strong>
                    </figcaption>
                </figure>
            `;
        }).join("");
    }

    // ----------------------------------------------------------------------
    // 4. MENU DE NAVIGATION SUR TÉLÉPHONE ET PETIT ÉCRAN
    // ----------------------------------------------------------------------
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".main-nav");

    if (menuButton && navigation) {
        // Ouvre ou ferme le menu au clic sur le bouton.
        menuButton.addEventListener("click", () => {
            const menuIsOpen = menuButton.getAttribute("aria-expanded") === "true";
            const newState = !menuIsOpen;

            menuButton.setAttribute("aria-expanded", String(newState));
            navigation.classList.toggle("is-open", newState);
            document.body.classList.toggle("menu-open", newState);
        });

        // Après avoir choisi une rubrique, referme le menu mobile.
        navigation.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                menuButton.setAttribute("aria-expanded", "false");
                navigation.classList.remove("is-open");
                document.body.classList.remove("menu-open");
            });
        });
    }

    // ----------------------------------------------------------------------
    // 5. FORMULAIRE DE CONTACT
    // ----------------------------------------------------------------------
    // GitHub Pages n'héberge pas de serveur pour traiter les formulaires.
    // Ici, le formulaire prépare un e-mail dans le logiciel de messagerie
    // du visiteur : aucun message n'est envoyé automatiquement par le site.
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const statusMessage = document.getElementById("form-status");

            // Empêche l'utilisation du formulaire tant que l'adresse exemple
            // n'a pas été remplacée dans content.js.
            if (!content.email || content.email.includes("exemple.fr")) {
                if (statusMessage) {
                    statusMessage.textContent =
                        "Renseignez votre véritable adresse e-mail dans content.js avant publication.";
                }
                return;
            }

            const formData = new FormData(contactForm);
            const senderName = formData.get("name");
            const senderEmail = formData.get("email");
            const projectDescription = formData.get("message");

            const subject = encodeURIComponent(
                "Demande de devis — " + senderName
            );
            const body = encodeURIComponent(
                "Nom : " + senderName
                + "\nE-mail : " + senderEmail
                + "\n\nProjet :\n" + projectDescription
            );

            window.location.href = `mailto:${content.email}?subject=${subject}&body=${body}`;

            if (statusMessage) {
                statusMessage.textContent =
                    "Votre logiciel de messagerie va s'ouvrir avec le message préparé.";
            }
        });
    }

    // ----------------------------------------------------------------------
    // 6. FONCTION DE SÉCURISATION DES TEXTES INSÉRÉS DANS LE HTML
    // ----------------------------------------------------------------------
    // Transforme les caractères spéciaux en entités HTML. Ne pas supprimer :
    // cette protection évite qu'un texte soit interprété comme du code HTML.
    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, (character) => {
            const replacements = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            };

            return replacements[character];
        });
    }

})();
