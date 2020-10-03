import "./pages/index.css"; 
import CardList from './CardList'
import Card from './Card'
import Api from './Api'
import FormValidator from './FormValidator'
import UserInfo from './UserInfo'
import Popup from './Popup'



const API_URL = process.env.NODE_ENV === 'production' ? 'https://nomoreparties.co' : 'http://nomoreparties.co';


const module = (function () {
    const formCard = document.forms.new;
    const cardName = formCard.elements.namepicture;
    const cardLink = formCard.elements.link;

    const formUser = document.forms.user;
    const inputNameUser = formUser.elements.name;
    const inputAboutMeUser = formUser.elements.work;

    const placesList = document.querySelector('.places-list');
    const template = document.querySelector('.template').content;
    const popupWindow = document.querySelector('.popup');
    const openForm = document.querySelector('.user-info__button');
    const closeForm = document.querySelector('.popup__close');
    const popupForm = document.querySelector('.popup__form');
    const popupUserForm = document.querySelector('.popup__form_user');
    const popupUserWindow = document.querySelector('#popup_user');
    const openUserForm = document.querySelector('.user-info__edit');
    const popupImageWindow = document.querySelector('#popup_image');
    const imagePicture = document.querySelector('.popup__image-image');
    const name = document.querySelector('.popup__input_type_name');
    const link = document.querySelector('.popup__input_type_link-url');

    const edit_name = document.querySelector('#name');
    const edit_work = document.querySelector('#work');
    const editButton = document.querySelector('.popup__button_save');

    const api = new Api({
      url:`${API_URL}/cohort12`,
      authorization: '372bc65e-df11-4d0a-9394-e595c191e57a', 
      'Content-Type': 'application/json'
    });

    function addNewCard(event) {
        event.preventDefault();
        cardList.addCard(name.value, link.value);
        popupForm.reset();
        popupAddCard.close();
        sendFormAdd.setSubmitButtonState(false);
    }

    const imagePopupOpen = (target) => {
     
      imagePicture.src = event.target.style.backgroundImage.slice(5, -2); 
      popupImage.open();
    }

    const createCardFunction = (name, link) => {
      const card = new Card(name, link, imagePopupOpen, template);
      return card.create();
    }
    
    const userInfoInitial = new UserInfo(document.querySelector('.user-info__name'), document.querySelector('.user-info__work'), inputNameUser.value, inputAboutMeUser.value); // - экземпляр класса UserInfo
    const popupAddCard = new Popup(popupWindow,'popup_is-opened'); 
    const popupUser = new Popup(popupUserWindow,'popup_is-opened'); 
    const popupImage = new Popup(popupImageWindow,'popup_is-opened'); 
    const sendFormProfil= new FormValidator(formUser);
    const sendFormAdd= new FormValidator(formCard);
    const cardList = new CardList(placesList, api, createCardFunction);


    popupForm.addEventListener('submit', addNewCard); 

    sendFormAdd.setEventListenersCard();
    sendFormProfil.setEventListeners();
    
    cardName.addEventListener('input', sendFormAdd.setEventListenersCard); 
    cardLink.addEventListener('input', sendFormAdd.setEventListenersCard); 

    openForm.addEventListener("click",() => { popupAddCard.open();});
    openUserForm.addEventListener("click", () => { popupUser.open();});
    closeForm.addEventListener("click", () => {popupForm.reset(); sendFormAdd.setSubmitButtonState(false);});

    

    editButton.addEventListener('click', () => {
      event.preventDefault();
      api.changeProfile(edit_name.value, edit_work.value)
        .then(() => {
          userInfoInitial.actualAughtor(edit_name.value, edit_work.value)
          popupUser.close()
        })
        .catch(err => console.log(err))
    })


    
    cardList.render();

    api.sendRequest()
      .then((res) => {
        userInfoInitial.actualAughtor(res.name, res.about)
      })
      .catch(err => console.log(err))
    
    })();




