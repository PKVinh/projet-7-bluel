function togglePassword() {
    document.getElementById("show-password").addEventListener("change", function() {
        const passwordField = document.getElementById("password");
        if (this.checked) {
            passwordField.type = "text";  // Afficher le mot de passe
        } else {
            passwordField.type = "password";  // Masquer le mot de passe
        }
    })
}

function buttonLogin () {
    const loginForm = document.getElementById("login-form")
    
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault(); // Empêche la soumission du formulaire
    
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const messageElement = document.getElementById("message");
    
        try {
            // Validation des champs avant l"envoi
            if (!email || !password) {
                throw new Error("Nom d\"utilisateur et mot de passe sont requis.");
            }
    
            // Envoi des informations de login à l"API via fetch avec await
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
    
            // Vérification de la réponse de l"API
            if (!response.ok) {
                throw new Error("Nom d\"utilisateur ou mot de passe incorrect.");
            }
    
            // Si la réponse est OK, on récupère les données
            const data = await response.json(); // Résultat sous forme d"objet JSON
            const token = data.token; // Récupère le token de la réponse

            // Sauvegarde du token dans le localStorage
            localStorage.setItem("authToken", encodeURIComponent(token));

            //Message de succès
            messageElement.textContent = "Connexion réussie !";
            messageElement.className = "success-message"; // Applique la classe de succès
    
            // Redirection vers l"accueil après 2 secondes
            setTimeout(function() {
                window.location.href = "index.html";  // Redirige vers l"URL de la page d"accueil
            }, 2000);
    
        } catch (error) {
            // Si une erreur se produit, on l"affiche
            messageElement.textContent = error.message;
            messageElement.className = "error-message"; // Applique la classe d"erreur
        }
    });
    
}

buttonLogin ()