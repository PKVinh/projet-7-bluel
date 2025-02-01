import { displayWorks } from "../generateGalleryGrid.js";

async function submitWorks() {
    // Récupération du token
    const token = localStorage.getItem("authToken");
    if (!token) {
        alert("Impossible de récupérer le token, requête annulée.");
        return;
    }

    // Création de FormData et du message de succès/erreur
    const form = document.getElementById("upload-form");
    const formData = new FormData(form);
    const messageElement = document.getElementById("message-modal");

    try {
        // Validation des champs
        const fileInput = form.querySelector('input[type="file"]');
        const textInput = form.querySelector('input[name="title"]');
        const file = fileInput.files[0];

        //Contrôle des champs
        if (!textInput.value.trim()) {
            throw new Error("Le champ Titre est vide.");
        }

        if (textInput.value.length > 255) {
            throw new Error("Le nombre de caractères est trop élevé.");
        }

        if (!file) {
            throw new Error("Aucun fichier sélectionné.");
        }

        const allowedTypes = ["image/png", "image/jpeg"];
        if (!allowedTypes.includes(file.type)) {
            throw new Error("Le fichier doit être au format .png ou .jpg.");
        }

        if (file.size > 4 * 1024 * 1024) {
            throw new Error("Le fichier dépasse la taille maximale de 4 Mo.");
        }

        // Envoi des données
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });

        if (response.ok) {
            messageElement.textContent = "Ajout réussi !";
            messageElement.className = "success-message"; // Applique la classe de succès
            form.reset(); // Vide tous les champs du formulaire

            // Remise à zéro de la preview
            const uploadDiv = document.querySelector(".upload-div");
            uploadDiv.style.display = "flex"

            const imgPreview = document.getElementById("image-preview")
            imgPreview.style.display = "none"
            
            // Update de la galerie
            const updatedGalleryResponse = await fetch("http://localhost:5678/api/works")

            if (updatedGalleryResponse.ok) {
                const updatedImages = await updatedGalleryResponse.json();
                displayWorks(updatedImages); // Rappelle la fonction pour afficher les images dans les galeries
            } else {
                console.error("Erreur lors de la récupération de la galerie mise à jour.");
            }
        } else {
            throw new Error(`Erreur lors de l'upload : ${response.status}`);
        }

    } catch (error) {
        messageElement.textContent = error.message;
        messageElement.className = "error-message"; // Applique la classe d"erreur
    }
}

// Event de validation
const btnValidate = document.getElementById("btnValidate");

btnValidate.addEventListener("click", (event) => {
    event.preventDefault();
    submitWorks();
    btnValidate.classList.remove("button"); // Change la couleur du bouton
    btnValidate.classList.add("button-gray")
});
