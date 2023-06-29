const filterContainerUstensils = document.getElementById('select-dropdown-ustensiles');
const filterContainerIngredients = document.getElementById('select-dropdown-ingredients');
const filterContainerAppliances = document.getElementById('select-dropdown-appareils');

const selectedUstensils = document.getElementById('selected-keyword-ustensiles');
const selectedIngredients = document.getElementById('selected-keyword-ingredients');
const selectedAppliances = document.getElementById('selected-keyword-appareils');

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

function afficherCardContainer() {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    recipes.forEach(recipe => {
        const card = creerCarte(recipe);
        cardContainer.appendChild(card);
    });
}

afficherCardContainer();

function isIngredientInRecipe(wordsList, recipe) {
    let ingredientsMatch = false;
    if (wordsList.length === 0) {
        return true;
    }
    if (wordsList.length > 0) {
        const recipeIngredients = recipe.ingredients;
        for (let j = 0; j < recipeIngredients.length; j++) {
            const ingredient = recipeIngredients[j].ingredient.toLowerCase();
            if (wordsList.indexOf(ingredient) >= 0) {
                ingredientsMatch = true;
            }
        }
    }
    return ingredientsMatch
}

function isUstensilInRecipe(wordsList, recipe) {
    let ustensilsMatch = false;
    if (wordsList.length === 0) {
        return true;
    }
    if (wordsList.length > 0) {
        const recipeUstensils = recipe.ustensils;
        for (let j = 0; j < recipeUstensils.length; j++) {
            const ustensil = recipeUstensils[j].toLowerCase();
            if (wordsList.indexOf(ustensil) >= 0) {
                ustensilsMatch = true;
            }
        }
    }
    return ustensilsMatch
}

function isApplianceInRecipe(wordsList, recipe) {
    let applianceMatch = false;
    if (wordsList.length === 0) {
        return true;
    }
    if (wordsList.length > 0) {
        const appliance = recipe.appliance.toLowerCase();
        if (wordsList.indexOf(appliance) >= 0) {
            applianceMatch = true;
        }
    }
    return applianceMatch
}

function filterRecipes() {
    const selectedUstensilsWords = [];
    const selectedIngredientsWords = [];
    const selectedAppliancesWords = [];

    // Récupérer les mots-clés sélectionnés pour les ustensiles
    const selectedUstensilsList = selectedUstensils.children;
    for (let i = 0; i < selectedUstensilsList.length; i++) {
        const span = selectedUstensilsList[i];
        selectedUstensilsWords.push(span.innerHTML.toLowerCase());
    }

    // Récupérer les mots-clés sélectionnés pour les ingrédients
    const selectedIngredientsList = selectedIngredients.children;
    for (let i = 0; i < selectedIngredientsList.length; i++) {
        const span = selectedIngredientsList[i];
        selectedIngredientsWords.push(span.innerHTML.toLowerCase());
    }

    // Récupérer les mots-clés sélectionnés pour les appareils
    const selectedAppliancesList = selectedAppliances.children;
    for (let i = 0; i < selectedAppliancesList.length; i++) {
        const span = selectedAppliancesList[i];
        selectedAppliancesWords.push(span.innerHTML.toLowerCase());
    }

    const filteredRecipes = [];

    // Filtrer les recettes
    for (let i = 0; i < actualRecipes.length; i++) {
        const recipe = actualRecipes[i];

        let ustensilsMatch = isUstensilInRecipe(selectedUstensilsWords, recipe)
        let ingredientsMatch = isIngredientInRecipe(selectedIngredientsWords, recipe)
        let applianceMatch = isApplianceInRecipe(selectedAppliancesWords, recipe)

        console.log(applianceMatch, ingredientsMatch, ustensilsMatch)

        // Ajouter la recette filtrée si tous les critères sont respectés
        if (ustensilsMatch && ingredientsMatch && applianceMatch) {
            filteredRecipes.push(recipe);
        }
    }

    filtrerCards(filteredRecipes);
    createFilter(filteredRecipes);
}

const mainSearch = document.getElementById('recherche');
mainSearch.addEventListener('keyup', filterRecipes);

function filtrerCards(filteredRecipes) {
    const recherche = document.getElementById('recherche').value.toLowerCase();
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    if (recherche.length >= 3) {
        for (let i = 0; i < filteredRecipes.length; i++) {
            const recipe = filteredRecipes[i];
            if (recipe.name.toLowerCase().includes(recherche) || recipe.description.toLowerCase().includes(recherche) || recipe.appliance.toLowerCase().includes(recherche)) {
                const card = creerCarte(recipe);
                cardContainer.appendChild(card);
            }
        }
    } else {
        for (let i = 0; i < filteredRecipes.length; i++) {
            const recipe = filteredRecipes[i];
            const card = creerCarte(recipe);
            cardContainer.appendChild(card);
        }
    }
}



function createFilter(filters) {
    const uniqueUstensils = new Set();
    const uniqueIngredients = new Set();
    const uniqueAppliances = new Set();

    filterContainerUstensils.innerHTML = '';
    filterContainerIngredients.innerHTML = '';
    filterContainerAppliances.innerHTML = '';


    filters.forEach(filter => {
        if (Array.isArray(filter.ustensils)) {
            filter.ustensils.forEach(word => {
                const trimmedWord = word.trim();
                if (trimmedWord.length > 0) {
                    uniqueUstensils.add(trimmedWord);
                }
            });
        }

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

        if (typeof filter.appliance === 'string') {
            const trimmedAppliance = filter.appliance.trim();
            if (trimmedAppliance.length > 0) {
                uniqueAppliances.add(trimmedAppliance);
            }
        }
    });

    const sortedUstensils = Array.from(uniqueUstensils).sort();
    const sortedIngredients = Array.from(uniqueIngredients).sort();
    const sortedAppliances = Array.from(uniqueAppliances).sort();

    sortedUstensils.forEach(filter => {
        const p = document.createElement('p');
        p.innerHTML = filter;
        filterContainerUstensils.appendChild(p);

        p.addEventListener('click', () => {
            const selectedUstensil = p.innerHTML;
            const span = document.createElement('span');
            span.innerHTML = selectedUstensil;
            selectedUstensils.appendChild(span);
            filterContainerUstensils.removeChild(p);

            span.addEventListener('click', () => {
                selectedUstensils.removeChild(span);
                filterContainerUstensils.appendChild(p);
                filterRecipes();
            });
            filterRecipes();
        });
    });

    sortedIngredients.forEach(filter => {
        const p = document.createElement('p');
        p.innerHTML = filter;
        filterContainerIngredients.appendChild(p);

        p.addEventListener('click', () => {
            const selectedIngredient = p.innerHTML;
            const span = document.createElement('span');
            span.innerHTML = selectedIngredient;
            selectedIngredients.appendChild(span);
            filterContainerIngredients.removeChild(p);

            span.addEventListener('click', () => {
                selectedIngredients.removeChild(span);
                filterContainerIngredients.appendChild(p);
                filterRecipes();
            });
            filterRecipes();
        });
    });

    sortedAppliances.forEach(filter => {
        const p = document.createElement('p');
        p.innerHTML = filter;
        filterContainerAppliances.appendChild(p);

        p.addEventListener('click', () => {
            const selectedAppliance = p.innerHTML;
            const span = document.createElement('span');
            span.innerHTML = selectedAppliance;
            selectedAppliances.appendChild(span);
            filterContainerAppliances.removeChild(p);

            span.addEventListener('click', () => {
                selectedAppliances.removeChild(span);
                filterContainerAppliances.appendChild(p);
                filterRecipes();
            });
            filterRecipes();
        });
    });
}



let actualRecipes = recipes;

createFilter(actualRecipes);

filterContainerUstensils.addEventListener('click', filterRecipes);
filterContainerIngredients.addEventListener('click', filterRecipes);
filterContainerAppliances.addEventListener('click', filterRecipes);
