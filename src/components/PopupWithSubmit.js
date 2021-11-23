import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
  constructor(selector) {
    super(selector);

    this._button = this._container.querySelector('.popup__button')
  }

  setSubmitCallback(submitCallback) {
    this._submitCallback = submitCallback;
  }

  setEventListeners() {
    this._button.addEventListener("click", (event) => {
      this._submitCallback();
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    super.close();
  }
}
