export class Popup {
    constructor(selector) {
        this._container = document.querySelector(selector);
        this._closeBtn = this._container.querySelector('.popup__close')

        // debugger
    }

    open() {
        this._container.classList.add('popup_opened')
        // this.setEventListeners()
    }


    close() {
        // debugger
        this._container.classList.remove('popup_opened')

        this._container.removeEventListener('click', this._handleOverlayClose);
        document.removeEventListener('keydown', this._handleEscClose);
        this._closeBtn.removeEventListener('click', this.close);
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }
    _handleOverlayClose(event) {
        // debugger
        if (event.target.classList.contains('popup')) {
            this.close();
        }
    }

    setEventListeners() {
        // debugger
        this._closeBtn.addEventListener('click', this.close.bind(this));
        this._container.addEventListener('click', this._handleOverlayClose.bind(this));
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }
}

