export function generateEditionMode() {
    // Récupération du token depuis le localStorage
    const authToken = localStorage.getItem("authToken").trim()
    
    // Vérification de la présence du token
    if (authToken) {
        // Si le token est présent et valide, affiche l"élément Z et cache l"élément A
        const editionMode = document.querySelector(".edition-mode")
        editionMode.style.display = "flex";

        const loginLink = document.getElementById("log-link");
        loginLink.textContent = "logout"

    }
}
