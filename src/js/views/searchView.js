import {
    elements
} from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
};

// 'Pasta with tomato and spinach'
// accumulator: 0 / acc + cur.length = 5 / newTitle = ['Pasta']
// accumulator: 5 / acc + cur.length = 9 / newTitle = ['Pasta', 'with']
// accumulator: 9 / acc + cur.length = 15 / newTitle = ['Pasta', 'with', 'tomato']
// accumulator: 15 / acc + cur.length = 18 / newTitle = ['Pasta', 'with', 'tomato', 'and']
// accumulator: 18 / acc + cur.length = 24 / newTitle = ['Pasta', 'with', 'tomato', 'and', 'spinach']
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }

        }, 0);
        //return the result
        return `${newTitle.join(' ')}...`;
    };
    return title;
};

const renderRecipe = recipe => {
    const markup = `<li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>`;

    elements.searchResList.insertAdjacentHTML('beforeend', markup);

};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);
};