//Search.js: search query and search results.
import axios from 'axios';
// axios: Promise based HTTP client for the browser and node.js
export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResults() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
            this.result = res.data.recipes;
        } catch (error) {
            console.log(error);
        }
    }
}