export class UserInfo {
  constructor({ name, occupation }) {
    this._name = name;
    this._occupation = occupation;

    this._nameField = document.querySelector(".profile__name");
    this._occupationFiled = document.querySelector(".profile__occupation");
  }

  getUserInfo() {
    return {
      name: this._name,
      occupation: this._occupation,
    };
  }

  setUserInfo(data) {
    this._name = data.name;
    this._occupation = data.occupation;

    this._setFields();
  }

  _setFields() {
    this._nameField.textContent = this._name;
    this._occupationFiled.textContent = this._occupation;
  }
}
