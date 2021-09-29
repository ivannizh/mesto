const popup = document.querySelector('.popup')
const popupOpenBtn = document.querySelector('.profile__edit-icon')
const popupCloseBtn = popup.querySelector('.popup__close')
const popupForm = popup.querySelector('.popup__form')

const fioOnPage = document.querySelector('.profile__name')
const occupationOnPage = document.querySelector('.profile__occupation')

const fioOnForm = popup.querySelector('.popup__input_name')
const occupationOnForm = popup.querySelector('.popup__input_occupation')


function closePopup() {
    popup.classList.remove('popup_opened')
}

function openPopup() {
    fioOnForm.value = fioOnPage.textContent
    occupationOnForm.value = occupationOnPage.textContent

    popup.classList.add('popup_opened')
}

popupOpenBtn.addEventListener('click', openPopup)

popupCloseBtn.addEventListener('click', closePopup)

popupForm.addEventListener('submit', function(event) {
    event.preventDefault()

    fioOnPage.textContent = fioOnForm.value
    occupationOnPage.textContent = occupationOnForm.value

    closePopup()
})