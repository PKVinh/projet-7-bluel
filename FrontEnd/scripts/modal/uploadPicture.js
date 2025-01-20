document.body.addEventListener("change", function(event) {

// Vérifie que l'événement provient d'un input type="file"
 if (event.target.tagName === "INPUT" && event.target.type === "file") {

        const imageFile = event.target.files[0]; // Récupère le fichier uploadé

        if (imageFile) {
            const validTypes = ["image/jpeg", "image/png"];

            if (!validTypes.includes(imageFile.type)) {
                alert("Veuillez sélectionner un fichier JPG ou PNG.");
                event.target.value = ""; // Réinitialiser l'input
                return;
            }

            const reader = new FileReader(); // Création de fileReader pour afficher l'image uploadé
            reader.onload = function(e) {
                // Création de la preview de l'image
                const imgPreview = document.createElement("img");
                imgPreview.setAttribute("src", e.target.result)
                imgPreview.setAttribute("id","image-preview")
                
                //Remplace le formulaire par l'image
                const uploadContainer = document.querySelector(".upload-container");
                uploadContainer.appendChild(imgPreview); 

                const uploadDiv = document.querySelector(".upload-div");
                uploadDiv.style.display = "none"
            };

            reader.readAsDataURL(imageFile); // Affichage de l'image avec l'URL
        }
    }
}
);