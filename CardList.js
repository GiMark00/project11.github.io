class CardList {
/* 
	Можно лучше: массив карточек лучше передавать не в конструктор, а в метод render, т.к.
	в следующей проектной работе карточки будут приходить с сервера и при создании класс CardList
	их у нас ещё не будет
*/
  constructor(container, api, createCardFunction) {
    this.container = container;
    this.api = api;
    this.createCardFunction = createCardFunction;
  }

  addCard(name, link) {
    const card = this.createCardFunction(name, link);
    this.container.appendChild(card);
  }


  render(){
    this.api.getCards()
    .then((res)=>{
        res.forEach((elem)=>{
          this.addCard(elem.name, elem.link)
        })
      
      })
    .catch(err => console.log(err))
  }

  
}