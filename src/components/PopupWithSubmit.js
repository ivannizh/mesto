import {Popup} from "./Popup.js";

export class PopupWithSubmit extends Popup {
    constructor(selector, submitHandler) {
        super(selector);

        this._submitCallback = submitHandler;
        this._button = this._container.querySelector('.popup__button')
    }


    open(card) {
        this._card = card;
        super.open();
    }

    setEventListeners() {
        this._button.addEventListener("click", () => {
            this._submitCallback(this._card);
        });
        super.setEventListeners();
    }

}
