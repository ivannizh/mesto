import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);

        this._image = this._container.querySelector(".popup__image");
        this._caption = this._container.querySelector(".popup__image-caption");
    }

    close() {
        super.close();

        this._image.setAttribute("src", '');
        this._image.setAttribute("alt", '');
    }

    open(link, name) {
        this._image.setAttribute("src", link);
        this._image.setAttribute("alt", name);
        this._caption.textContent = name;

        super.open();
    }
}
