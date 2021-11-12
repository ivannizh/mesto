// import {openPopup} from "./utils.js";

export class Card {
    constructor( data, handleCardClick) {
        this._cardSelector = data.cardSelector;
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;

        this._popupImage = document.querySelector('.popup_type_image')
        this._popupImageImage = this._popupImage.querySelector('.popup__image')

        return this
    }

    _getTemplate() {
        return document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners()

        const image = this._element.querySelector('.card__img')
        image.setAttribute('src', this._link);
        image.setAttribute('alt', this._name);

        this._element.querySelector('.card__title').textContent = this._name;

        this._like = this._element.querySelector('.card__like')
        this._img = this._element.querySelector('.card__img')

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.card__delete').addEventListener('click', () => {
            this._deleteCardEvent()
        });
        this._element.querySelector('.card__like').addEventListener('click', () => {
            this._toggleLikeEvent()
        });
        this._element.querySelector('.card__img').addEventListener('click', () => {
            this._handleCardClick(this._link, this._name)
        });
    }

    // _openImagePopup() {
    //     this._popupImageImage.setAttribute('src', this._link);
    //     this._popupImageImage.setAttribute('alt', this._name);
    //     this._popupImage.querySelector('.popup__image-caption').textContent = this._name;
    //
    //     openPopup(this._popupImage);
    // }

    _deleteCardEvent() {
        this._element.querySelector('.card__delete').removeEventListener('click', this._deleteCardEvent);
        this._like.removeEventListener('click', this._toggleLikeEvent);
        this._img.removeEventListener('click', this._openImagePopup);
        this._element.remove();
    }

    _toggleLikeEvent() {
        this._like.classList.toggle('card__like_active')
    }
}