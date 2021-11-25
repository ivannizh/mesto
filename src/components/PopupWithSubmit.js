import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
  constructor(selector) {
    super(selector);

    this._button = this._container.querySelector('.popup__button')
  }

  setSubmitCallback(submitCallback) {
    this._submitCallback = submitCallback;
  }

  _handleEnterClose(event) {
    console.log(event.key);
    if (event.key === "Enter") {
      console.log('event.key');
      console.log(this);
      this._submitCallback();
      this.close();
    }
  }

  setEventListeners() {
    this._button.addEventListener("click", (event) => {
      this._submitCallback();
      this.close();
    });
    super.setEventListeners();
  }

  open() {
    document.addEventListener("keydown", this._handleEnterClose.bind(this));
    super.open();
  }

  close() {
    document.removeEventListener("keydown", this._handleEnterClose.bind(this));
    super.close();
  }
}
