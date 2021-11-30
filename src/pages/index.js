import "../styles/index.css";

import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {Api} from "../components/Api";
import {PopupWithSubmit} from "../components/PopupWithSubmit.js";
import {
    editAvatarButton,
    inputUserAbout,
    inputUserName,
    popupEditAvatarForm,
    popupEditProfileForm,
    popupEditProfileOpenBtn,
    popupNewPlaceForm,
    popupNewPlaceOpenBtn,
    profileSelectors,
    validationConfig,
} from "../utils/constants";


const api = new Api(
    'https://mesto.nomoreparties.co/v1/cohort-30',
    '8a0021df-e451-4ea1-9a4d-dab486c52595'
)

const getUserInfoPromise = api.getUserInfo();
const getCardsPromise = api.getCards();
let userId = null;

const sectionRenderer = new Section(
    (item) => {
        const card = createCard(item, userId)
        sectionRenderer.addItemToEnd(card.generateCard());
    },
    ".cards"
);

const userInfo = new UserInfo(profileSelectors);

Promise.all([getUserInfoPromise, getCardsPromise])
    .then(([userData, cards]) => {
        userId = userData._id;
        sectionRenderer.renderItems(cards);
        userInfo.setUserInfo(userData)
    })
    .catch(err => console.error(err))


const submitPopup = new PopupWithSubmit(
    ".popup_type_submit",
    (card) => {
        api.deleteCard(card.id())
            .then(() => {
                card.deleteCard();
                submitPopup.close();
            })
            .catch(err => console.error(err))
    });

submitPopup.setEventListeners();

const photoPopup = new PopupWithImage(".popup_type_image");
photoPopup.setEventListeners();

const editAvatarForm = new PopupWithForm(".popup_type_edit-avatar", 'Сохранение...', (data) => {
    editAvatarForm.activateAction(true);
    api.updateAvatar(data.avatarUrl)
        .then((userData) => {
            userInfo.setUserInfo(userData);
            editAvatarForm.close();
        })
        .catch(err => console.error(err))
        .finally(() => editAvatarForm.activateAction(false))
});
editAvatarForm.setEventListeners();
editAvatarButton.addEventListener('click', function () {
    editAvatarForm.open();
});


function createCard(data, userId) {
    const card = new Card(
        data,
        userId,
        "#card",
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
                submitPopup.open(card);
            },
        },
    )
    return card
}


const popupEditProfile = new PopupWithForm(
    ".popup_type_profile-edit",
    'Сохранение...',
    (data) => {
        popupEditProfile.activateAction(true);
        api.updateUserInfo(data)
            .then(res => {
                userInfo.setUserInfo(res);
                popupEditProfile.close();
            })
            .catch(err => console.error(err))
            .finally(() => popupEditProfile.activateAction(false))
    }
);
popupEditProfile.setEventListeners();

const popupNewPlace = new PopupWithForm(".popup_type_new-place", 'Создание...', (data) => {
    popupNewPlace.activateAction(true);
    api.addNewCard({
        name: data.placeName,
        link: data.placeUrl,
    })
        .then(res => {
            sectionRenderer.addItem(createCard(res, userId).generateCard());
            popupNewPlaceForm.reset();
            popupNewPlace.close();
        })
        .catch(err => console.error(err))
        .finally(() => {
            popupNewPlace.activateAction(false);
        })
});
popupNewPlace.setEventListeners();


function openPopupEditForm() {
    const data = userInfo.getUserInfo();
    inputUserName.value = data.name;
    inputUserAbout.value = data.about;

    const event = new Event("input", {
        bubbles: true,
        cancelable: true,
    });

    inputUserName.dispatchEvent(event);
    inputUserAbout.dispatchEvent(event);

    changeProfileFormValidation.toggleButtonState();

    popupEditProfile.open();
}

let newPlaceFormValidation;
let changeProfileFormValidation;
let editAvatarFormValidation;

function openPopupNewPlace() {
    newPlaceFormValidation.toggleButtonState();
    popupNewPlace.open();
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
