import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(selector, loadingButtonText, handleFormSubmit) {
        super(selector);

        this._form = this._container.querySelector(".popup__form");
        this._handleFormSubmit = handleFormSubmit;
        this._allInputs = this._form.querySelectorAll(".popup__input");
        this._submitBtn = this._form.querySelector(".popup__button")
        this._originalButtonText = this._submitBtn.textContent;
        this._loadingButtonText = loadingButtonText;
    }

    activateAction(toggle) {
        this._submitBtn.textContent = toggle ? this._loadingButtonText : this._originalButtonText;
    }

    _getInputValues() {
        const data = {};
        this._allInputs.forEach((input) => {
            data[input.name] = input.value;
        });
        return data;
    }

    setEventListeners() {
        this._form.addEventListener("submit", (event) => {
            event.preventDefault();
            const data = this._getInputValues();
            this._handleFormSubmit(data);
        });
        super.setEventListeners();
    }

    close() {
        super.close();
    }
}
