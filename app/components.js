"use strict";

class BaseComponent {

  constructor(tag) {
    this._tag = tag;

    this._attributes = new Map();

    this._classes = new Set();

    this._children = [];

    this._textContent = '';
  }

  setAttribute(attrName, attrValue) {
    this._attributes.set(attrName, attrValue);

    return this;
  }

  addClass(className) {
    this._classes.add(className);

    return this;
  }

  /**
   * @return Dom element
   */
  buildDomElement() {
    const domElement = document.createElement(this._tag);

    var t = document.createTextNode(this._textContent);
    domElement.appendChild(t);

    //рендерим вложенные ноды
    if (this._children.length > 0) {
      this._children.forEach((component) => {
        domElement.appendChild(component.buildDomElement())
      })
    }

    // рендерим вложенные классы
    this.getClasses().forEach(cl => {
      domElement.classList.add(cl);
    });

    // рендерим аттрибуты
    this._attributes.forEach((attrValue, attrKey) => {
      domElement.setAttribute(attrKey, attrValue);
    });

    return domElement;
  }

  getClasses() {
    return this._classes;
  }

  appendChild(child) {
    this._children.push(child);

    return this;
  }

  setTextContet(content) {
    this._textContent = content;

    return this;
  }

}


class Form extends BaseComponent {
  constructor() {
    super("form");
  }
}


class Input extends BaseComponent {


  constructor(id, label, type, hint) {
    super('div');

    this._id = id;
    this._label = label;
    if (type) {
      this._type = type;
    } else  {
      this._type = 'text';
    }

    this._hint = hint;
  }

  buildDomElement() {
    this.addClass('form-group');

    this.appendChild(
      new BaseComponent('label')
        .setAttribute('for', this._id)
        .setTextContet(this._label)
    );

    const input = new BaseComponent('input')
      .setAttribute('type', this._type)
      .setAttribute('id', this._id)
      .addClass('form-control');
    this.appendChild(input);

    if (this._hint) {
      this.appendChild(
        new BaseComponent('small')
          .addClass('form-text')
          .addClass('text-muted')
          .setTextContet(this._hint)
      );
    }

    return super.buildDomElement();
  }

}


class Button extends BaseComponent {


  constructor(label) {
    super('div');
    this._label = label;
  }

  buildDomElement() {
    this.addClass('form-group');

    this.appendChild(
      new BaseComponent('button')
        .setAttribute('type', 'button')
        .setTextContet(this._label)
        .addClass('btn')
        .addClass('btn-primary')
    );

    return super.buildDomElement();
  }

}
