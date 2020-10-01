class FormValidator {
    constructor(formV) {
        this.formV = formV;
        this.setEventListeners = this.setEventListeners.bind(this);
    }
  
    /*
        Можно лучше: сообщения об ошибках вынести в отдельный объект, а не хардкодить их в методе
        errorMessages = {
            empty: 'Это обязательное поле',
            wrongLength: 'Должно быть от 2 до 30 символов'
            ......
        }
        Если понадобится перевести приложение на другой язык можно будет передавать другой объект
  */
    checkInputValidity (inputElement, errorMessageElement) {
        if (inputElement.value.length === 0) {
        errorMessageElement.textContent = 'Это обязательное поле';
        return false;
        } 
        if (inputElement.value.length < 2 || inputElement.value.length > 30) {
        errorMessageElement.textContent = 'Должно быть от 2 до 30 символов';
        return false;
        }  
        if (inputElement.typeMismatch && inputElement.type === 'url') {
        errorMessageElement.textContent = 'Здесь должна быть ссылка';
        return false;
        } else {
        errorMessageElement.textContent = '';
        return true;
        }
    }
    
    setSubmitButtonState(state) {
        const button = this.formV.querySelector('button');
        if (state) {
        button.removeAttribute('disabled', true);
        button.classList.add('popup__button_active');
        }
        else {
        button.setAttribute('disabled', true);
        button.classList.remove('popup__button_active');
        }     
    }

    isFieldValid(input) {
        const errorElem = this.formV.querySelector(`#${input.id}-error`);
        const valid = this.checkInputValidity(input, errorElem);
        return valid;
    }

    setEventListeners() {
        const inputs = [...this.formV.querySelectorAll('input')];
        this.formV.addEventListener('input', (event)=>{
        const inputForValidation = event.target;
        this.isFieldValid(inputForValidation);
        
        if (inputs.every((input) => input.validity.valid)) {
            this.setSubmitButtonState(true);
            } else {
            this.setSubmitButtonState(false);
            }
        });
    }


    setEventListenersCard(){
        const formCard = document.forms.new;
        const cardName = formCard.elements.namepicture;
        const cardLink = formCard.elements.link;
        const cardButton = document.querySelector("#card_button")

        if (cardLink.value.length === 0 || cardName.value.length === 0) {
            cardButton.setAttribute('disabled', true);
            cardButton.classList.remove('popup__button_active');
        } else {
            cardButton.removeAttribute('disabled', true);
            cardButton.classList.add('popup__button_active');
        }
    }
  
}