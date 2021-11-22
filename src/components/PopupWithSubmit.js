import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
  constructor(selector, submitCallback) {
    super(selector);

    this._submitCallback = submitCallback;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._submitCallback();
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    super.close();
  }
}
