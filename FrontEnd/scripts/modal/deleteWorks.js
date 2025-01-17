import { displayWorks } from "../generateGalleryGrid.js";

async function deleteImageFromAPI(id) {
    const confirmation = confirm("Voulez-vous vraiment supprimer cette image ?");
    if (!confirmation) {
        return; // Si l'utilisateur annule, ne rien faire
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
        console.error("Pas de token");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            console.log("Image supprimée avec succès de l\"API");
            // Récupérer l"élément image et le supprimer du DOM
            const imageElement = document.getElementById(id).parentNode;
            if (imageElement) {
                imageElement.remove();
            }
            const updatedGalleryResponse = await fetch("http://localhost:5678/api/works", {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (updatedGalleryResponse.ok) {
                const updatedImages = await updatedGalleryResponse.json();
                displayWorks(updatedImages);
            } else {
                console.error("Erreur lors de la récupération de la galerie mise à jour.");
            }

        } else {
            console.error(`Token Invalide: ${response.status}`);
        }
    } catch (error) {
        console.error("Erreur lors de la suppression de l\"image:", error);
    }
}



document.body.addEventListener("click", (event) => {
    
    if (event.target.classList.contains("fa-trash-can")) {
        const container = event.target.closest("div"); // Conteneur parent

        if (container) {
            const image = container.querySelector("img"); // Récupérer l"image dans ce conteneur
            const trash = container.querySelector("i"); // Récupérer l'icone dans ce conteneur
            if (image) {
                deleteImageFromAPI(image.id)
                trash.remove()
                displayWorks(updatedImages);
            }
        }
    }
});



