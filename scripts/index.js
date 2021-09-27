const popup = document.querySelector('.popup')
const popupOpenBtn = document.querySelector('.profile__edit-icon')
const popupCloseBtn = popup.querySelector('.popup__close')
const popupSaveBtn = popup.querySelector('.popup__submit')

popupOpenBtn.addEventListener('click', function () {
    popup.classList.add('popup_opened')

    const fio = document.querySelector('.profile__name').textContent
    const occupation = document.querySelector('.profile__occupation').textContent

    popup.querySelector('.popup__input-name').value = fio
    popup.querySelector('.popup__input-occupation').value = occupation
})

popupCloseBtn.addEventListener('click', function () {
    popup.classList.remove('popup_opened')
})