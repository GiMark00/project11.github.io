export default class Api {
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
    
    .then ((res) => {
    
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


