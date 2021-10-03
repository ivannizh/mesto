const popupEditProfile = document.querySelector('.popup_type_profile-edit')
const popupEditNewPlace = document.querySelector('.popup_type_new-place ')
const popupEditProfileOpenBtn = document.querySelector('.profile__edit-button')
const popupNewPlaceOpenBtn = document.querySelector('.profile__add-new-place')
const popupCloseBtns = document.querySelectorAll('.popup__close')
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form')
const popupNewPlaceForm = popupEditNewPlace.querySelector('.popup__form')

const fioOnPage = document.querySelector('.profile__name')
const occupationOnPage = document.querySelector('.profile__occupation')

const fioOnForm = popupEditProfile.querySelector('.popup__input_type_name')
const occupationOnForm = popupEditProfile.querySelector('.popup__input_type_occupation')

const placeNameOnForm = popupEditNewPlace.querySelector('.popup__input_type_place_name')
const placeUrlOnForm = popupEditNewPlace.querySelector('.popup__input_type_place_url')

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const cardTemplate = document.querySelector('#card').content.querySelector('.card');
let cardsArray = document.querySelector('.cards')

function beforeRender() {
    initialCards.forEach(function (item) {
        const card = cardTemplate.cloneNode(true);
        card.querySelector('.card__title').textContent = item.name;
        card.querySelector('.card__img').setAttribute('src', item.link);
        card.querySelector('.card__img').setAttribute('alt', item.name);

        cardsArray.append(card)
    })
}

beforeRender()

function closePopup(event) {
    event.target.closest('.popup').classList.remove('popup_opened')
}

function openPopupEditForm() {
    fioOnForm.value = fioOnPage.textContent
    occupationOnForm.value = occupationOnPage.textContent

    popupEditProfileForm.closest('.popup').classList.add('popup_opened')
}

function openPopupNewPlace() {
    popupEditNewPlace.closest('.popup').classList.add('popup_opened')
}

function formEditProfileSubmitHandler(event) {
    event.preventDefault()

    fioOnPage.textContent = fioOnForm.value
    occupationOnPage.textContent = occupationOnForm.value

    closePopup(event)
}

function formNewPlaceSubmitHandler(event) {
    event.preventDefault()

    const card = cardTemplate.cloneNode(true);
    card.querySelector('.card__title').textContent = placeNameOnForm.value;
    card.querySelector('.card__img').setAttribute('src', placeUrlOnForm.value);
    card.querySelector('.card__img').setAttribute('alt', placeNameOnForm.value);

    cardsArray.prepend(card);
    closePopup(event)
}

function cardsEvent(event) {
    if (event.target.classList.contains('card__delete')) {
        event.target.closest('.card').remove()
    }
    if (event.target.classList.contains('card__like')) {
        event.target.classList.toggle('card__like_active')
    }
}

cardsArray.addEventListener('click', cardsEvent)
popupEditProfileOpenBtn.addEventListener('click', openPopupEditForm)
popupNewPlaceOpenBtn.addEventListener('click', openPopupNewPlace)
popupEditProfileForm.addEventListener('submit', formEditProfileSubmitHandler)
popupNewPlaceForm.addEventListener('submit', formNewPlaceSubmitHandler)
popupCloseBtns.forEach(function (btn) {
    btn.addEventListener('click', closePopup)
})
