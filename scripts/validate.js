const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
}

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(errorClass);
}

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    if(!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass)
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass)
    }
}

const hasInvalidInput = (inputList) => {
    return [...inputList].some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if(hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        const inputList = formElement.querySelectorAll(settings.inputSelector);
        const buttonElement = formElement.querySelector(settings.submitButtonSelector);

        toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                checkInputValidity(formElement, inputElement, settings.inputErrorClass, settings.errorClass);
                toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass);
            });
        });
    });
}

enableValidation({
    formSelector: ".edit-form",
    inputSelector: ".edit-form__input",
    submitButtonSelector: ".edit-form__save-button",
    inactiveButtonClass: "edit-form__save-button_disabled",
    inputErrorClass: "edit-form__input_type_error",
    errorClass: "edit-form__error_visible"
  }); 