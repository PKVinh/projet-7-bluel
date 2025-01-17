document.body.addEventListener("change", function(event) {

// Vérifiez que l'événement provient d'un input type="file"
 if (event.target.tagName === "INPUT" && event.target.type === "file") {

        const imageFile = event.target.files[0];

        if (imageFile) {
            const validTypes = ["image/jpeg", "image/png"];

            if (!validTypes.includes(imageFile.type)) {
                alert("Veuillez sélectionner un fichier JPG ou PNG.");
                event.target.value = ""; // Réinitialiser l'input
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                // Créez la preview de l'image
                const imgPreview = document.createElement("img");
                imgPreview.setAttribute("src", e.target.result)
                imgPreview.setAttribute("id","image-preview")

                const uploadContainer = document.querySelector(".upload-container");
                uploadContainer.appendChild(imgPreview); 

                //Remplace le formulaire par l'image
                const uploadDiv = document.querySelector(".upload-div");
                uploadDiv.style.display = "none"
            };

            reader.readAsDataURL(imageFile);
        }
    }
}
);