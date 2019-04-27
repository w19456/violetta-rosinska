import {select, settings} from '../settings.js';
export class AmountWidget {
  constructor(element) {
    const thisWidget = this;
    thisWidget.getElements(element);
    thisWidget.setValue(settings.amountWidget.defaultValue);
    thisWidget.initActions();
  }

  getElements(element) {
    const thisWidget = this;

    thisWidget.element = element;
    thisWidget.input = thisWidget.element.querySelector(select.widgets.amount.input);
    thisWidget.linkDecrease = thisWidget.element.querySelector(select.widgets.amount.linkDecrease);
    thisWidget.linkIncrease = thisWidget.element.querySelector(select.widgets.amount.linkIncrease);
  }

  setValue(value) {
    const thisWidget = this;
    const newValue = parseInt(value);
    const oldValue = thisWidget.value;
    if (newValue != oldValue && newValue >= settings.amountWidget.defaultMin && newValue <= settings.amountWidget.defaultMax) {
      thisWidget.input.value = newValue;
      thisWidget.value = newValue;
      thisWidget.announce();
    }
  }

  initActions() {
    const thisWidget = this;
    thisWidget.input.addEventListener('change', function () {
      thisWidget.setValue(thisWidget.input.value);
    });

    thisWidget.linkDecrease.addEventListener('click', function (event) {
      event.preventDefault();
      thisWidget.setValue(thisWidget.input.value - 1);
    });
    thisWidget.linkIncrease.addEventListener('click', function (event) {
      event.preventDefault();
      thisWidget.setValue(parseInt(thisWidget.input.value) + 1);
    });
  }

  announce() {
    const thisWidget = this;
    const event = new CustomEvent('updated', {
      bubbles: true
    });
    thisWidget.element.dispatchEvent(event);
  }
}
