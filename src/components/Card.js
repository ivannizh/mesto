export class Card {

    constructor({_id, likes, owner, name, link}, cardSelector, {imgClickHandler, likeCardHandler, deleteCardHandler}) {
        this._cardSelector = cardSelector;

        this._id = _id;
        this._likes = likes;
        this._owner = owner;
        this._name = name;
        this._link = link;


        this._imgClickHandler = imgClickHandler;
        this._likeCardHandler = likeCardHandler;
        this._deleteCardHandler = deleteCardHandler;

        return this;
    }

    _getTemplate() {
        return document
            .querySelector(this._cardSelector)
            .content.querySelector(".card")
            .cloneNode(true);
    }

    generateCard() {
        this._element = this._getTemplate();

        this._title = this._element.querySelector(".card__title");
        this._img = this._element.querySelector(".card__img");
        this._likesCounter = this._element.querySelector(".card__like-counts");
        this._deleteButton = this._element.querySelector(".card__delete");
        this._likeButton = this._element.querySelector(".card__like");

        this._img.setAttribute("src", this._link);
        this._img.setAttribute("alt", this._name);

        this._title.textContent = this._name;
        this._likesCounter.textContent = this._likes.length

        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._deleteButton.addEventListener("click", () => this._deleteCardHandler());
        this._likeButton.addEventListener("click", () => this._likeCardHandler());
        this._img.addEventListener("click", () => this._imgClickHandler(this._link, this._name));
    }

    _deleteCard() {
        // this._element
        //     .querySelector(".card__delete")
        //     .removeEventListener("click", this._deleteCardEvent);
        // this._like.removeEventListener("click", this._toggleLikeEvent);
        this._element.remove();
    }

    // _toggleLikeEvent() {
    //     this._like.classList.toggle("card__like_active");
    // }

    // updateDelete(currentUserId) {
    //     console.log('this._owner._id', this._owner._id, 'currentUserId', currentUserId, this._owner._id === currentUserId)
    //     if (this._owner._id === currentUserId) {
    //         this._deleteIcon.classList.add('_deleteIcon');
    //     }
    // }
}
