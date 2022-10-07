import {imageModal, imageModalImage, 
    imageModalCaption, handleOpenModal } from "./utils.js";

class Card {
    constructor(data, cardSelector) {
        this._url = data.link;
        this._title = data.name;
        console.log(this._cardSelector);
        this._cardSelector = cardSelector
    }

    _getTemplate() {
        return document.querySelector(this._cardSelector)
            .content.querySelector(".card")
            .cloneNode(true);
    }

    _setData() {
        this._imageElement.src = this._url;
        this._imageElement.alt = this._title;
        this._element.querySelector(".card__title").textContent = this._title;
    }

    _fillImageModal() {
        imageModalImage.src = this._url;
        imageModalImage.alt = this._title;
        imageModalCaption.textContent = this._title;

        handleOpenModal(imageModal);
    }

    _deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _toggleLoveButton() {
        this._loveButton.addEventListener("click", () => {
            loveButton.classList.toggle("card__love-button_loved");
        });
    }

    _setEventListeners() {
        this._loveButton.addEventListener("click", () => this._toggleLoveButton());
        
        this._element.querySelector(".card__delete-button")
            .addEventListener("click", () => this._deleteCard());

        this._element.querySelector(".card__image")
            .addEventListener("click", () => this._fillImageModal());
    }

    generateCard() {
        this._element = this._getTemplate();
        this._imageElement = this._element.querySelector(".card__image");
        this._loveButton = this._element.querySelector(".card__love-button");

        this._setData();
        
        this._setEventListeners();
    
        return this._element;
    }
}

export default Card;