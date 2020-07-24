// MVC - CONTROLLER FILE
import Search from './models/Search';

/* Global state of the app
- Search object
- Current recipe object
- SHopping list object
- Liked recipes */
const state = {};

const controlSearch = () =>{};

document.querySelector('.search').addEventListener('submit', e => {
    // The page automatically reloads, to prevent that: preventDefault();
    e.preventDefault();
    controlSearch();
});

const search = new Search('pizza');
console.log(search);
search.getResults();