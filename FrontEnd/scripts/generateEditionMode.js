function generateEditionMode() {
    // Récupération du token depuis le localStorage
    const authToken = localStorage.getItem("authToken").trim()
    
    // Vérification de la présence du token
    if (authToken) {
        // Si le token est présent et valide, affiche le mode édition et cache les boutons
        document.getElementById("category-options").style.display = "none";
        document.querySelector(".edition-mode").style.display = "flex";
        document.getElementById("modal-open-button").style.display = "flex";
        
        const loginLink = document.getElementById("log-link");
        loginLink.textContent = "logout"

    } else {
        // Sinon, affiche les boutons et cache le mode édition
        document.getElementById("category-options").style.display = "flex";
        document.getElementById("modal-open-button").style.display = "none";
        
    }
}

// Appeler la fonction au chargement de la page
window.onload = generateEditionMode();
