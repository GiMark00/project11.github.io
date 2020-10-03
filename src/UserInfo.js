export default class UserInfo {
    constructor(name, work, inputName, inputwork) {
        this.name = name;
        this.work = work;
        this.inputName = inputName;
        this.inputwork = inputwork;
    }

    updateUserInfo(name, work){
        this.name.textContent = name;
        this.work.textContent = work;
    }


    actualAughtor(actualOne, actualTwo) {
        document.querySelector('.user-info__name').textContent = actualOne;
        document.querySelector('.user-info__work').textContent = actualTwo;
        document.querySelector('#name').value = actualOne;
        document.querySelector('#work').value = actualTwo;
      }
}

