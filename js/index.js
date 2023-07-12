const filterContainerUstensils = document.getElementById('select-dropdown-ustensiles');
const filterContainerIngredients = document.getElementById('select-dropdown-ingredients');
const filterContainerAppliances = document.getElementById('select-dropdown-appareils');

const selectedUstensils = document.getElementById('selected-keyword-ustensiles');
const selectedIngredients = document.getElementById('selected-keyword-ingredients');
const selectedAppliances = document.getElementById('selected-keyword-appareils');

// Crée une carte de recette à partir des données de la recette
function creerCarte(recipe) {
    const card = document.createElement('div');
    const cardImg = document.createElement('div');
    const cardContent = document.createElement('div');

    const name = document.createElement('h2');
    name.innerHTML = recipe.name;
    const time = document.createElement('strong');
    time.innerHTML = recipe.time + ' min';

    const div = document.createElement('div');
    div.innerHTML = '';
    const ingredient = document.createElement('ul');
    const instruction = document.createElement('p')
    instruction.innerHTML = recipe.description;

    card.appendChild(cardImg);
    card.appendChild(cardContent);
    cardContent.appendChild(name);
    cardContent.appendChild(time);
    cardContent.appendChild(div);
    div.appendChild(ingredient);
    div.appendChild(instruction);

    for (let i = 0; i < recipe.ingredients.length; i++) {
        const li = document.createElement('li');
        const strong = document.createElement('strong');
        strong.innerHTML = recipe.ingredients[i].ingredient + ': ';
        li.appendChild(strong);
        li.innerHTML += recipe.ingredients[i].quantity;
        if (recipe.ingredients[i].unit) {
            li.innerHTML += ' ' + recipe.ingredients[i].unit;
        }
        ingredient.appendChild(li);
    };

    return card;
}

// Affiche toutes les cartes de recettes
function afficherCardContainer() {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    recipes.forEach(recipe => {
        const card = creerCarte(recipe);
        cardContainer.appendChild(card);
    });
}

// Vérifie si au moins un ingrédient de la liste est présent dans la recette
function isIngredientInRecipe(wordsList, recipe) {
    if (wordsList.length === 0) {
        return true; // Si la liste est vide, toutes les recettes sont valides
    }

    // Convertit les ingrédients de la recette en minuscules pour la comparaison
    const recipeIngredients = recipe.ingredients.map(ingredientObj => ingredientObj.ingredient.toLowerCase());

    // Vérifie si au moins un ingrédient de la liste est présent dans les ingrédients de la recette
    return wordsList.some(ingredient => recipeIngredients.includes(ingredient));
}

// Vérifie si au moins un ustensile de la liste est présent dans la recette
function isUstensilInRecipe(wordsList, recipe) {
    if (wordsList.length === 0) {
        return true; // Si la liste est vide, toutes les recettes sont valides
    }

    // Convertit les ustensiles de la recette en minuscules pour la comparaison
    const recipeUstensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase());

    // Vérifie si au moins un ustensile de la liste est présent dans les ustensiles de la recette
    return wordsList.some(ustensil => recipeUstensils.includes(ustensil));
}

// Vérifie si l'appareil de la recette correspond à l'un des mots de la liste
function isApplianceInRecipe(wordsList, recipe) {
    if (wordsList.length === 0) {
        return true; // Si la liste est vide, toutes les recettes sont valides
    }

    // Convertit l'appareil de la recette en minuscules pour la comparaison
    const appliance = recipe.appliance.toLowerCase();

    // Vérifie si l'appareil de la recette correspond à l'un des mots de la liste
    return wordsList.includes(appliance);
}


// Filtre les recettes en fonction des filtres sélectionnés
function filterRecipes() {
    // Récupère les mots-clés des ustensiles sélectionnés
    const selectedUstensilsWords = Array.from(selectedUstensils.children).map(span => span.innerHTML.toLowerCase());

    // Récupère les mots-clés des ingrédients sélectionnés
    const selectedIngredientsWords = Array.from(selectedIngredients.children).map(span => span.innerHTML.toLowerCase());

    // Récupère les mots-clés des appareils sélectionnés
    const selectedAppliancesWords = Array.from(selectedAppliances.children).map(span => span.innerHTML.toLowerCase());

    // Filtre les recettes en fonction des filtres sélectionnés
    const filteredRecipes = actualRecipes.filter(recipe => {
        const ustensilsMatch = isUstensilInRecipe(selectedUstensilsWords, recipe);
        const ingredientsMatch = isIngredientInRecipe(selectedIngredientsWords, recipe);
        const applianceMatch = isApplianceInRecipe(selectedAppliancesWords, recipe);

        // Retourne true si la recette correspond à tous les filtres sélectionnés
        return ustensilsMatch && ingredientsMatch && applianceMatch;
    });

    // Filtre et affiche les cartes de recettes correspondantes
    filtrerCards(filteredRecipes);

    // Crée le contenu des dropdowns de filtres pour les recettes filtrées
    createFilter(filteredRecipes);
}

// Filtre les cartes de recettes en fonction d'une recherche
const mainSearch = document.getElementById('recherche');
mainSearch.addEventListener('keyup', filterRecipes);

function filtrerCards(filteredRecipes) {
    // Récupère la valeur de la recherche en convertissant en minuscules
    const recherche = document.getElementById('recherche').value.toLowerCase();

    // Récupère le conteneur des cartes de recettes
    const cardContainer = document.getElementById('card-container');

    // Efface le contenu précédent du conteneur des cartes de recettes
    cardContainer.innerHTML = '';

    // Vérifie si la recherche contient au moins 3 caractères
    if (recherche.length >= 3) {
        // Parcourt les recettes filtrées
        for (let i = 0; i < filteredRecipes.length; i++) {
            const recipe = filteredRecipes[i];

            // Vérifie si le nom de la recette, la description ou l'appareil contiennent la recherche
            if (recipe.name.toLowerCase().includes(recherche) || recipe.description.toLowerCase().includes(recherche) || recipe.appliance.toLowerCase().includes(recherche)) {
                // Crée une carte de recette à partir de la recette filtrée
                const card = creerCarte(recipe);

                // Ajoute la carte au conteneur des cartes de recettes
                cardContainer.appendChild(card);
            }
        }
    } else {
        // Si la recherche contient moins de 3 caractères, affiche toutes les recettes filtrées
        for (let i = 0; i < filteredRecipes.length; i++) {
            const recipe = filteredRecipes[i];
            const card = creerCarte(recipe);
            cardContainer.appendChild(card);
        }
    }
}

// Filtre des items du dropdown
function filterDropdownItems(input, dropdownContainer) {
    // Récupère la valeur de saisie de l'utilisateur en convertissant en minuscules
    const filter = input.value.toLowerCase();

    // Récupère tous les éléments <p> du dropdown
    const dropdownItems = dropdownContainer.getElementsByTagName('p');

    // Parcourt chaque élément du dropdown
    Array.from(dropdownItems).forEach(item => {
        // Récupère le texte de l'élément en minuscules
        const itemText = item.innerHTML.toLowerCase();

        // Vérifie si le texte de l'élément contient la valeur de filtre
        if (itemText.includes(filter)) {
            // Affiche l'élément s'il correspond au filtre
            item.style.display = 'block';
        } else {
            // Masque l'élément s'il ne correspond pas au filtre
            item.style.display = 'none';
        }
    });
}

// Écouteurs d'événements pour filtrer les dropdowns de filtres
const inputIngredient = document.getElementById('ingredient');
inputIngredient.addEventListener('keyup', () => {
    filterDropdownItems(inputIngredient, filterContainerIngredients);
});

const inputAppareil = document.getElementById('appareil');
inputAppareil.addEventListener('keyup', () => {
    filterDropdownItems(inputAppareil, filterContainerAppliances);
});

const inputUstensil = document.getElementById('ustensil');
inputUstensil.addEventListener('keyup', () => {
    filterDropdownItems(inputUstensil, filterContainerUstensils);
});

// Crée le contenu des dropdowns de filtres
function createFilter(filters) {
    // Crée des ensembles (Set) pour stocker les valeurs uniques des ustensiles, ingrédients et appareils
    const uniqueUstensils = new Set();
    const uniqueIngredients = new Set();
    const uniqueAppliances = new Set();

    // Vide le contenu des conteneurs des dropdowns de filtres
    filterContainerUstensils.innerHTML = '';
    filterContainerIngredients.innerHTML = '';
    filterContainerAppliances.innerHTML = '';

    // Parcourt les filtres des recettes filtrées
    filters.forEach(filter => {
        // Vérifie si le filtre a des ustensiles et les ajoute à l'ensemble unique
        if (Array.isArray(filter.ustensils)) {
            filter.ustensils.forEach(word => {
                const trimmedWord = word.trim();
                if (trimmedWord.length > 0) {
                    uniqueUstensils.add(trimmedWord);
                }
            });
        }

        // Vérifie si le filtre a des ingrédients et les ajoute à l'ensemble unique
        if (Array.isArray(filter.ingredients)) {
            filter.ingredients.forEach(ingredient => {
                if (typeof ingredient.ingredient === 'string') {
                    const trimmedIngredient = ingredient.ingredient.trim();
                    if (trimmedIngredient.length > 0) {
                        uniqueIngredients.add(trimmedIngredient);
                    }
                }
            });
        }

        // Vérifie si le filtre a un appareil et l'ajoute à l'ensemble unique
        if (typeof filter.appliance === 'string') {
            const trimmedAppliance = filter.appliance.trim();
            if (trimmedAppliance.length > 0) {
                uniqueAppliances.add(trimmedAppliance);
            }
        }
    });

    // Convertit les ensembles en tableaux triés
    const sortedUstensils = Array.from(uniqueUstensils).sort();
    const sortedIngredients = Array.from(uniqueIngredients).sort();
    const sortedAppliances = Array.from(uniqueAppliances).sort();

    // Parcourt les ustensiles triés et crée des éléments <p> pour les ajouter au conteneur du dropdown d'ustensiles
    sortedUstensils.forEach(filter => {
        const p = document.createElement('p');
        p.innerHTML = filter;
        filterContainerUstensils.appendChild(p);

        // Ajoute un événement de clic à chaque élément <p> pour ajouter ou supprimer des filtres sélectionnés
        p.addEventListener('click', () => {
            const selectedUstensil = p.innerHTML;
            const span = document.createElement('span');
            span.innerHTML = selectedUstensil;
            selectedUstensils.appendChild(span);
            filterContainerUstensils.removeChild(p);

            // Ajoute un événement de clic à chaque filtre sélectionné pour le supprimer et mettre à jour les recettes filtrées
            span.addEventListener('click', () => {
                selectedUstensils.removeChild(span);
                filterContainerUstensils.appendChild(p);
                filterRecipes();
            });

            // Met à jour les recettes filtrées en fonction des filtres sélectionnés
            filterRecipes();
        });
    });

    // Parcourt les ingrédients triés et crée des éléments <p> pour les ajouter au conteneur du dropdown d'ingrédients
    sortedIngredients.forEach(filter => {
        const p = document.createElement('p');
        p.innerHTML = filter;
        filterContainerIngredients.appendChild(p);

        // Ajoute un événement de clic à chaque élément <p> pour ajouter ou supprimer des filtres sélectionnés
        p.addEventListener('click', () => {
            const selectedIngredient = p.innerHTML;
            const span = document.createElement('span');
            span.innerHTML = selectedIngredient;
            selectedIngredients.appendChild(span);
            filterContainerIngredients.removeChild(p);

            // Ajoute un événement de clic à chaque filtre sélectionné pour le supprimer et mettre à jour les recettes filtrées
            span.addEventListener('click', () => {
                selectedIngredients.removeChild(span);
                filterContainerIngredients.appendChild(p);
                filterRecipes();
            });

            // Met à jour les recettes filtrées en fonction des filtres sélectionnés
            filterRecipes();
        });
    });

    // Parcourt les appareils triés et crée des éléments <p> pour les ajouter au conteneur du dropdown d'appareils
    sortedAppliances.forEach(filter => {
        const p = document.createElement('p');
        p.innerHTML = filter;
        filterContainerAppliances.appendChild(p);

        // Ajoute un événement de clic à chaque élément <p> pour ajouter ou supprimer des filtres sélectionnés
        p.addEventListener('click', () => {
            const selectedAppliance = p.innerHTML;
            const span = document.createElement('span');
            span.innerHTML = selectedAppliance;
            selectedAppliances.appendChild(span);
            filterContainerAppliances.removeChild(p);

            // Ajoute un événement de clic à chaque filtre sélectionné pour le supprimer et mettre à jour les recettes filtrées
            span.addEventListener('click', () => {
                selectedAppliances.removeChild(span);
                filterContainerAppliances.appendChild(p);
                filterRecipes();
            });

            // Met à jour les recettes filtrées en fonction des filtres sélectionnés
            filterRecipes();
        });
    });

    // Filtre les éléments du dropdown des ingrédients en fonction de la saisie de l'utilisateur
    filterDropdownItems(inputIngredient, filterContainerIngredients);

    // Filtre les éléments du dropdown des appareils en fonction de la saisie de l'utilisateur
    filterDropdownItems(inputAppareil, filterContainerAppliances);

    // Filtre les éléments du dropdown des ustensiles en fonction de la saisie de l'utilisateur
    filterDropdownItems(inputUstensil, filterContainerUstensils);
}

// Crée les filtres et affiche les cartes de recettes initiales
let actualRecipes = recipes;
createFilter(actualRecipes);
afficherCardContainer();

// Écouteurs d'événements pour les dropdowns de filtres
filterContainerUstensils.addEventListener('click', filterRecipes);
filterContainerIngredients.addEventListener('click', filterRecipes);
filterContainerAppliances.addEventListener('click', filterRecipes);
