import {select, classNames, templates} from '../settings.js';
import {utils} from '../utils.js';
import {AmountWidget} from './AmountWidget.js';



export class Product {
  constructor(id, data) {
    const thisProduct = this;
    thisProduct.id = id;
    thisProduct.data = data;
    thisProduct.renderInMenu();
    thisProduct.getElements();
    thisProduct.initAccordion();
    thisProduct.initOrderForm();
    thisProduct.initAmountWidget();
    thisProduct.processOrder();

  }

  renderInMenu() {
    const thisProduct = this;
    const generatedHTML = templates.menuProduct(thisProduct.data);
    thisProduct.element = utils.createDOMFromHTML(generatedHTML);
    const menuContainer = document.querySelector(select.containerOf.menu);
    menuContainer.appendChild(thisProduct.element);
  }

  getElements() {
    const thisProduct = this;

    thisProduct.accordionTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
    thisProduct.form = thisProduct.element.querySelector(select.menuProduct.form);
    thisProduct.formInputs = thisProduct.form.querySelectorAll(select.all.formInputs);
    thisProduct.cartButton = thisProduct.element.querySelector(select.menuProduct.cartButton);
    thisProduct.priceElem = thisProduct.element.querySelector(select.menuProduct.priceElem);
    thisProduct.imageWrapper = thisProduct.element.querySelector(select.menuProduct.imageWrapper);
    thisProduct.amountWidgetElem = thisProduct.element.querySelector(select.menuProduct.amountWidget);
  }

  initAccordion() {
    const thisProduct = this;
    const clickableSpace = thisProduct.accordionTrigger;
    clickableSpace.addEventListener('click', function (event) {
      event.preventDefault();
      thisProduct.element.classList.add('active');
      const activeProducts = document.querySelectorAll(select.all.menuProductsActive);
      activeProducts.forEach(function (activeProduct) {
        if (activeProduct != thisProduct.element) {
          activeProduct.classList.remove('active');
        }
      });
    });
  }

  initOrderForm() {
    const thisProduct = this;
    thisProduct.form.addEventListener('submit', function (event) {
      event.preventDefault();
      thisProduct.processOrder();
    });

    for (let input of thisProduct.formInputs) {
      input.addEventListener('change', function () {
        thisProduct.processOrder();
      });
    }

    thisProduct.cartButton.addEventListener('click', function (event) {
      event.preventDefault();
      thisProduct.processOrder();
      thisProduct.addToCart();
    });
  }

  processOrder() {
    const thisProduct = this;
    const formData = utils.serializeFormToObject(thisProduct.form);
    thisProduct.params = {};
    let price = thisProduct.data.price;
    const params = thisProduct.data.params;
    for (let param in params) {
      for (let option in params[param].options) {
        const currentOption = params[param].options[option];
        const imageSelector = '.' + param + '-' + option;
        const image = thisProduct.element.querySelector(imageSelector);
        const paramExist = formData[param] && formData[param].includes(option);
        if (paramExist) {
          if (!thisProduct.params[param]) {
            thisProduct.params[param] = {
              label: params[param].label,
              options: {},
            };
          }
          thisProduct.params[param].options[option] = currentOption.label;
          if (image) {
            image.classList.add(classNames.menuProduct.imageVisible);
          }
          if (!currentOption.default) {
            price += currentOption.price;
          }
        } else {
          if (image) {
            image.classList.remove(classNames.menuProduct.imageVisible);
          }
          if (currentOption.default == true) {
            price -= currentOption.price;
          }
        }
      }
    }
    thisProduct.priceSingle = price;
    thisProduct.price = thisProduct.priceSingle * thisProduct.amountWidget.value;

    thisProduct.priceElem.innerHTML = thisProduct.price;

  }

  initAmountWidget() {
    const thisProduct = this;
    thisProduct.amountWidget = new AmountWidget(thisProduct.amountWidgetElem);
    thisProduct.amountWidgetElem.addEventListener('updated', function () {
      thisProduct.processOrder();
    });
  }

  addToCart() {
    const thisProduct = this;
    thisProduct.name = thisProduct.data.name;
    thisProduct.amount = thisProduct.amountWidget.value;


    const event = new CustomEvent('add-to-cart',{
      bubbles: true,
      detail: {
        product: thisProduct,
      },
    });
    thisProduct.element.dispatchEvent(event);
  }

}
