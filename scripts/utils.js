// functions used in both index.js and Card.js

export const imageModal = document.querySelector(".modal_type_show-image");
export const imageModalImage = imageModal.querySelector(".modal__image");
export const imageModalCaption = imageModal.querySelector(".modal__image-caption");

export const handleOpenModal = (modalElement) => {
    modalElement.classList.add("modal_opened");
    document.addEventListener("keyup", handleEscPress);
    modalElement.addEventListener("click", handleOverlayClick);
};

export const handleCloseModal = (modalElement) => {
    document.removeEventListener("keyup", handleEscPress);
    modalElement.removeEventListener("click", handleOverlayClick);
    modalElement.classList.remove("modal_opened");
};

const handleEscPress = (evt) => {
    const modal = document.querySelector(".modal_opened");
    if(modal && evt.key === "Escape") {
        handleCloseModal(modal);
    }
};

const handleOverlayClick = (evt) => {
    const modal = document.querySelector(".modal_opened");
    console.log(evt.target.closest(".modal__content"));
    if(modal && !(evt.target.closest(".modal__content") || evt.target.closest(".modal__content-image"))) {     
        handleCloseModal(modal);
    }
};