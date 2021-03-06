export class Popup {
    constructor(selector) {
        this._container = document.querySelector(selector);
        this._closeBtn = this._container.querySelector(".popup__close");

        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        document.addEventListener("keydown", this._handleEscClose);
        this._container.classList.add("popup_opened");
    }

    close() {
        this._container.classList.remove("popup_opened");

        document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose(event) {
        if (event.key === "Escape") {
            this.close();
        }
    }

    _handleOverlayClose(event) {
        if (event.target.classList.contains("popup")) {
            this.close();
        }
    }

    setEventListeners() {
        this._closeBtn.addEventListener("click", this.close.bind(this));
        this._container.addEventListener(
            "click",
            this._handleOverlayClose.bind(this)
        );
    }
}
