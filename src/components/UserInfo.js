export class UserInfo {
    constructor(dataPromise, sectionRenderer) {
        this._name = '';
        this._about = '';
        this._avaterURL = '';
        this._id = '';
        this._sectionRenderer = sectionRenderer;
        this._userInfoIsRecieved = false

        this._dataPromise = dataPromise;
        this._dataPromise.then(data => {
            // console.log(data)
            this._avaterURL = data.avatar;
            this.setUserInfo(data);
            this.setUserAvatar();

            // console.log('this._id', this._id)
            console.log('Recieve data for user')
            // this._sectionRenderer.updateDelete(this._id);

            this._userInfoIsRecieved = true;
        }).catch(err => {
            console.log(err)
        })

        this._nameField = document.querySelector(".profile__name");
        this._aboutFiled = document.querySelector(".profile__about");
        this._avatar = document.querySelector(".profile__avatar");
    }

    getUserInfoPromise() {
        return new Promise(function (resolve, _) {
            console.log('In getUserInfoPromise')
            resolve(this._dataPromise);
        })
    }

    setNewAvatar(newURL) {
        this._avaterURL = newURL;
        this.setUserAvatar();
    }


    getUserInfo() {
        return {
            name: this._name,
            about: this._about,
            _id: this._id,
        };
    }

    setUserAvatar() {
        this._avatar.setAttribute('src', this._avaterURL);
    }

    setUserInfo(data) {
        this._name = data.name;
        this._about = data.about;
        this._id = data._id;

        this._setFields();
    }

    _setFields() {
        this._nameField.textContent = this._name;
        this._aboutFiled.textContent = this._about;
    }
}
