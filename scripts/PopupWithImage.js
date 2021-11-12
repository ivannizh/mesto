import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);

        this._image = this._container.querySelector('.popup__image');
        this._caption = this._container.querySelector('.popup__image-caption');
        debugger
    }

    open(link, name) {
        this._image.setAttribute('src', this._link);
        this._image.setAttribute('alt', this._name);
        this._caption.textContent = this._name;
    }
}