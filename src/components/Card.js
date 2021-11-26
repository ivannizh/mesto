export class Card {

    constructor({_id, likes, owner, name, link}, cardSelector, currentUserPromise, {
        imgClickHandler,
        likeCardHandler,
        deleteCardHandler
    }) {
        this._cardSelector = cardSelector;

        this._id = _id;
        this._likes = likes;
        this._owner = owner;
        this._name = name;
        this._link = link;

        currentUserPromise().then(
            (data) => {
                this._userId = data[0]._id;
                this._showLike();
                this._showDeleteButton();
            }
        )

        this._imgClickHandler = imgClickHandler;
        this._likeCardHandler = likeCardHandler;
        this._deleteCardHandler = deleteCardHandler;

        return this;
    }

    updateLikes(likes) {
        this._likes = likes;
        this._showLike()
    }

    id() {
        return this._id;
    }

    isCardLiked() {
        return this._likes.some(like => like._id === this._userId)
    }

    _showLike() {
        this._likesCounter.textContent = this._likes.length

        if (this.isCardLiked()) {
            this._likeButton.classList.add('card__like_active');
        } else {
            this._likeButton.classList.remove('card__like_active');
        }
    }

    _showDeleteButton() {
        if (this._owner._id === this._userId) {
            this._deleteButton.classList.add('card__delete_active');
        } else {
            this._deleteButton.classList.remove('card__delete_active');
        }
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

        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._deleteButton.addEventListener("click", () => this._deleteCardHandler());
        this._likeButton.addEventListener("click", () => this._likeCardHandler());
        this._img.addEventListener("click", () => this._imgClickHandler(this._link, this._name));
    }

    deleteCard() {
        this._element.remove();
    }

}
