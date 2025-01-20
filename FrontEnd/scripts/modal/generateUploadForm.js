import { displayModalWorks } from "./generateModal.js";

const btnAddWorks = document.getElementById("btnAddWorks")

btnAddWorks.addEventListener ("click", (event) => {
    event.preventDefault();

    // Changement de titre de "Galerie Photo" à "Ajout Photo"
    const modalTitle = document.getElementById("modal-title")
    modalTitle.textContent = "Ajout Photo"

    // Efface la galerie modale
    const modalContent = document.querySelector(".modal-gallery");
    modalContent.innerHTML = "";
    modalContent.style.display = "block"; 

    // Affiche le bouton Retour
    const btnReturn = document.querySelector(".return");
    btnReturn.style.display = "block"; 

    // Créez la section
    const section = document.createElement("section");
    section.classList.add("form")
    section.setAttribute("id", "modal-upload-form");

    // Créez le formulaire
    const form = document.createElement("form");
    form.setAttribute("action", "#");
    form.setAttribute("method", "post");
    form.setAttribute("id", "upload-form");

// Créez le conteneur de téléchargement de photo
    const uploadContainer = document.createElement("div");
    uploadContainer.classList.add("upload-container");
    
    // Créez la div pour les éléments de téléchargement de photo
    const uploadDiv = document.createElement("div");
    uploadDiv.classList.add("upload-div");

    // Créez l'icône Font Awesome
    const icon = document.createElement("i");
    icon.classList.add("fa-regular", "fa-image", "fa-5x");
    uploadDiv.appendChild(icon);

    // Créez le bouton pour ajouter une photo
    const inputFile = document.createElement("input");
    inputFile.setAttribute("type","file")
    inputFile.setAttribute("name","image")
    inputFile.setAttribute("id","image")
    inputFile.setAttribute("accept", ".jpg, .jpeg, .png")
    inputFile.setAttribute("style", "display: none")
    uploadDiv.appendChild(inputFile);

    // Ajout du texte pour ajouter une photo
    const labelFile = document.createElement("label");
    labelFile.setAttribute("id", "button-add-image")
    labelFile.setAttribute("for", "image");
    labelFile.textContent = "+ Ajouter Photo";
    uploadDiv.appendChild(labelFile);

    // Création de l'élément pour les informations de fichier
    const fileInfo = document.createElement("p");
    fileInfo.classList.add("file-info");
    fileInfo.textContent = "jpg, png : 4mo max";
    uploadDiv.appendChild(fileInfo);
    
    uploadContainer.appendChild(uploadDiv);

// Création du label et de l"input pour le titre
    const labelTitle = document.createElement("label");
    labelTitle.setAttribute("for", "title");
    labelTitle.textContent = "Titre";

    const inputTitle = document.createElement("input");
    inputTitle.setAttribute("type", "textarea");
    inputTitle.setAttribute("name", "title");
    inputTitle.setAttribute("id", "title");

// Création du label pour la catégorie
    const labelCategory = document.createElement("label");
    labelCategory.setAttribute("for", "category");
    labelCategory.textContent = "Catégories";

// Création du select et ses options
    const selectCategory = document.createElement("select");
    selectCategory.setAttribute("name", "category");
    selectCategory.setAttribute("id", "category");

    const option1 = document.createElement("option");
    option1.setAttribute("value", "1");
    option1.textContent = "Objets";

    const option2 = document.createElement("option");
    option2.setAttribute("value", "2");
    option2.textContent = "Appartements";

    const option3 = document.createElement("option");
    option3.setAttribute("value", "3");
    option3.textContent = "Hotel & Restaurants";

// Ajout des options au select
    selectCategory.appendChild(option1);
    selectCategory.appendChild(option2);
    selectCategory.appendChild(option3);

//Message d'erreur/de succès
    const message = document.createElement("p");
    message.setAttribute("id", "message-modal")

// Assemblage des éléments dans le formulaire
    form.appendChild(uploadContainer);
    form.appendChild(labelTitle);
    form.appendChild(inputTitle);
    form.appendChild(labelCategory);
    form.appendChild(selectCategory);
    form.appendChild(message);

    // Ajout du formulaire dans la section
    section.appendChild(form);

    // Ajout de la section dans la modale
    modalContent.appendChild(section);

// Changement de boutons de validation
    btnAddWorks.style.display = "none";
    const btnValidate = document.getElementById("btnValidate");
    btnValidate.style.display = "block";

    inputTitle.addEventListener("input", checkFields);
    inputFile.addEventListener("change", checkFields);

})

// Fonction pour changer la couleur du bouton de validation quand les champs sont remplis
function checkFields() {
    const btnValidate = document.getElementById("btnValidate");
    const inputTitle = document.getElementById("title");
    const inputFile = document.getElementById("image");

    if (inputTitle.value.trim() !== "" && inputFile.files.length > 0) {
        btnValidate.classList.remove("button-gray"); // Change la couleur du bouton
        btnValidate.classList.add("button")
    }
}


// Bouton Retour arrière
const backArrow = document.getElementById("back-arrow");

backArrow.addEventListener("click", () => {
    //Suppresion du contenu de la modale
    const modalContent = document.querySelector(".modal-gallery");
    modalContent.removeAttribute("style", "block"); 
    
    //Changement du titre
    const modalTitle = document.getElementById("modal-title")
    modalTitle.textContent = "Galerie Photo"

    // Appel de la fonction pour afficher les travaux
    displayModalWorks() 

    //Changement du bouton
    const btnAddWorks = document.getElementById("btnAddWorks");
    btnAddWorks.style.display = "block";
    backArrow.style.display = "none";
    }
)