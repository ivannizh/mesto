import {iterator} from "core-js/stable/dom-collections";

export class Section {
  constructor(renderedPromise, renderer, selector) {
    this._renderedItems = []
    this._renderer = renderer;

    renderedPromise.then(
        data => {
          this._renderedItems = data;
          this._renderItems();
        }
    ).catch(err => console.log(err))

    this._container = document.querySelector(selector);
  }

  _renderItems() {
    this._renderedItems.forEach((item) =>

          this._container.append(this._renderer(item))

    );
  }

  addItem(item) {
    this._container.prepend(this._renderer(item));
  }
}
