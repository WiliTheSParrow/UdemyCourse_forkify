// MVC - CONTROLLER FILE
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import {
    elements,
    renderLoader,
    clearLoader
} from './views/base';

/* Global state of the app
- Search object
- Current recipe object
- SHopping list object
- Liked recipes */
const state = {};
window.state = state;

// SEARCH CONTROLLER
const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput();
    // console.log(query);
    // const query = 'pizza';

    // If there is a view we want a new search object:
    if (query) {
        // 2) New search object and add to statement
        // We will store this in the global state object:
        state.search = new Search(query);

        // 3) Pre UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4) Search for recipes
            // we have to wait to the call to get back with the data:
            await state.search.getResults();

            // 5) Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert('Something went wrong with the search. 😭');
            clearLoader();
        }
    }
};

elements.searchForm.addEventListener('submit', e => {
    // The page automatically reloads, to prevent that: preventDefault();
    e.preventDefault();
    controlSearch();
});
// TESTING //////////////
/* window.addEventListener('load', e => {
    // The page automatically reloads, to prevent that: preventDefault();
    e.preventDefault();
    controlSearch();
}); */
/////////////////////////

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

// RECIPE CONTROLLER

/* Testing: 
const r = new Recipe(47746);
r.getRecipe();
console.log(r); */

const controlRecipe = async () => {
    // Get ID drom url
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        if (state.search) searchView.highlightSelected(id);

        // Create new recipe object
        state.recipe = new Recipe(id);
        // TESTING////
        //window.r = state.recipe;
        //////

        try {
            // Get recipe data and parse ingredients
            // async will return a promise:
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch (err) {
            alert('Error processing recipe! 😨');
        }
    }
};

/* window.addEventListener('hashchange', conrolRecipe);
window.addEventListener('load', conrolRecipe); */
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// LIST CONTROLLER
const controlList = () => {
    // Create a new list IF there is none yet.
    if (!state.list) state.list = new List();

    // Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
}

// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // Handle the delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from state
        state.list.deleteItem(id);
        // Delete from UI
        listView.deleteItem(id);
    }
});






// Handling recipe btn clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease btn is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredient(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase btn is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredient(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlList();
    }

});

window.l = new List();