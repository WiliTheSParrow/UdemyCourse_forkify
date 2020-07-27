// Recipe.js
import axios from 'axios';
// axios: Promise based HTTP client for the browser and node.js

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getResults() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.id}`);
            this.result = res.data.recipes;
            // console.log(this.results);
        } catch (error) {
            alert(error);
        }
    }
}