export const popupEditProfileOpenBtn = document.querySelector(
    ".profile__edit-button"
);
export const popupEditProfile = document.querySelector(
    ".popup_type_profile-edit"
);
export const popupEditProfileForm =
    popupEditProfile.querySelector(".popup__form");

export const popupNewPlaceOpenBtn = document.querySelector(
    ".profile__add-new-place"
);
export const popupEditNewPlace = document.querySelector(
    ".popup_type_new-place"
);
export const popupNewPlaceForm =
    popupEditNewPlace.querySelector(".popup__form");

export const inputUserName = popupEditProfile.querySelector(
    ".popup__input_type_name"
);
export const inputUserAbout = popupEditProfile.querySelector(
    ".popup__input_type_about"
);
export const placeNameOnForm = popupEditNewPlace.querySelector(
    ".popup__input_type_place-name"
);
export const placeUrlOnForm = popupEditNewPlace.querySelector(
    ".popup__input_type_place-url"
);

export const editAvatarButton = document.querySelector(
    ".profile__avatar-edit"
);

export const popupEditAvatar = document.querySelector(
    ".popup_type_edit-avatar"
);
export const popupEditAvatarForm =
    popupEditAvatar.querySelector(".popup__form");


export const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};


export const profileSelectors = {
    nameSelector: ".profile__name",
    aboutSelector: ".profile__about",
    avatarSelector: ".profile__avatar",
}
