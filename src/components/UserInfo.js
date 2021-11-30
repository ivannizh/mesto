export class UserInfo {
    constructor({nameSelector, aboutSelector, avatarSelector}) {
        this._name = '';
        this._about = '';
        this._avatarURL = '';
        this._id = '';

        this._nameField = document.querySelector(nameSelector);
        this._aboutFiled = document.querySelector(aboutSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._name,
            about: this._about,
            _id: this._id,
        };
    }


    setUserInfo({name, about, avatar, _id}) {
        this._name = name;
        this._about = about;
        this._id = _id;
        this._avatarURL = avatar;

        this._setFields();
    }

    _setFields() {
        this._nameField.textContent = this._name;
        this._aboutFiled.textContent = this._about;
        this._avatar.setAttribute('src', this._avatarURL);
    }
}
