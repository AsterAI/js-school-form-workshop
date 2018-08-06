"use strict";

class App {
  // _appDomId;
  constructor(containerId) {
    this._appDomId = containerId;
  }

  run() {
    const container = document.getElementById(this._appDomId);
    container.appendChild(this._buildFormDom());
    // console.log("run")
  }

  _buildFormDom() {
    const rowContainer = new BaseComponent('div').addClass('row');
    const form = new Form();
    form
      .appendChild(new Input('exampleInputEmail1', 'User email' , 'email', 'We will newer send you info to other actors'))
      .appendChild(new Input('userName', 'User name'))
      .appendChild(new Input('userPassword', 'User password' , 'password'))
      .appendChild(new Button('Save user data'));

    rowContainer.appendChild(form);

    return rowContainer.buildDomElement();
  }


}
