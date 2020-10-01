/*
  Класс сделан отлично!
*/

class Card {
  /* 
      Можно лучше: лучше передавать не отдельные параметры, а сразу весь объект с данными карточки,
      т.к. представьте что у карточки появится ещё одно свойство (например author) которое нужно будет отобразить
      Если у нас создание карточки вызывается как new Card(name,link), придется во всех местах
      где вызывается создание карточки переписывать её вызов с new Card(name,link)  на new Card(name, link, author) 
      Если ли же мы передаем просто объект карточки в функцию ( new Card(cardData) ) нам придется гораздо меньше менять программу
  */
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
    /*
      Можно лучше: передавать сразу this.link, а не event.target
    */
    this.imagePopupOpen(event.target);
  }
}





