import {Popup} from "./Popup.js";

export class PopupWithSubmit extends Popup {
    constructor(selector) {
        super(selector);

        this._button = this._container.querySelector('.popup__button')
    }

    setSubmitCallback(submitCallback) {
        this._submitCallback = submitCallback;
    }

    setEventListeners() {
        this._button.addEventListener("click", () => {
            this._submitCallback();
            this.close();
        });
        super.setEventListeners();
    }

}
