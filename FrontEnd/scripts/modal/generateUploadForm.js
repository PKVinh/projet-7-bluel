import { displayModalWorks } from "./generateModal.js";

const btnAddWorks = document.getElementById("btnAddWorks")

btnAddWorks.addEventListener ("click", (event) => {
    event.preventDefault();

    const modalTitle = document.getElementById("modal-title")
    modalTitle.textContent = "Ajout Photo"

    const modalContent = document.querySelector(".modal-gallery");
    modalContent.innerHTML = "";
    modalContent.style.display = "block"; 

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

    // Créez le conteneur principal de téléchargement de photo
    const uploadContainer = document.createElement("div");
    uploadContainer.classList.add("upload-container");
    
    // Créez la div pour les éléments de téléchargement de photo
    const uploadDiv = document.createElement("div");
    uploadDiv.classList.add("upload-div");

    // Créez l"icône Font Awesome
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

    const labelFile = document.createElement("label");
    labelFile.setAttribute("id", "button-add-image")
    labelFile.setAttribute("for", "image");
    labelFile.textContent = "+ Ajouter Photo";
    uploadDiv.appendChild(labelFile);

    // Créez l'élément pour les informations de fichier
    const fileInfo = document.createElement("p");
    fileInfo.classList.add("file-info");
    fileInfo.textContent = "jpg, png : 4mo max";
    uploadDiv.appendChild(fileInfo);
    
    uploadContainer.appendChild(uploadDiv);

    // Créez le label et l"input pour le titre
    const labelTitle = document.createElement("label");
    labelTitle.setAttribute("for", "title");
    labelTitle.textContent = "Titre";

    const inputTitle = document.createElement("input");
    inputTitle.setAttribute("type", "textarea");
    inputTitle.setAttribute("name", "title");
    inputTitle.setAttribute("id", "title");

    // Créez le label pour le pays/catégorie
    const labelCategory = document.createElement("label");
    labelCategory.setAttribute("for", "category");
    labelCategory.textContent = "Catégories";

    // Créez le select et ses options
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

    // Ajoutez les options au select
    selectCategory.appendChild(option1);
    selectCategory.appendChild(option2);
    selectCategory.appendChild(option3);

    //Message d'erreur/de succès
    const message = document.createElement("p");
    message.setAttribute("id", "message-modal")

    // Assemblez les éléments dans le formulaire
    form.appendChild(uploadContainer);
    form.appendChild(labelTitle);
    form.appendChild(inputTitle);
    form.appendChild(labelCategory);
    form.appendChild(selectCategory);
    form.appendChild(message);

    // Ajoutez le formulaire dans la section
    section.appendChild(form);

    // Ajoutez la section dans la modale
    modalContent.appendChild(section);

    btnAddWorks.style.display = "none";

    const btnValidate = document.getElementById("btnValidate");
    btnValidate.style.display = "block";

})

// Bouton Retour arrière
const backArrow = document.getElementById("back-arrow");

backArrow.addEventListener("click", () => {
    const modalContent = document.querySelector(".modal-gallery");
    modalContent.removeAttribute("style", "block"); 

    const modalTitle = document.getElementById("modal-title")
    modalTitle.textContent = "Galerie Photo"

    displayModalWorks() 

    const btnAddWorks = document.getElementById("btnAddWorks");
    btnAddWorks.style.display = "block";

    backArrow.style.display = "none";
    }
)