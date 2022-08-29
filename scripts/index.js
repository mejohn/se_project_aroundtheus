const editProfileModal = document.querySelector(".modal_type_edit-profile");
const profileFormElement = document.forms.editProfileForm;
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
const addLocationModal = document.querySelector(".modal_type_add-location")
const locationFormElement = document.forms.addLocationForm;
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
const imageModal = document.querySelector(".modal_type_show-image");
const imageModalImage = imageModal.querySelector(".modal__image");
const imageModalCaption = imageModal.querySelector(".modal__image-caption");

function fillModalForm(fieldMapping) {
    fieldMapping.forEach(({inputElement, displayElement}) => {
        inputElement.value = displayElement.textContent;
    })
}

function fillImageModal(imageMapping) {
    imageModalImage.src = imageMapping.link;
    imageModalImage.alt = imageMapping.name;
    imageModalCaption.textContent = imageMapping.name;
}

function handleOpenModal(modalElement) {
    modalElement.classList.add("modal_opened");
}

function handleCloseModal(modalElement) {
    modalElement.classList.remove("modal_opened");
}

const editProfileButton = document.querySelector(".profile__edit-button");
editProfileButton.addEventListener("click", () => {
    handleOpenModal(editProfileModal);
    fillModalForm(editProfileMapping); 
});

const addLocationButton = document.querySelector(".profile__add-button");
addLocationButton.addEventListener("click", () => {
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
function deleteCard(evt) {
    evt.target.closest(".card").remove();
}

function getCardElement(data) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.cloneNode(true);

    const cardImageElement = cardElement.querySelector(".card__image");
    cardImageElement.src = data.link;
    cardImageElement.alt = data.name;
    cardElement.querySelector(".card__title").textContent = data.name;

    cardImageElement.addEventListener("click", () => {
        handleOpenModal(imageModal);
        fillImageModal(data);
    })
    const loveButton = cardElement.querySelector(".card__love-button");
    loveButton.addEventListener("click", () => {
        loveButton.classList.toggle("card__love-button_loved");
    })

    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", deleteCard);

    return cardElement;
}

const cardListElement = document.querySelector(".locations__cards")
initialCards.forEach((card) => {
    cardListElement.append(getCardElement(card));
});

function handleLocationFormSubmit(evt) {
    evt.preventDefault();
    const data = {
        name: locationFormElement.elements.title.value,
        link: locationFormElement.elements.url.value,
    }
    
    cardListElement.prepend(getCardElement(data));
    handleCloseModal(addLocationModal);
    evt.target.reset();
}

locationFormElement.addEventListener("submit", handleLocationFormSubmit);

