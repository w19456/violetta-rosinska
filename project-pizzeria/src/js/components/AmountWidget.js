import {select, settings} from '../settings.js';
import {BaseWidget} from './BaseWidget.js';

export class AmountWidget extends BaseWidget {
  constructor(wrapper) {
    super(wrapper, settings.amountWidget.defaultValue);
    const thisWidget = this;
    thisWidget.getElements(wrapper);
    //thisWidget.setValue(settings.amountWidget.defaultValue);
    thisWidget.initActions();
  }

  getElements() {
    const thisWidget = this;

    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.amount.input);
    thisWidget.dom.linkDecrease = thisWidget.dom.wrapper.querySelector(select.widgets.amount.linkDecrease);
    thisWidget.dom.linkIncrease = thisWidget.dom.wrapper.querySelector(select.widgets.amount.linkIncrease);
  }

  // setValue(value) {
  //   const thisWidget = this;
  //   const newValue = parseInt(value);
  //   const oldValue = thisWidget.value;
  //   if (newValue != oldValue && newValue >= settings.amountWidget.defaultMin && newValue <= settings.amountWidget.defaultMax) {
  //     thisWidget.input.value = newValue;
  //     thisWidget.value = newValue;
  //     thisWidget.announce();
  //   }
  // }

  isValid(newValue) {
    return !isNaN(newValue) && newValue >= settings.amountWidget.defaultMin && newValue <= settings.amountWidget.defaultMax;
  }


  initActions() {
    const thisWidget = this;
    thisWidget.dom.input.addEventListener('change', function () {
      thisWidget.value = thisWidget.dom.input.value;
    });

    thisWidget.dom.linkDecrease.addEventListener('click', function (event) {
      event.preventDefault();
      thisWidget.value = thisWidget.dom.input.value - 1;
    });
    thisWidget.dom.linkIncrease.addEventListener('click', function (event) {
      event.preventDefault();
      thisWidget.value = parseInt(thisWidget.dom.input.value) + 1;
    });
  }

  renderValue() {
    const thisWidget = this;
    thisWidget.dom.input.value = thisWidget.value;
  }

  // announce() {
  //   const thisWidget = this;
  //   const event = new CustomEvent('updated', {
  //     bubbles: true
  //   });
  //   thisWidget.element.dispatchEvent(event);
  // }
}
