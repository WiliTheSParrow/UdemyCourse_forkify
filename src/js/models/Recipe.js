// Recipe.js
import axios from 'axios';
// axios: Promise based HTTP client for the browser and node.js

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            // this.result = res.data.recipes;
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
}