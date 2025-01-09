// Fonction pour créer et insérer la fenêtre modale dans le DOM
function createModal() {
    const modalHTML = `
            <div class="modal-content">
                <h2 id="modal-title">Galerie photo</h2>
                <div class="modal-gallery"></div>
                <button class="button" id="btnAddWorks">Ajouter une photo</button>
                <button class="button" id="btnValidate">Valider</button>
                <button id="modal-close-button" class="close" aria-label="Fermer la fenêtre">&times;</button>
                <button id="back-arrow" class="return" aria-label="retour"><i class="fas fa-arrow-left"></i></button>
            </div>
    `;

    // Ajoute la modale au body
    const modal = document.querySelector(".modal");
    modal.insertAdjacentHTML("beforeend", modalHTML);
}

// Appelle la fonction pour générer la modale
createModal();

// Ouvrir la fenêtre modale
const openModalBtn = document.getElementById("modal-open-button");
const modal = document.getElementById("modal");

openModalBtn.addEventListener("click", () => {
    modal.removeAttribute("hidden");
    modal.setAttribute("aria-hidden", "false");
});

// Fermer la fenêtre modale
function closeModal() {
    modal.setAttribute("hidden", true);
    modal.setAttribute("aria-hidden", "true");
}

// Fermer la fenêtre modale en cliquant sur le bouton de fermeture
const closeModalBtn = document.getElementById("modal-close-button");
closeModalBtn.addEventListener("click", closeModal);

// Fermer la fenêtre modale en cliquant à l"extérieur de la boîte de contenu
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Fonction pour afficher les travaux
export async function displayModalWorks() {
    const galleryModal = document.querySelector(".modal-gallery");
    galleryModal.innerHTML = ""; // Vide la galerie avant d"ajouter les nouveaux éléments

    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();

    // Boucle `for` pour parcourir les éléments filtrés
    for (let i = 0; i < works.length; i++) {
        const work = works[i];

        // Crée l"élément à afficher
        const modalElement = document.createElement("div");
        modalElement.classList.add("modal-work")

        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl; // Assurez-vous que l"API renvoie cette clé
        imageElement.id = works[i].id
        
        const trashElement = document.createElement("i");
        trashElement.classList.add("fa-solid", "fa-trash-can")
        
        modalElement.appendChild(imageElement);
        modalElement.appendChild(trashElement);
        galleryModal.appendChild(modalElement);

        const btnValidate = document.getElementById("btnValidate")
        btnValidate.style.display = "none";
    }
}

displayModalWorks()

