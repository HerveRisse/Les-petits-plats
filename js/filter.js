// function isIngredientInRecipe(wordsList, recipe) {
//     let ingredientsMatch = false;
//     if (wordsList.length === 0) {
//         return true;
//     }
//     if (wordsList.length > 0) {
//         const recipeIngredients = recipe.ingredients;
//         for (let j = 0; j < recipeIngredients.length; j++) {
//             const ingredient = recipeIngredients[j].ingredient.toLowerCase();
//             if (wordsList.indexOf(ingredient) >= 0) {
//                 ingredientsMatch = true;
//             }
//         }
//     }
//     return ingredientsMatch
// }

// function isUstensilInRecipe(wordsList, recipe) {
//     let ustensilsMatch = false;
//     if (wordsList.length === 0) {
//         return true;
//     }
//     if (wordsList.length > 0) {
//         const recipeUstensils = recipe.ustensils;
//         for (let j = 0; j < recipeUstensils.length; j++) {
//             const ustensil = recipeUstensils[j].toLowerCase();
//             if (wordsList.indexOf(ustensil) >= 0) {
//                 ustensilsMatch = true;
//             }
//         }
//     }
//     return ustensilsMatch
// }

// function isApplianceInRecipe(wordsList, recipe) {
//     let applianceMatch = false;
//     if (wordsList.length === 0) {
//         return true;
//     }
//     if (wordsList.length > 0) {
//         const appliance = recipe.appliance.toLowerCase();
//         if (wordsList.indexOf(appliance) >= 0) {
//             applianceMatch = true;
//         }
//     }
//     return applianceMatch
// }

// function filterRecipes() {
//     const selectedUstensilsWords = [];
//     const selectedIngredientsWords = [];
//     const selectedAppliancesWords = [];

//     // Récupérer les mots-clés sélectionnés pour les ustensiles
//     const selectedUstensilsList = selectedUstensils.children;
//     for (let i = 0; i < selectedUstensilsList.length; i++) {
//         const span = selectedUstensilsList[i];
//         selectedUstensilsWords.push(span.innerHTML.toLowerCase());
//     }

//     // Récupérer les mots-clés sélectionnés pour les ingrédients
//     const selectedIngredientsList = selectedIngredients.children;
//     for (let i = 0; i < selectedIngredientsList.length; i++) {
//         const span = selectedIngredientsList[i];
//         selectedIngredientsWords.push(span.innerHTML.toLowerCase());
//     }

//     // Récupérer les mots-clés sélectionnés pour les appareils
//     const selectedAppliancesList = selectedAppliances.children;
//     for (let i = 0; i < selectedAppliancesList.length; i++) {
//         const span = selectedAppliancesList[i];
//         selectedAppliancesWords.push(span.innerHTML.toLowerCase());
//     }

//     const filteredRecipes = [];

//     // Filtrer les recettes
//     for (let i = 0; i < actualRecipes.length; i++) {
//         const recipe = actualRecipes[i];

//         let ustensilsMatch = isUstensilInRecipe(selectedUstensilsWords, recipe);
//         let ingredientsMatch = isIngredientInRecipe(selectedIngredientsWords, recipe);
//         let applianceMatch = isApplianceInRecipe(selectedAppliancesWords, recipe);

//         console.log(applianceMatch, ingredientsMatch, ustensilsMatch);

//         // Ajouter la recette filtrée si tous les critères sont respectés
//         if (ustensilsMatch && ingredientsMatch && applianceMatch) {
//             filteredRecipes.push(recipe);
//         }
//     }

//     filtrerCards(filteredRecipes);
//     createFilter(filteredRecipes);
// }




