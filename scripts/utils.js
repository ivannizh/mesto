function closePopupOnOverlay(event) {
    if (event.target.classList.contains('popup')) {
        closePopup(event.target);
    }
}

function closePopupOnEsc(event) {
    if (event.key === 'Escape') {
        const openPopup = document.querySelector('.popup_opened')
        closePopup(openPopup);
    }
}

export function openPopup(popupWindow) {
    popupWindow.classList.add('popup_opened')

    popupWindow.addEventListener('click', closePopupOnOverlay);
    document.addEventListener('keydown', closePopupOnEsc);
}

export function closePopup(popupWindow) {
    popupWindow.classList.remove('popup_opened')

    popupWindow.removeEventListener('click', closePopupOnOverlay);
    document.removeEventListener('keydown', closePopupOnEsc);
}
