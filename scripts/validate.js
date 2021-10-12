const showInputError = (formElement, inputElement, errorMessage, validationSettings) => {

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    errorElement.textContent = errorMessage;
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorElement.classList.add(validationSettings.errorClass);
};

const hideInputError = (formElement, inputElement, validationSettings) => {

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.classList.remove(validationSettings.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, validationSettings) => {

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
    } else {
        hideInputError(formElement, inputElement, validationSettings);
    }
};


const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

const toggleButtonState = function(inputList, buttonElement, validationSettings) {
    if (hasInvalidInput(inputList)) {
        // debugger
        buttonElement.classList.add(validationSettings.inactiveButtonClass);
    } else {
        // debugger
        buttonElement.classList.remove(validationSettings.inactiveButtonClass);
    }
}


const setEventListeners = (formElement, validationSettings) => {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);


    toggleButtonState(inputList, buttonElement, validationSettings);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {

            checkInputValidity(formElement, inputElement, validationSettings);

            toggleButtonState(inputList, buttonElement, validationSettings);
        });
    });
};

const enableValidation = (validationSettings) => {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function(evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, validationSettings);
    });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});