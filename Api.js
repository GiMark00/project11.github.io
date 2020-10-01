class Api {
  constructor(config) {
    this.url = config.url;
    this.authorization = config.authorization;
  }

  getCards(){
    return fetch(`${this.url}/cards`, {
      method: 'GET',
      headers: {
        authorization: this.authorization
      } 
    })
    /*
      Можно лучше: проверка ответа сервера и преобразование из json
      дублируется во всех методах класса Api, лучше вынести в отдельный метод:
        _getResponseData(res) {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
        }
      Подчеркивание в начале имени метода говорит о том, что метод является приватным, т.е.
      не используется вне класса Api   
    */
    .then ((res) => {
    /* 
      есть Надо исправить: здесь и в остальных методах не хватает проверки, что запрос выполнился успешно - res.ok
      Если запрос завершился ошибкой должен возвращаться отклоненный промис
      https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
      https://developer.mozilla.org/ru/docs/Web/API/Fetch_API/Using_Fetch#Проверка_успешности_запроса
      Пример обработки ошибок есть в самом конце задания
    */
      if(res.ok) {
        return res.json()
      }
    })
    .catch(err => console.log(err))
  }
  

 sendRequest() {
  return fetch(`${this.url}/users/me`, {
    method: 'GET',
    headers: {
      authorization: this.authorization
    } 
  })
  .then ((res) => {
    if(res.ok) {
      return res.json()
    }
  })
  .catch(err => console.log(err))
  }

  changeProfile(elementName, elementAbout) {
    
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": elementName,
        "about": elementAbout,
      })
    })
    .then (res => {
      if(res.ok) {
        return res.json();
      }
    })
    .catch(err => console.log(err))
    
  }
  
}


