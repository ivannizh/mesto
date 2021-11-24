import "./styles/index.css";

import {Card} from "./components/Card.js";
import {FormValidator} from "./components/FormValidator.js";
import {Section} from "./components/Section.js";
import {PopupWithImage} from "./components/PopupWithImage.js";
import {PopupWithForm} from "./components/PopupWithForm.js";
import {UserInfo} from "./components/UserInfo.js";

import {
    inputUserabout,
    inputUserName,
    placeNameOnForm,
    placeUrlOnForm,
    popupEditProfileForm,
    popupEditProfileOpenBtn,
    popupNewPlaceForm,
    popupNewPlaceOpenBtn,
    editAvatarButton,
    popupEditAvatarForm,
} from "./scripts/constants";
import {Api} from "./components/Api";
import {PopupWithSubmit} from "./components/PopupWithSubmit.js";
// Испрваить добавление новой карточки
const api = new Api(
    'https://mesto.nomoreparties.co/v1/cohort-30',
    '8a0021df-e451-4ea1-9a4d-dab486c52595'
)

const submitPopup = new PopupWithSubmit(".popup_type_submit");
submitPopup.setEventListeners();

const getUserInfoPromise = api.getUserInfo();
const getCardsPromise = api.getCards();

const userInfo = new UserInfo(getUserInfoPromise);

const photoPopup = new PopupWithImage(".popup_type_image");
photoPopup.setEventListeners();



const editAvatarForm = new PopupWithForm(".popup_type_edit-avatar", (data) => {
    api.updateAvatar(data.avatar_url).then(() => userInfo.setNewAvatar(data.avatar_url)).catch(err => console.log(err))
});

editAvatarForm.setEventListeners();
editAvatarButton.addEventListener('click', function () {editAvatarForm.open();});

const sectionRenderer = new Section(
    getCardsPromise,
    (item) => {
        const card = new Card(
            item,
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

                    likePromise.then(
                        (data) => {
                            card.updateLikes(data.likes);
                        }
                    )
                },
                deleteCardHandler: () => {
                    submitPopup.setSubmitCallback(() => {
                        api.deleteCard(card.id()).then(() => {
                            card.deleteCard();
                        })
                    });
                    submitPopup.open();
                },
            },
        )
        sectionRenderer.addItem(card.generateCard());
    },
    ".cards"
);

const editProfileForm = new PopupWithForm(
    ".popup_type_profile-edit",
    (data) => {
        api.updateUserInfo(data).then(
            res => userInfo.setUserInfo(res)
        )
    }
);

editProfileForm.setEventListeners();
const newPlaceForm = new PopupWithForm(".popup_type_new-place", (data) => {

    api.addNewCard({
        name: data.place_name,
        link: data.place_url,
    }).then(res => sectionRenderer.addItem(res)).catch(err => console.log(err))
});

newPlaceForm.setEventListeners();

// let changeProfileFormValidation = undefined;
// let newPlaceFormValidation = undefined;

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};

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

let newPlaceFormValidation = undefined;

function openPopupNewPlace() {
    placeNameOnForm.value = "";
    placeUrlOnForm.value = "";

    newPlaceFormValidation.disableSubmitBtn();
    newPlaceForm.open();
}

const enableFormValidation = () => {
    const changeProfileFormValidation = new FormValidator(
        validationConfig,
        popupEditProfileForm
    );
    changeProfileFormValidation.enableValidation();

    newPlaceFormValidation = new FormValidator(
        validationConfig,
        popupNewPlaceForm
    );
    newPlaceFormValidation.enableValidation();

    const  editAvatarFormValidation = new FormValidator(
        validationConfig,
        popupEditAvatarForm
    );

    editAvatarFormValidation.enableValidation();
};
enableFormValidation();

popupEditProfileOpenBtn.addEventListener("click", openPopupEditForm);
popupNewPlaceOpenBtn.addEventListener("click", openPopupNewPlace);
