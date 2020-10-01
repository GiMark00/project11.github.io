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
      url:'https://nomoreparties.co/cohort12',
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
      /*
        Можно лучше: передавать сюда ссылку как параметр функции, а не брать из стилей карточки
        Т.к. структура карточи описана в Card и если мы берем изображения из элемента карточки здесь, то
        это нарушает принцип единственной ответсвенности
      */
      imagePicture.src = event.target.style.backgroundImage.slice(5, -2); 
      popupImage.open();
    }


    const createCardFunction = (name, link) => {
      const card = new Card(name, link, imagePopupOpen, template);
      return card.create();
    }
    //создаем экзмепляр класса
    
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

/*
    У Вас хорошая работа - класс Api создан, запросы на сервер выполняются, но есть
    несколько мест, которые нужно поправить:

    Надо исправить:
    - ok в конструктор класса Api передавайте только базовый 
      адрес, а адрес ендпоинта подставляйте в самом методе
      
    - ok ключ авторизации не должен быть захардкожен, используйте 
      ключ, который передается в констуктор класса

    - ok в методах класса Api не хватает проверки, что запрос выполнился успешно

    - OK все изменения на странице должны происходить, только после того, как
      сервер ответил подтверждением
      
    - ok у запроса карточек в классе CardList и у запроса api.changeProfile нет обработчки ошибок

*/

/*
    Все замечания исправлены, кроме:
    - в методах класса Api не хватает проверки, что запрос выполнился успешно

    Не забудьте поправить, в задании есть пример:
    .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, переходим в catch
        return Promise.reject(`Ошибка: ${res.status}`);   //нужно вернуть отклоненный промис
    })

    Для закрепления полученных знаний советую сделать и оставшуюся часть задания.
    Что бы реализовать оставшуюся часть задания необходимо разобраться с Promise.all
    https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
    Для отрисовки карточек нужен id пользователя, поэтому отрисовать мы сможем их только
    после получения с сервера данных пользователя
    Выглядит этот код примерно так:
      Promise.all([     //в Promise.all передаем массив промисов которые нужно выполнить
        api.getUserData(),
        api.getInitialCards()
      ])    
        .then((values)=>{    //попадаем сюда когда оба промиса будут выполнены
          const [userData, initialCards] = values;
          ......................  //все данные получены, отрисовываем страницу
        })
        .catch((err)=>{     //попадаем сюда если один из промисов завершится ошибкой
          console.log(err);
        })
        

    Если у Вас будет свободное время так же попробуйте освоить работу с сервером
    применив async/await для работы с асинхронными запросами.
    https://learn.javascript.ru/async-await
    https://habr.com/ru/company/ruvds/blog/414373/
    https://www.youtube.com/watch?v=SHiUyM_fFME
    Это часто используется в реальной работе

    Успехов в дальнейшем обучении!
*/















/*
    Отличная работа, все задание реализовано верно

    Места, где можно улучшить программу:
    - в конструктор класса Card лучше передавать не отдельные параметры, а сразу весь объект с данными карточки
    - в imagePopupOpen передавать сразу this.link, а не event.target
    - массив карточек лучше передавать не в конструктор, а в метод render
    - сообщения об ошибках валидации вынести в отдельный объект, а не хардкодить их в методе

    Если захотите углубиться в тему ООП и рефакторинга оставлю пару ссылок:
    https://ota-solid.now.sh/ - принципы проектирования SOLID применяемые для проектирования ООП программ  
    https://refactoring.guru/ru/design-patterns - паттерны проектирования
    https://refactoring.guru/ru/refactoring - рефакторинг

    Успехов в дальнейшем обучении!
*/


