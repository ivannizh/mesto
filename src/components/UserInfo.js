export class UserInfo {
  constructor(dataPromise) {
    this._name = '';
    this._about = '';
    this._avaterURL = '';

    dataPromise.then(data => {
      console.log(data)
      this.setUserInfo(data);
      this.setUserAvatar(data.avatar);
    }).catch(err => {
      console.log(err)
    })

    this._nameField = document.querySelector(".profile__name");
    this._aboutFiled = document.querySelector(".profile__about");
    this._avatar = document.querySelector(".profile__avatar");
  }

  getUserInfo() {
    return {
      name: this._name,
      about: this._about,
    };
  }

  setUserAvatar(url) {
    this._avatar.setAttribute('src', url);
  }

  setUserInfo(data) {
    this._name = data.name;
    this._about = data.about;

    this._setFields();
  }

  _setFields() {
    this._nameField.textContent = this._name;
    this._aboutFiled.textContent = this._about;
  }
}
