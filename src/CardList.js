export default class CardList {

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