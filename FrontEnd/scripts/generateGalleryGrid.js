// Fonction pour récupérer les éléments de l"API et les afficher
async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();

    // Récupère la sélection actuelle de l"utilisateur
    const selectedValue = document.querySelector("input[name='category']:checked").value;

    // Filtre les travaux en fonction de la sélection
    const filteredWorks = works.filter(work => {
        // Si "all" est sélectionné, on retourne tous les travaux
        if (selectedValue === "all") {
            return true;
        }
        // Sinon, on filtre selon le tag de chaque travail
        return work.categoryId.toString() === selectedValue; // Conversion en string pour la comparaison
    });

    // Affiche les éléments filtrés dans la galerie
    displayWorks(filteredWorks);
}

// Fonction pour afficher les travaux filtrés
export function displayWorks(filteredWorks) {
    const gallery = document.querySelector(".gallery-grid");
    gallery.innerHTML = ""; // Vide la galerie avant d"ajouter les nouveaux éléments

    // Boucle `for` pour parcourir les éléments filtrés
    for (let i = 0; i < filteredWorks.length; i++) {
        const work = filteredWorks[i];

        // Crée l"élément à afficher
        const figureElement = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl; // Assurez-vous que l"API renvoie cette clé

        const captionElement = document.createElement("figcaption");
        captionElement.innerText = work.title; // Assurez-vous que l"API renvoie cette clé

        figureElement.appendChild(imageElement);
        figureElement.appendChild(captionElement);
        gallery.appendChild(figureElement);
    }
}

// Ajoute un événement pour déclencher le filtrage lorsqu’un bouton radio est sélectionné
document.querySelectorAll("input[name='category']").forEach(radio => {
    radio.addEventListener("change", getWorks);
});

getWorks()