import {Card} from "./Card.js";
import {openPopup, closePopup} from "./utils.js";

const popupEditProfileOpenBtn = document.querySelector('.profile__edit-button')
const popupEditProfile = document.querySelector('.popup_type_profile-edit')
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form')
const popupCloseBtns = document.querySelectorAll('.popup__close')

const popupNewPlaceOpenBtn = document.querySelector('.profile__add-new-place')
const popupEditNewPlace = document.querySelector('.popup_type_new-place')
const popupNewPlaceForm = popupEditNewPlace.querySelector('.popup__form')
const popupNewPlaceSubmitButton = popupNewPlaceForm.querySelector('.popup__button')
const userName = document.querySelector('.profile__name')
const userOccupation = document.querySelector('.profile__occupation')
const inputUserName = popupEditProfile.querySelector('.popup__input_type_name')
const inputUserOccupation = popupEditProfile.querySelector('.popup__input_type_occupation')
const placeNameOnForm = popupEditNewPlace.querySelector('.popup__input_type_place-name')
const placeUrlOnForm = popupEditNewPlace.querySelector('.popup__input_type_place-url')


const cardsArray = document.querySelector('.cards')


function renderInitialCards() {
    initialCards.forEach(function (item) {
        cardsArray.append((new Card(item.name, item.link, '#card')).generateCard())
    })
}

renderInitialCards()

function closePopupEvent(event) {
    closePopup(event.target.closest('.popup'));
}

function openPopupEditForm() {
    inputUserName.value = userName.textContent;
    inputUserOccupation.value = userOccupation.textContent;

    const event = new Event('input', {
        bubbles: true,
        cancelable: true,
    });

    inputUserName.dispatchEvent(event);
    inputUserOccupation.dispatchEvent(event);

    openPopup(popupEditProfile);
}

function openPopupNewPlace() {
    placeNameOnForm.value = '';
    placeUrlOnForm.value = '';

    popupNewPlaceSubmitButton.setAttribute('disabled', true)
    popupNewPlaceSubmitButton.classList.add('popup__button_disabled');

    openPopup(popupEditNewPlace);
}

function submitEditProfileForm(event) {
    event.preventDefault();

    userName.textContent = inputUserName.value;
    userOccupation.textContent = inputUserOccupation.value;

    closePopup(popupEditProfile);
}

function submitNewPlaceForm(event) {
    event.preventDefault();
    cardsArray.prepend((new Card(placeNameOnForm.value, placeUrlOnForm.value, '#card')).generateCard());
    closePopup(popupEditNewPlace);
}

popupEditProfileOpenBtn.addEventListener('click', openPopupEditForm);
popupNewPlaceOpenBtn.addEventListener('click', openPopupNewPlace);
popupEditProfileForm.addEventListener('submit', submitEditProfileForm);
popupNewPlaceForm.addEventListener('submit', submitNewPlaceForm);
popupCloseBtns.forEach(function (btn) {
    btn.addEventListener('click', closePopupEvent);
})