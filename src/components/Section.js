export class Section {
    constructor(renderer, selector) {
        this._renderedItems = []
        this._renderer = renderer;

        this._container = document.querySelector(selector);
    }

    renderItems(data) {
        this._renderedItems = data;
        this._renderedItems.forEach(
            (item) => {
                this._renderer(item);
            }
        );
    }

    addItem(item) {
        this._container.prepend(item);
    }

    addItemToEnd(item) {
        this._container.append(item);
    }
}
