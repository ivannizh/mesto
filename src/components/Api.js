export class Api {
    constructor(url, token) {
        this._url = url;
        this._token = token;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Error while fetching data: ${r.status}`);
        }
        return res.json();
    }

    getUserInfo() {
        return fetch(
            `${this._url}/users/me`,
            {
                method: 'GET',
                headers: {
                    'Authorization': this._token,
                }
            })
            .then(this._getResponseData)
    }

    getCards() {
        return fetch(
            `${this._url}/cards`,
            {
                method: 'GET',
                headers: {
                    'Authorization': this._token,
                }
            })
            .then(this._getResponseData)
    }

    updateUserInfo({name, about}) {
        return fetch(
            `${this._url}/users/me`,
            {
                method: 'PATCH',
                headers: {
                    'Authorization': this._token,
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        name: name,
                        about: about,
                    }
                )
            })
            .then(this._getResponseData)
    }

    addNewCard({name, link}) {
        return fetch(
            `${this._url}/cards`,
            {
                method: 'POST',
                headers: {
                    'Authorization': this._token,
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        name: name,
                        link: link,
                    }
                )
            })
            .then(this._getResponseData)
    }

    likeCard(cardId) {
        return fetch(
            `${this._url}/cards/likes/${cardId}`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': this._token,
                    'Content-type': 'application/json',
                },
            })
            .then(this._getResponseData)
    }

    unlikeCard(cardId) {
        return fetch(
            `${this._url}/cards/likes/${cardId}`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': this._token,
                    'Content-type': 'application/json',
                },
            })
            .then(this._getResponseData)
    }

    deleteCard(cardId) {
        return fetch(
            `${this._url}/cards/${cardId}`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': this._token,
                },
            })
            .then(this._getResponseData)
    }

    updateAvatar(newURL) {
        return fetch(
            `${this._url}/users/me/avatar`,
            {
                method: 'PATCH',
                headers: {
                    'Authorization': this._token,
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        avatar: newURL,
                    }
                )
            })
            .then(this._getResponseData)
    }
}
