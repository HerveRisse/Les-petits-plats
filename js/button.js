// Sélection des éléments de la page
let ingredientInput = document.getElementById('ingredient');
let ingredientDropdown = document.getElementById('select-dropdown-ingredients');
let ingredientsBgColor = document.querySelector('.filter-ingredients');

let appareilInput = document.getElementById('appareil');
let appareilDropdown = document.getElementById('select-dropdown-appareils');
let appareilsBgColor = document.querySelector('.filter-appareils');

let ustensilInput = document.getElementById('ustensil');
let ustensilDropdown = document.getElementById('select-dropdown-ustensiles');
let ustensilesBgColor = document.querySelector('.filter-ustensiles');

// Écouteurs d'événements pour l'input ingrédient
ingredientInput.addEventListener('click', function () {
    ingredientDropdown.style.display = 'flex'; // Afficher la liste déroulante des ingrédients
    ingredientsBgColor.style.background = '#3282F7'; // Changer la couleur de fond de la section ingrédients
    appareilsBgColor.style.background = 'none'; // Réinitialiser la couleur de fond de la section appareils
    ustensilesBgColor.style.background = 'none'; // Réinitialiser la couleur de fond de la section ustensiles
});

// Écouteurs d'événements pour l'input appareil
appareilInput.addEventListener('click', function () {
    appareilDropdown.style.display = 'flex'; // Afficher la liste déroulante des appareils
    appareilsBgColor.style.background = '#68D9A4'; // Changer la couleur de fond de la section appareils
    ingredientsBgColor.style.background = 'none'; // Réinitialiser la couleur de fond de la section ingrédients
    ustensilesBgColor.style.background = 'none'; // Réinitialiser la couleur de fond de la section ustensiles
});

// Écouteurs d'événements pour l'input ustensil
ustensilInput.addEventListener('click', function () {
    ustensilDropdown.style.display = 'flex'; // Afficher la liste déroulante des ustensiles
    ustensilesBgColor.style.background = '#D04F4F'; // Changer la couleur de fond de la section ustensiles
    ingredientsBgColor.style.background = 'none'; // Réinitialiser la couleur de fond de la section ingrédients
    appareilsBgColor.style.background = 'none'; // Réinitialiser la couleur de fond de la section appareils
});

// Écouteur d'événement pour les clics sur la page
document.addEventListener('click', function (event) {
    if (!event.target.matches('#ingredient')) {
        ingredientDropdown.style.display = 'none'; // Masquer la liste déroulante des ingrédients si l'utilisateur clique en dehors de l'input ingrédient
    }
    if (!event.target.matches('#appareil')) {
        appareilDropdown.style.display = 'none'; // Masquer la liste déroulante des appareils si l'utilisateur clique en dehors de l'input appareil
    }
    if (!event.target.matches('#ustensil')) {
        ustensilDropdown.style.display = 'none'; // Masquer la liste déroulante des ustensiles si l'utilisateur clique en dehors de l'input ustensil
    }

    // Réinitialiser la couleur de fond des sections si aucun input n'est en focus
    if (!ingredientInput.matches(':focus') && !appareilInput.matches(':focus') && !ustensilInput.matches(':focus')) {
        ingredientsBgColor.style.background = '#3282F7'; // Couleur de fond de la section ingrédients
        appareilsBgColor.style.background = '#68D9A4'; // Couleur de fond de la section appareils
        ustensilesBgColor.style.background = '#D04F4F'; // Couleur de fond de la section ustensiles
    }
});
