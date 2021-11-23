import "./styles/index.css";

import {Card} from "./components/Card.js";
import {FormValidator} from "./components/FormValidator.js";
import {Section} from "./components/Section.js";
import {PopupWithImage} from "./components/PopupWithImage.js";
import {PopupWithForm} from "./components/PopupWithForm.js";
import {UserInfo} from "./components/UserInfo.js";

import {
    inputUserabout,
    inputUserName,
    placeNameOnForm,
    placeUrlOnForm,
    popupEditProfileForm,
    popupEditProfileOpenBtn,
    popupNewPlaceForm,
    popupNewPlaceOpenBtn,
} from "./scripts/constants";
import {Api} from "./components/Api";
import {PopupWithSubmit} from "./components/PopupWithSubmit.js";

const api = new Api(
    'https://mesto.nomoreparties.co/v1/cohort-30',
    '8a0021df-e451-4ea1-9a4d-dab486c52595'
)

const submitPopup = new PopupWithSubmit(".popup_type_submit");
submitPopup.setEventListeners();

const sectionRenderer = new Section(
    api.getCards(),
    (item) =>
        new Card(
            item,
            "#card",
            photoPopup.open.bind(photoPopup),
            submitPopup
        ).generateCard(),

    ".cards"
);

const photoPopup = new PopupWithImage(".popup_type_image");
photoPopup.setEventListeners();


const userInfo = new UserInfo(api.getUserInfo(), sectionRenderer);

const editProfileForm = new PopupWithForm(
    ".popup_type_profile-edit",
    (data) => {
        api.updateUserInfo(data).then(
            res => userInfo.setUserInfo(res)
        )
    }
);

editProfileForm.setEventListeners();
const newPlaceForm = new PopupWithForm(".popup_type_new-place", (data) => {

    api.addNewCard({
        name: data.place_name,
        link: data.place_url,
    }).then(res => sectionRenderer.addItem(res)).catch(err => console.log(err))
});

newPlaceForm.setEventListeners();

let changeProfileFormValidation = undefined;
let newPlaceFormValidation = undefined;

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};

function openPopupEditForm() {
    const data = userInfo.getUserInfo();
    inputUserName.value = data.name;
    inputUserabout.value = data.about;

    const event = new Event("input", {
        bubbles: true,
        cancelable: true,
    });

    inputUserName.dispatchEvent(event);
    inputUserabout.dispatchEvent(event);

    editProfileForm.open();
}

function openPopupNewPlace() {
    placeNameOnForm.value = "";
    placeUrlOnForm.value = "";

    newPlaceFormValidation.disableSubmitBtn();
    newPlaceForm.open();
}

const enableFormValidation = () => {
    changeProfileFormValidation = new FormValidator(
        validationConfig,
        popupEditProfileForm
    );
    changeProfileFormValidation.enableValidation();

    newPlaceFormValidation = new FormValidator(
        validationConfig,
        popupNewPlaceForm
    );
    newPlaceFormValidation.enableValidation();
};
enableFormValidation();

popupEditProfileOpenBtn.addEventListener("click", openPopupEditForm);
popupNewPlaceOpenBtn.addEventListener("click", openPopupNewPlace);
