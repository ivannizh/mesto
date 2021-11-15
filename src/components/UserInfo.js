export class UserInfo {

    constructor({ name, occupation }) {
        this._name = name;
        this._occupation = occupation;

        this._name_field = document.querySelector('.profile__name')
        this._occupation_filed = document.querySelector('.profile__occupation')
    }

    getUserInfo() {
        return {
            name: this._name,
            occupation: this._occupation,
        }
    }

    setUserInfo(data) {
        this._name = data.name;
        this._occupation = data.occupation;

        this._setFields()
    }

    _setFields() {
        this._name_field.textContent = this._name;
        this._occupation_filed.textContent = this._occupation;
    }
}