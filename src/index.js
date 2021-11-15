import './styles/index.css';

import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { initialCards } from "./scripts/initial-сards.js";

const popupEditProfileOpenBtn = document.querySelector('.profile__edit-button')
const popupEditProfile = document.querySelector('.popup_type_profile-edit')
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form')

const popupNewPlaceOpenBtn = document.querySelector('.profile__add-new-place')
const popupEditNewPlace = document.querySelector('.popup_type_new-place')
const popupNewPlaceForm = popupEditNewPlace.querySelector('.popup__form')

const inputUserName = popupEditProfile.querySelector('.popup__input_type_name')
const inputUserOccupation = popupEditProfile.querySelector('.popup__input_type_occupation')
const placeNameOnForm = popupEditNewPlace.querySelector('.popup__input_type_place-name')
const placeUrlOnForm = popupEditNewPlace.querySelector('.popup__input_type_place-url')

const sectionRenderer = new Section({
    items: initialCards,
    renderer: (item) => (new Card({
        name: item.name,
        link: item.link,
        cardSelector: '#card'
    }, photoPopup.open.bind(photoPopup))).generateCard()
}, '.cards')


const photoPopup = new PopupWithImage('.popup_type_image');
photoPopup.setEventListeners()

const userInfo = new UserInfo({
    name: 'Жак-Ив Кусто',
    occupation: 'Исследователь океана',
})

const editProfileForm = new PopupWithForm('.popup_type_profile-edit', (data) => {
    userInfo.setUserInfo(data);
})

editProfileForm.setEventListeners();
const newPlaceForm = new PopupWithForm('.popup_type_new-place', (data) => {
    const item = {
        name: data.place_name,
        link: data.place_url,
    }
    sectionRenderer.addItem(item);
})
newPlaceForm.setEventListeners();

let changeProfileFormValidation = undefined
let newPlaceFormValidation = undefined

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

sectionRenderer.renderItems();


function openPopupEditForm() {
    const data = userInfo.getUserInfo()
    inputUserName.value = data.name;
    inputUserOccupation.value = data.occupation;

    const event = new Event('input', {
        bubbles: true,
        cancelable: true,
    });

    inputUserName.dispatchEvent(event);
    inputUserOccupation.dispatchEvent(event);

    editProfileForm.open();
}

function openPopupNewPlace() {
    placeNameOnForm.value = '';
    placeUrlOnForm.value = '';

    newPlaceFormValidation.disableSubmitBtn()
    newPlaceForm.open();
}

const enableFormValidation = () => {
    changeProfileFormValidation = new FormValidator(validationConfig, popupEditProfileForm)
    changeProfileFormValidation.enableValidation()

    newPlaceFormValidation = new FormValidator(validationConfig, popupNewPlaceForm)
    newPlaceFormValidation.enableValidation()
};
enableFormValidation();

popupEditProfileOpenBtn.addEventListener('click', openPopupEditForm);
popupNewPlaceOpenBtn.addEventListener('click', openPopupNewPlace);