
export default class Card {
 
  constructor(name, link, imagePopupOpen, template) {
    this.name = name;
    this.link = link;
    this.imagePopupOpen = imagePopupOpen;
    this.template = template;
  }

  create() {
    const card = this.template.cloneNode(true).children[0];
    const cardName = card.querySelector('.place-card__name');
    const cardImage = card.querySelector('.place-card__image');
    cardName.textContent = this.name;

    cardImage.style.backgroundImage = `url(${this.link})`;  

    this.cardElement = card;
    this.addListeners();
    return this.cardElement;
  }

  addListeners() {
    this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
    this.cardElement.querySelector('.place-card__image').addEventListener('click', this.openPopup);
  }

  remove = (event) => {
    event.stopPropagation();
    this.removeEventListeners( this.cardElement);
    this.cardElement.remove();
  }

  removeEventListeners = (card) => {
    card.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
    card.querySelector('.place-card__image').removeEventListener('click', this.openPopup);
    card.querySelector('.place-card__delete-icon').removeEventListener('click', this.remove);
  }

  like = (event) => {
    event.target.classList.toggle('place-card__like-icon_liked');
}

  openPopup = (event) => {
    
    this.imagePopupOpen(event.target);
  }
}





