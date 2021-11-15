import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);

        this._image = this._container.querySelector('.popup__image');
        this._caption = this._container.querySelector('.popup__image-caption');
        // debugger
    }

    open(link, name) {
        // debugger
        this._image.setAttribute('src', link);
        this._image.setAttribute('alt', name);
        this._caption.textContent = name;

        super.open()
    }
}