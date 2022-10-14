class Modal {
    constructor(modalSelector) {
        this._modalSelector = modalSelector;

        this._element = document.querySelector(this._modalSelector);
    }

    open() {

    }

    close() {

    }

    _handleEscClose() {

    }

    _handleOverlayClick() {

    }

    setEventListeners() {

    }
}

export class ImageModal extends Modal {
    open() {

    }
}

export class FormModal extends Modal {
    constructor(modalSelector, submitCallback) {
        this._modalSelector = modalSelector;
        this._element = document.querySelector(this._modalSelector);

        this._submitCallback = submitCallback;
    }

    _getInputvalues() {

    }

    open() {

    }

    close() {

    }

    setEventListeners() {

    }
}