import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, submitCallback) {
    super(selector);

    this._form = this._container.querySelector(".popup__form");
    this._submitCallback = submitCallback;
    this._allInputs = this._form.querySelectorAll(".popup__input");
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
      this._submitCallback(data);
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
