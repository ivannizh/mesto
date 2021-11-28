export class FormValidator {
    constructor(validationSettings, formElement) {
        this._formElement = formElement;
        this._inputSelector = validationSettings.inputSelector;
        this._inputErrorClass = validationSettings.inputErrorClass;
        this._errorClass = validationSettings.errorClass;
        this._inactiveButtonClass = validationSettings.inactiveButtonClass;
        this._submitButtonSelector = validationSettings.submitButtonSelector;

        this._inputList = Array.from(
            formElement.querySelectorAll(this._inputSelector)
        );
        this._buttonElement = formElement.querySelector(this._submitButtonSelector);
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(
            `.${inputElement.id}-error`
        );

        errorElement.textContent = errorMessage;
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(
            `.${inputElement.id}-error`
        );

        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
        this.toggleButtonState(this._inputList, this._buttonElement);
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.setAttribute("disabled", true);
            this._buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            this._buttonElement.removeAttribute("disabled");
            this._buttonElement.classList.remove(this._inactiveButtonClass);
        }
    }

    _setEventListeners() {
        this.toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._formElement.addEventListener("submit", function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners();
    }
}
