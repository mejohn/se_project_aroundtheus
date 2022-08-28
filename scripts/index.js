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

function fillModalForm(fieldMapping) {
    fieldMapping.forEach(({inputElement, displayElement}) => {
        inputElement.value = displayElement.textContent;
    })
}

function fillImageModal(modalElement, imageMapping) {
    const modalImage = modalElement.querySelector(".modal__image");
    modalImage.src = imageMapping.link;
    modalImage.alt = imageMapping.name;
    modalElement.querySelector(".modal__image-caption").textContent = imageMapping.name;
}

function handleOpenModal(modalElement, fieldMapping, imageMapping) {
    modalElement.classList.add("modal_opened");
    if (fieldMapping.length) {
        fillModalForm(fieldMapping); 
    } else if (imageMapping) {
        fillImageModal(modalElement, imageMapping);
    }
}

function handleCloseModal(modalElement, fieldMapping) {
    modalElement.classList.remove("modal_opened");
    if(fieldMapping.length) {
        fieldMapping.forEach(({inputElement}) => {
            inputElement.value = "";
        });
    }
}

const editProfileButton = document.querySelector(".profile__edit-button");
editProfileButton.addEventListener("click", () => {
    handleOpenModal(editProfileModal, editProfileMapping);
});

const profileModalCloseBtn = editProfileModal.querySelector(".modal__close-button");
profileModalCloseBtn.addEventListener("click", () => {
    handleCloseModal(editProfileModal, editProfileMapping);
});

const addLocationButton = document.querySelector(".profile__add-button");
addLocationButton.addEventListener("click", () => {
    handleOpenModal(addLocationModal, []);
});

const locationModalCloseBtn = addLocationModal.querySelector(".modal__close-button");
locationModalCloseBtn.addEventListener("click", () => {
    handleCloseModal(addLocationModal, addLocationMapping);
})

const imageModalCloseBtn = imageModal.querySelector(".modal__close-button");
imageModalCloseBtn.addEventListener("click", () => {
    handleCloseModal(imageModal, []);
});

function handleProfileFormSubmit(evt, fieldMapping) {
    evt.preventDefault();

    fieldMapping.forEach(({inputElement, displayElement}) => {
        displayElement.textContent = inputElement.value;
    })

    handleCloseModal(editProfileModal, editProfileMapping);
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
    evt.target.parentElement.parentElement.remove();
}

function getCardElement(data) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.cloneNode(true);

    const cardImageElement = cardElement.querySelector(".card__image");
    cardImageElement.src = data.link;
    cardImageElement.alt = data.name;
    cardElement.querySelector(".card__title").textContent = data.name;

    cardImageElement.addEventListener("click", () => {
        handleOpenModal(imageModal, [], data)
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
    handleCloseModal(addLocationModal, addLocationMapping);
}

locationFormElement.addEventListener("submit", handleLocationFormSubmit);

