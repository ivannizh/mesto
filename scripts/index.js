const popup = document.querySelector('.popup')
const popupOpenBtn = document.querySelector('.profile__edit-icon')
const popupCloseBtn = popup.querySelector('.popup__close')
const popupForm = popup.querySelector('.popup__form')

const fio_on_page = document.querySelector('.profile__name')
const occupation_on_page = document.querySelector('.profile__occupation')

const fio_on_form = popup.querySelector('.popup__input-occupation')
const occupation_on_form = popup.querySelector('.popup__input-name')


function closePopup(){
    popup.classList.remove('popup_opened')
}

function openPopup(){
    popup.classList.add('popup_opened')
}

popupOpenBtn.addEventListener('click', function () {
    openPopup()

    occupation_on_form.value = fio_on_page.textContent
    fio_on_form.value = occupation_on_page.textContent
})

popupCloseBtn.addEventListener('click', function () {
    closePopup()
})

popupForm.addEventListener('submit', function (event) {
    event.preventDefault()
    closePopup()

    fio_on_page.textContent = fio_on_form.value
    occupation_on_page.textContent = occupation_on_form.value
})
