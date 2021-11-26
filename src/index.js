import "./styles/index.css";

import {Card} from "./components/Card.js";
import {FormValidator} from "./components/FormValidator.js";
import {Section} from "./components/Section.js";
import {PopupWithImage} from "./components/PopupWithImage.js";
import {PopupWithForm} from "./components/PopupWithForm.js";
import {UserInfo} from "./components/UserInfo.js";
import {Api} from "./components/Api";
import {PopupWithSubmit} from "./components/PopupWithSubmit.js";
import {
    editAvatarButton,
    inputUserabout,
    inputUserName,
    placeNameOnForm,
    placeUrlOnForm,
    popupEditAvatarForm,
    popupEditProfileForm,
    popupEditProfileOpenBtn,
    popupNewPlaceForm,
    popupNewPlaceOpenBtn,
    validationConfig,
} from "./scripts/constants";


const api = new Api(
    'https://mesto.nomoreparties.co/v1/cohort-30',
    '8a0021df-e451-4ea1-9a4d-dab486c52595'
)

const getUserInfoPromise = api.getUserInfo();
const getCardsPromise = api.getCards();

const userInfo = new UserInfo(getUserInfoPromise);

const submitPopup = new PopupWithSubmit(".popup_type_submit");
submitPopup.setEventListeners();

const photoPopup = new PopupWithImage(".popup_type_image");
photoPopup.setEventListeners();

const editAvatarForm = new PopupWithForm(".popup_type_edit-avatar", 'Сохранение...', (data) => {
    editAvatarForm.activateAction(true);
    api.updateAvatar(data.avatar_url)
        .then(() => userInfo.setNewAvatar(data.avatar_url))
        .catch(err => console.error(err))
        .finally(() => editAvatarForm.activateAction(false))
});
editAvatarForm.setEventListeners();
editAvatarButton.addEventListener('click', function () {
    editAvatarForm.open();
});


function getNewCard(data) {
    const card = new Card(
        data,
        "#card",
        () => {
            return Promise.all([
                getUserInfoPromise,
                getCardsPromise
            ])
        },
        {
            imgClickHandler: (name, link) => {
                photoPopup.open(name, link);
            },
            likeCardHandler: () => {
                const isCardLiked = card.isCardLiked()
                const likePromise = isCardLiked ? api.unlikeCard(card.id()) : api.likeCard(card.id())

                likePromise
                    .then(data => card.updateLikes(data.likes))
                    .catch(err => console.error(err))
            },
            deleteCardHandler: () => {
                submitPopup.setSubmitCallback(() => {
                    api.deleteCard(card.id())
                        .then(() => card.deleteCard())
                        .catch(err => console.error(err))
                });
                submitPopup.open();
            },
        },
    )
    return card
}

const sectionRenderer = new Section(
    getCardsPromise,
    (item) => {
        const card = getNewCard(item)
        sectionRenderer.addItem(card.generateCard());
    },
    ".cards"
);

const editProfileForm = new PopupWithForm(
    ".popup_type_profile-edit",
    'Сохранение...',
    (data) => {
        editProfileForm.activateAction(true);
        api.updateUserInfo(data)
            .then(res => userInfo.setUserInfo(res))
            .catch(err => console.error(err))
            .finally(() => editProfileForm.activateAction(false))
    }
);
editProfileForm.setEventListeners();

const newPlaceForm = new PopupWithForm(".popup_type_new-place", 'Создание...', (data) => {
    newPlaceForm.activateAction(true);
    api.addNewCard({
        name: data.place_name,
        link: data.place_url,
    })
        .then(res => sectionRenderer.addItem(getNewCard(res).generateCard()))
        .catch(err => console.error(err))
        .finally(() => {
            newPlaceForm.activateAction(false);
        })
});
newPlaceForm.setEventListeners();


function openPopupEditForm() {
    const data = userInfo.getUserInfo();
    inputUserName.value = data.name;
    inputUserabout.value = data.about;

    const event = new Event("input", {
        bubbles: true,
        cancelable: true,
    });

    inputUserName.dispatchEvent(event);
    inputUserabout.dispatchEvent(event);

    editProfileForm.open();
}

let newPlaceFormValidation;
let changeProfileFormValidation;
let editAvatarFormValidation;

function openPopupNewPlace() {
    placeNameOnForm.value = "";
    placeUrlOnForm.value = "";

    newPlaceFormValidation.disableSubmitBtn();
    newPlaceForm.open();
}

const enableFormValidation = () => {
    changeProfileFormValidation = new FormValidator(validationConfig, popupEditProfileForm);
    changeProfileFormValidation.enableValidation();

    newPlaceFormValidation = new FormValidator(validationConfig, popupNewPlaceForm);
    newPlaceFormValidation.enableValidation();

    editAvatarFormValidation = new FormValidator(validationConfig, popupEditAvatarForm);
    editAvatarFormValidation.enableValidation();
};
enableFormValidation();

popupEditProfileOpenBtn.addEventListener("click", openPopupEditForm);
popupNewPlaceOpenBtn.addEventListener("click", openPopupNewPlace);
