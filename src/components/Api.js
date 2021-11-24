export class Api {
    constructor(url, token) {
        this._url = url;
        this._token = token;
    }

    getUserInfo() {
        return fetch(
            `${this._url}/users/me`,
            {
                method: 'GET',
                headers: {
                    'Authorization': this._token,
                }
            }).then(r => {
            if (r.ok) {
                return r.json();
            }
            return Promise.reject('Error while fetching user data: ' + r.status);
        })
    }

    getCards() {
        return fetch(
            `${this._url}/cards`,
            {
                method: 'GET',
                headers: {
                    'Authorization': this._token,
                }
            }).then(r => {
            if (r.ok) {
                return r.json();
            }
            return Promise.reject('Error while fetching cards data: ' + r.status);
        })
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
            }).then(r => {
            if (r.ok) {
                return r.json();
            }
            return Promise.reject('Error while updating user info: ' + r.status);
        })
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
            }).then(r => {
            if (r.ok) {
                return r.json();
            }
            return Promise.reject('Error while adding new card: ' + r.status);
        })
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
            }).then(r => {
            if (r.ok) {
                return r.json();
            }
            return Promise.reject('Error while liking card: ' + r.status);
        })
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
            }).then(r => {
            if (r.ok) {
                return r.json();
            }
            return Promise.reject('Error while liking card: ' + r.status);
        })
    }

    deleteCard(cardId) {
        return fetch(
            `${this._url}/cards/${cardId}`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': this._token,
                },
            }).then(r => {
            if (r.ok) {
                return Promise.resolve();
            }
            return Promise.reject('Error while liking card: ' + r.status);
        })
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
            }).then(r => {
            if (r.ok) {
                return Promise.resolve();
            }
            return Promise.reject('Error while liking card: ' + r.status);
        })
    }

}
