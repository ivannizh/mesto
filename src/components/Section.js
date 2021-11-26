export class Section {
    constructor(renderedPromise, renderer, selector) {
        this._renderedItems = []
        this._renderer = renderer;

        renderedPromise
            .then(data => {
                this._renderedItems = data;
                this._renderItems();
            })
            .catch(err => console.error(err))

        this._container = document.querySelector(selector);
    }

    _renderItems() {
        this._renderedItems.forEach((item) => {
                this._renderer(item);
            }
        );
    }

    addItem(item) {
        this._container.prepend(item);
    }
}
