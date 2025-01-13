// Fonction pour rafraîchir la disposition des images (si nécessaire)
function updateImageLayout() {
    const gallery = document.querySelector(".modal-gallery"); // Remplacez par le sélecteur de votre galerie
    if (gallery) {
        // Forcer le navigateur à re-calculer le layout
        gallery.style.display = "none";
        gallery.offsetHeight; // Force le reflow
        gallery.style.display = ""; // Remettre le style initial
    }
}

async function deleteImageFromAPI(id) {

    const confirmation = confirm("Voulez-vous vraiment supprimer cette image ?");
    if (!confirmation) {
        return; // Si l"utilisateur annule, ne rien faire
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
            const imageElement = document.getElementById(id);
            if (imageElement) {
                imageElement.remove();
            }

            // Repositionner les images restantes si nécessaire
            updateImageLayout();
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
            }
        }
    }
});



