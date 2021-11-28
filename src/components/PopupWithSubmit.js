import {Popup} from "./Popup.js";

export class PopupWithSubmit extends Popup {
    constructor(selector, submitHandler) {
        super(selector);

        this._submiCallBack = submitHandler;
        this._button = this._container.querySelector('.popup__button')
    }

    getCard() {
        return this._card;
    }

    open(card) {
        this._card = card;
        super.open();
    }

    setEventListeners() {
        this._button.addEventListener("click", () => {
            this._submitCallback(this._card.id());
        });
        super.setEventListeners();
    }

}
