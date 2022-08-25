let editModal = document.querySelector(".modal__container");

function handleOpenEditModal(evt) {
    editModal.classList.add("modal__container_modal_opened");
}

function handleCloseEditModal(evt) {
    editModal.classList.remove("modal__container_modal_opened");
}

const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", handleOpenEditModal);

const profileModalCloseBtn = document.querySelector(".modal__close-button");
profileModalCloseBtn.addEventListener("click", handleCloseEditModal);

const profileFormElement = document.querySelector(".edit-form");

const nameInput = profileFormElement.querySelector("#name");
const jobInput = profileFormElement.querySelector("#description");

const nameTitle = document.querySelector(".profile__name-title");
const jobDescription = document.querySelector(".profile__description");

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    let newName = nameInput.value;
    let newJob = jobInput.value;

    nameTitle.textContent = newName;
    jobDescription.textContent = newJob;

    editModal.classList.remove("modal__container_modal_opened");
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

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

function getCardElement(data) {
    const cardTemplate = document.querySelector("#card-template").content;
    let cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector(".card__image").src = data.link;
    cardElement.querySelector(".card__image").alt = data.name;
    cardElement.querySelector(".card__title").textContent = data.name;

    return cardElement;
}

const cardListElement = document.querySelector(".locations__cards")
for(let i=0; i < initialCards.length; i++) {
    cardListElement.append(getCardElement(initialCards[i]));
}