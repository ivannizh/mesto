const popupEditProfileOpenBtn = document.querySelector('.profile__edit-button')
const popupEditProfile = document.querySelector('.popup_type_profile-edit')
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form')
const popupCloseBtns = document.querySelectorAll('.popup__close')
const popupImage = document.querySelector('.popup_type_image ')
const popupNewPlaceOpenBtn = document.querySelector('.profile__add-new-place')
const popupEditNewPlace = document.querySelector('.popup_type_new-place ')
const popupNewPlaceForm = popupEditNewPlace.querySelector('.popup__form')
const userName = document.querySelector('.profile__name')
const userOccupation = document.querySelector('.profile__occupation')
const inputUserName = popupEditProfile.querySelector('.popup__input_type_name')
const inputUserOccupation = popupEditProfile.querySelector('.popup__input_type_occupation')
const placeNameOnForm = popupEditNewPlace.querySelector('.popup__input_type_place-name')
const placeUrlOnForm = popupEditNewPlace.querySelector('.popup__input_type_place-url')
const popupImageImage = popupImage.querySelector('.popup__image')
const cardTemplate = document.querySelector('#card').content.querySelector('.card');
const cardsArray = document.querySelector('.cards')
const allPopups = document.querySelectorAll('.popup')

function createCard(cardName, cardLink) {
    const card = cardTemplate.cloneNode(true);
    const image = card.querySelector('.card__img')

    card.querySelector('.card__title').textContent = cardName;
    image.setAttribute('src', cardLink);
    image.setAttribute('alt', cardName);

    card.querySelector('.card__delete').addEventListener('click', deleteCard);
    card.querySelector('.card__like').addEventListener('click', toggleLike);
    card.querySelector('.card__img').addEventListener('click', openImagePopup);

    return card
}

function renderInitialCards() {
    initialCards.forEach(function (item) {
        cardsArray.append(createCard(item.name, item.link))
    })
}

renderInitialCards()

function openPopup(popupWindow) {
    popupWindow.classList.add('popup_opened')

    popupWindow.addEventListener('click', closePopupOnOverlay);
    document.addEventListener('keydown', closePopupOnEsc);
}

function closePopup(popupWindow) {
    popupWindow.classList.remove('popup_opened')

    popupWindow.removeEventListener('click', closePopupOnOverlay);
    document.addEventListener('keydown', closePopupOnEsc);
}

function closePopupEvent(event) {
    closePopup(event.target.closest('.popup'));
}

function openPopupEditForm() {
    inputUserName.value = userName.textContent
    inputUserOccupation.value = userOccupation.textContent

    openPopup(popupEditProfile)
}

function openPopupImage(alt, caption, src) {
    popupImageImage.setAttribute('src', src)
    popupImageImage.setAttribute('alt', alt)
    popupImage.querySelector('.popup__image-caption').textContent = caption

    openPopup(popupImage)
}

function openPopupNewPlace() {
    openPopup(popupEditNewPlace)
}


function formEditProfileSubmitHandler(event) {
    event.preventDefault()

    userName.textContent = inputUserName.value
    userOccupation.textContent = inputUserOccupation.value

    closePopup(popupEditProfile)
}

function formNewPlaceSubmitHandler(event) {
    event.preventDefault()
    cardsArray.prepend(createCard(placeNameOnForm.value, placeUrlOnForm.value));
    closePopup(popupEditNewPlace)
}


function deleteCard(event) {
    const card = event.currentTarget.closest('.card');
    card.querySelector('.card__delete').removeEventListener('click', deleteCard);
    card.querySelector('.card__like').removeEventListener('click', toggleLike);
    card.querySelector('.card__img').removeEventListener('click', openImagePopup);
    card.remove();
}

function toggleLike(event) {
    event.target.classList.toggle('card__like_active')
}

function openImagePopup(event) {
    const caption = event.target.closest('.card').querySelector('.card__title').textContent
    const alt = event.target.getAttribute('alt')
    const src = event.target.getAttribute('src')

    openPopupImage(alt, caption, src);
}

function closePopupOnOverlay(event) {
    if (event.target.classList.contains('popup')) {
        closePopup(event.target);
    }
}

function closePopupOnEsc(event) {
    console.log(event.key);
    if (event.key === 'Escape') {
        for (let i in allPopups) {
            if (allPopups[i].classList.contains('popup_opened')) {
                closePopup(allPopups[i]);
                break;
            }
        }
    }
}

popupEditProfileOpenBtn.addEventListener('click', openPopupEditForm)
popupNewPlaceOpenBtn.addEventListener('click', openPopupNewPlace)
popupEditProfileForm.addEventListener('submit', formEditProfileSubmitHandler)
popupNewPlaceForm.addEventListener('submit', formNewPlaceSubmitHandler)
popupCloseBtns.forEach(function (btn) {
    btn.addEventListener('click', closePopupEvent)
})
