import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

import {handleOpenModal, handleCloseModal} from "./utils.js";

const initialCards = [
    {
        "name": "Yosemite Valley",
        "link": "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        "name": "Lake Louise",
        "link": "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        "name": "Bald Mountains",
        "link": "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        "name": "Latemar",
        "link": "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        "name": "Vanoise National Park",
        "link": "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
        "name": "Lago di Braies",
        "link": "https://code.s3.yandex.net/web-code/lago.jpg"
    },
];

// editProfile
const editProfileModal = document.querySelector(".modal_type_edit-profile");
const profileFormElement = document.forms.editProfileForm;
const profileSaveBtn = profileFormElement.querySelector(".edit-form__save-button");
const editProfileMapping = [
    {
        field: "name", 
        inputElement: profileFormElement.elements.name,
        displayElement: document.querySelector(".profile__name-title")
    },
    {
        field: "description",
        inputElement: profileFormElement.elements.description,
        displayElement: document.querySelector(".profile__description")
    }
]

// addLocation
const addLocationModal = document.querySelector(".modal_type_add-location")
const locationFormElement = document.forms.addLocationForm;
const locationSaveBtn = locationFormElement.querySelector(".edit-form__save-button")
const addLocationMapping = [
    {
        field: "url",
        inputElement: locationFormElement.elements.url,
    },
    {
        field: "title",
        inputElement: locationFormElement.elements.title
    }
];

const cardSelector = "#card-template";
const validationConfig = {
    inputSelector: ".edit-form__input",
    submitButtonSelector: ".edit-form__save-button",
    inactiveButtonClass: "edit-form__save-button_disabled",
    inputErrorClass: "edit-form__input_type_error",
    errorClass: "edit-form__error_visible"
};

const editProfileValidator = new FormValidator(
    validationConfig,
    editProfileModal
);
editProfileValidator.enableValidation();

const addLocationValidator = new FormValidator(
    validationConfig,
    addLocationModal
);
addLocationValidator.enableValidation();

function fillModalForm(fieldMapping) {
    fieldMapping.forEach(({inputElement, displayElement}) => {
        inputElement.value = displayElement.textContent;
    })
}

const editProfileButton = document.querySelector(".profile__edit-button");
editProfileButton.addEventListener("click", () => {
    editProfileValidator.resetValidation();
    handleOpenModal(editProfileModal);
    fillModalForm(editProfileMapping); 
});

const addLocationButton = document.querySelector(".profile__add-button");
addLocationButton.addEventListener("click", () => {
    // reset the form
    addLocationForm.reset();
    addLocationValidator.resetValidation();
    handleOpenModal(addLocationModal);
});

// find all modal close buttons
const modalCloseButtons = Array.from(document.querySelectorAll(".modal__close-button"));
modalCloseButtons.forEach((button) => {
    const modal = button.closest(".modal");
    button.addEventListener("click", () => {
        handleCloseModal(modal);
    })
})

function handleProfileFormSubmit(evt, fieldMapping) {
    evt.preventDefault();

    fieldMapping.forEach(({inputElement, displayElement}) => {
        displayElement.textContent = inputElement.value;
    })

    handleCloseModal(editProfileModal);
    evt.target.reset();
}

profileFormElement.addEventListener("submit", (evt) => {
    handleProfileFormSubmit(evt, editProfileMapping);
});

const cardListElement = document.querySelector(".locations__cards");

initialCards.forEach((card) => {
    const newCard = new Card(card, cardSelector);
    cardListElement.append(newCard.generateCard());
});

function handleLocationFormSubmit(evt) {
    evt.preventDefault();
    const data = {
        name: locationFormElement.elements.title.value,
        link: locationFormElement.elements.url.value,
    }
    
    cardListElement.prepend(new Card(data, cardSelector).generateCard());
    handleCloseModal(addLocationModal);
    evt.target.reset();
}

locationFormElement.addEventListener("submit", handleLocationFormSubmit);