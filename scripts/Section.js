class Section {
    constructor({items, renderer}, selector) {
        this._items = items;
        this._renderer = renderer;
        this._selector = selector;

        this._element = document.querySelector(selector);
    }
    renderItems() {
        this._items.forEach((item) => {
            this.renderer(item);
        })
    }
    addItem(newElement) {
        this._items.push(newElement);
        this.renderItems();
    }
}

export default Section;