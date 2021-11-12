import {Card} from "./Card.js";
// import {closePopup, openPopup} from "./utils.js";
import {FormValidator} from "./FormValidator.js";
import Section from "./Section.js";
import {PopupWithImage} from "./PopupWithImage.js";

const popupPhotosSelector = '.popup_type_image';

const popupEditProfileOpenBtn = document.querySelector('.profile__edit-button')
const popupEditProfile = document.querySelector('.popup_type_profile-edit')
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form')
// const popupCloseBtns = document.querySelectorAll('.popup__close')

const popupNewPlaceOpenBtn = document.querySelector('.profile__add-new-place')
const popupEditNewPlace = document.querySelector('.popup_type_new-place')
const popupNewPlaceForm = popupEditNewPlace.querySelector('.popup__form')
const userName = document.querySelector('.profile__name')
const userOccupation = document.querySelector('.profile__occupation')
const inputUserName = popupEditProfile.querySelector('.popup__input_type_name')
const inputUserOccupation = popupEditProfile.querySelector('.popup__input_type_occupation')
const placeNameOnForm = popupEditNewPlace.querySelector('.popup__input_type_place-name')
const placeUrlOnForm = popupEditNewPlace.querySelector('.popup__input_type_place-url')

const photoPopup = new PopupWithImage(popupPhotosSelector);

const sectionRenderer = new Section({
    items: initialCards,
    renderer: (item) => (new Card({name: item.name, link:item.link, cardSelector:'#card'}, photoPopup.open)).generateCard()
}, '.cards')

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

// function closePopupEvent(event) {
//     closePopup(event.target.closest('.popup'));
// }

function openPopupEditForm() {
    inputUserName.value = userName.textContent;
    inputUserOccupation.value = userOccupation.textContent;

    const event = new Event('input', {
        bubbles: true,
        cancelable: true,
    });

    inputUserName.dispatchEvent(event);
    inputUserOccupation.dispatchEvent(event);

    // openPopup(popupEditProfile);
}

function openPopupNewPlace() {
    placeNameOnForm.value = '';
    placeUrlOnForm.value = '';

    newPlaceFormValidation.disableSubmitBtn()

    // openPopup(popupEditNewPlace);
}

function submitEditProfileForm(event) {
    event.preventDefault();

    userName.textContent = inputUserName.value;
    userOccupation.textContent = inputUserOccupation.value;

    // closePopup(popupEditProfile);
}

function submitNewPlaceForm(event) {
    event.preventDefault();
    const item = {
        name: placeNameOnForm.value,
        link: placeUrlOnForm.value,
    }
    sectionRenderer.addItem(item);
    // closePopup(popupEditNewPlace);
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
popupEditProfileForm.addEventListener('submit', submitEditProfileForm);
popupNewPlaceForm.addEventListener('submit', submitNewPlaceForm);
// popupCloseBtns.forEach(function (btn) {
//     btn.addEventListener('click', closePopupEvent);
// })