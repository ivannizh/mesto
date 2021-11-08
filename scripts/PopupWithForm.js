import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(selector, submitCallback) {
        super(selector);
    }

    _getInputValues() {

    }

    setEventListeners() {
        // Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
    }

    close() {
        // так как при закрытии попапа форма должна ещё и сбрасываться.
    }
}