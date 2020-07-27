export default class Likes {
    constructor() {
        this.likes = [];
    }

    addItem(id, title, author, img) {
        const like = {
            id,
            title,
            author,
            img
        };
        this.likes.push(like);
        return like;
    }

    deleteItem(id) {
        const index = this.likes.findIndex(el => el.id === id);
        return this.likes.splice(index, 1);
    }

}