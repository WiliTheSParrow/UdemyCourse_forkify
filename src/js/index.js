// MVC - CONTROLLER FILE
import Search from './models/Search';
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

const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput();
    console.log(query);

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

document.querySelector('.search').addEventListener('submit', e => {
    // The page automatically reloads, to prevent that: preventDefault();
    e.preventDefault();
    controlSearch();
});