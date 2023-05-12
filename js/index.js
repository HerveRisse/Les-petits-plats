
function afficherCarte() {
    const carte = document.getElementById('carte');
    carte.innerHTML = '';
    recipes.forEach(recipe => {
        const name = document.createElement('h2');
        name.innerHTML = recipe.name;
        const time = document.createElement('strong');
        time.innerHTML = recipe.time;

        const div = document.createElement('div');
        div.innerHTML = '';
        const ingredient = document.createElement('p');
        ingredient.innerHTML = recipe.ingredients.ingredient + recipe.ingredients.quantity + recipe.ingredients.unit;
        console.log(recipe.ingredients.ingredient)
        carte.appendChild(name);
        carte.appendChild(time);
        carte.appendChild(div);
        div.appendChild(ingredient)

    });
}

console.log(recipes.ingredients);

function filtrerCards() {
    const recherche = document.getElementById('recherche').value.toLowerCase();
    if (recherche.length >= 3) {
        const recipesFiltres = recipes.filter(recipe => recipe.name.toLowerCase().includes(recherche));
        const carte = document.getElementById('carte');
        carte.innerHTML = '';
        recipesFiltres.forEach(recipe => {
            const div = document.createElement('div');
            div.innerHTML = recipe.id + ' ' + recipe.name;
            carte.appendChild(div);
        });
    } else {
        afficherCarte();
    }
}

afficherCarte();

const input = document.getElementById('recherche');
input.addEventListener('keyup', filtrerCards);



