export class Section {
    constructor(renderedPromise, renderer, selector) {
        this._renderedItems = []
        this._renderer = renderer;
        this._cards = []

        renderedPromise.then(
            data => {
                console.log('DAAAATA', data);
                this._renderedItems = data;
                this._renderItems();
            }
        ).catch(err => console.log(err))

        this._container = document.querySelector(selector);
    }

    _renderItems() {
        this._renderedItems.forEach((item) => {
                const card = this._renderer(item);
                this._cards.push(card);
                this._container.append(card);
            }
        );
        // debugger
    }

    updateDelete(currentUserId) {
        console.log('in updateDelete, this._renderedItems len is ', this._renderedItems.length)
        this._cards.forEach(card => card.updateDelete(currentUserId))
    }

    addItem(item) {
        this._container.prepend(this._renderer(item));
    }
}
