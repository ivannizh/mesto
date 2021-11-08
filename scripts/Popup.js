export class Popup {
    constructor(selector) {
        this._container = document.querySelector(selector);
    }

    open() {
        this._container.classList.add('popup_opened')

        this._container.addEventListener('click', closePopupOnOverlay);
        document.addEventListener('keydown', closePopupOnEsc);
    }


    close() {
        this._container.classList.remove('popup_opened')

        this._container.removeEventListener('click', this._handleOverlayClose.bind(this));
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }
    _handleOverlayClose(event) {
        if (event.target.classList.contains('popup')) {
            close();
        }
    }

    setEventListeners() {
        // который добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.
        const closeBtn = this._container.querySelector('.popup__close')
        closeBtn.addEventListener('click', this.close.bind(this));
    }
}

