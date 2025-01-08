const logOut = document.getElementById("log-link")

logOut.addEventListener("click", (event) => {
    if (logOut.textContent === "logout") {

        // Empêcher le comportement par défaut du lien
        event.preventDefault();        

        logOut.removeAttribute("href")
        
        // Afficher une alerte de confirmation
        const confirmation = confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
    
        if (confirmation) {
            // Supprimer le token du localStorage
            localStorage.removeItem("authToken");
    
            // Rafraîchir la page
            window.location.reload();
            }
        }
    }
)
