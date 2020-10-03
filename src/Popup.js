export default class Popup {
	constructor(element, openClass) {
        this.element = element;
		this.element.querySelector('.popup__close').addEventListener("click", () => this.close());
		this.openClass = openClass;
	}

	open() {
		this.element.classList.add(this.openClass);	
	}

	close() {
		this.element.classList.remove(this.openClass);
	}
}