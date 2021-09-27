const popup = document.querySelector('.popup')
const popupOpenBtn = document.querySelector('.profile__edit-icon')
const popupCloseBtn = popup.querySelector('.popup__close')
const popupForm = popup.querySelector('.popup__form')
const body = document.querySelector('.body')

function closePopup(){
    popup.classList.remove('popup_opened')
    body.classList.remove('body_no-scroll')
}

function openPopup(){
    popup.classList.add('popup_opened')
    body.classList.add('body_no-scroll')
}

popupOpenBtn.addEventListener('click', function () {
    openPopup()

    const fio = document.querySelector('.profile__name').textContent
    const occupation = document.querySelector('.profile__occupation').textContent

    popup.querySelector('.popup__input-name').value = fio
    popup.querySelector('.popup__input-occupation').value = occupation
})

popupCloseBtn.addEventListener('click', function () {
    closePopup()
})

popupForm.addEventListener('submit', function (event) {
    event.preventDefault()
    closePopup()

    const fio = popup.querySelector('.popup__input-name').value
    const occupation = popup.querySelector('.popup__input-occupation').value

    document.querySelector('.profile__name').textContent = fio
    document.querySelector('.profile__occupation').textContent = occupation
})

popup.addEventListener('click', function (event) {
    if (event.target === event.currentTarget) {
        closePopup()
    }
})