let ingredientInput = document.getElementById('ingredient');
let ingredientDropdown = document.getElementById('select-dropdown-ingredients');
let ingredientsBgColor = document.querySelector('.filter-ingredients');

let appareilInput = document.getElementById('appareil');
let appareilDropdown = document.getElementById('select-dropdown-appareils');
let appareilsBgColor = document.querySelector('.filter-appareils');

let ustensilInput = document.getElementById('ustensil');
let ustensilDropdown = document.getElementById('select-dropdown-ustensiles');
let ustensilesBgColor = document.querySelector('.filter-ustensiles');

ingredientInput.addEventListener('click', function () {
    ingredientDropdown.style.display = 'flex';
    ingredientsBgColor.style.background = '#3282F7';
    appareilsBgColor.style.background = 'none';
    ustensilesBgColor.style.background = 'none';
});

appareilInput.addEventListener('click', function () {
    appareilDropdown.style.display = 'flex';
    appareilsBgColor.style.background = '#68D9A4';
    ingredientsBgColor.style.background = 'none';
    ustensilesBgColor.style.background = 'none';
});

ustensilInput.addEventListener('click', function () {
    ustensilDropdown.style.display = 'flex';
    ustensilesBgColor.style.background = '#D04F4F';
    ingredientsBgColor.style.background = 'none';
    appareilsBgColor.style.background = 'none';
});

document.addEventListener('click', function (event) {
    if (!event.target.matches('#ingredient')) {
        ingredientDropdown.style.display = 'none';
    }
    if (!event.target.matches('#appareil')) {
        appareilDropdown.style.display = 'none';
    }
    if (!event.target.matches('#ustensil')) {
        ustensilDropdown.style.display = 'none';
    }

    if (!ingredientInput.matches(':focus') && !appareilInput.matches(':focus') && !ustensilInput.matches(':focus')) {
        ingredientsBgColor.style.background = '#3282F7';
        appareilsBgColor.style.background = '#68D9A4';
        ustensilesBgColor.style.background = '#D04F4F';
    }
});
