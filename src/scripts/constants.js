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
export const inputUserabout = popupEditProfile.querySelector(
  ".popup__input_type_about"
);
export const placeNameOnForm = popupEditNewPlace.querySelector(
  ".popup__input_type_place-name"
);
export const placeUrlOnForm = popupEditNewPlace.querySelector(
  ".popup__input_type_place-url"
);