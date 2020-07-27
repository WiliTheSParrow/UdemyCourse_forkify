// MVC - CONTROLLER FILE
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
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

// SEARCH CONTROLLER
const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput();
    // console.log(query);

    // If there is a view we want a new search object:
    if (query) {
        // 2) New search object and add to statement
        // We will store this in the global state object:
        state.search = new Search(query);

        // 3) Pre UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        // 4) Search for recipes
        // we have to wait to the call to get back with the data:
        await state.search.getResults();

        // 5) Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }
};

elements.searchForm.addEventListener('submit', e => {
    // The page automatically reloads, to prevent that: preventDefault();
    e.preventDefault();
    controlSearch();
});

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

const conrolRecipe = async () => {
    // Get ID drom url
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        // Prepare UI for changes

        // Create new recipe object
        state.recipe = new Recipe(id);

        // Get recipe data
        // asybc will return a promise:
        await state.recipe.getRecipe();

        // Calculate servings and time
        state.recipe.calcTime();
        state.recipe.calcServings();
        // Render recipe
        console.log(state.recipe);
    }
};
window.addEventListener('hashchange', conrolRecipe);