export class UserInfo {
    constructor() {
        this._name = '';
        this._about = '';
        this._avaterURL = '';
        this._id = '';

        this._nameField = document.querySelector(".profile__name");
        this._aboutFiled = document.querySelector(".profile__about");
        this._avatar = document.querySelector(".profile__avatar");
    }

    getUserInfo() {
        return {
            name: this._name,
            about: this._about,
            _id: this._id,
        };
    }


    setUserInfo({ name, about, avatar, _id }) {
        this._name = name;
        this._about = about;
        this._id = _id;
        this._avaterURL = avatar;

        this._setFields();
    }

    _setFields() {
        this._nameField.textContent = this._name;
        this._aboutFiled.textContent = this._about;
        this._avatar.setAttribute('src', this._avaterURL);
    }
}
