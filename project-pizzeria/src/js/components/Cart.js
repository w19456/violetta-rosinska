import {select, settings, templates, classNames} from '../settings.js';
import {utils} from '../utils.js';
import {CartProduct} from './CartProduct.js';

export class Cart {
  constructor(element) {
    const thisCart = this;
    thisCart.products = [];
    thisCart.getElements(element);
    thisCart.initActions();
    thisCart.deliveryFee = settings.cart.defaultDeliveryFee;

  }

  getElements(element) {
    const thisCart = this;
    thisCart.dom = {};
    thisCart.dom.wrapper = element;
    thisCart.dom.toggleTrigger = element.querySelector(select.cart.toggleTrigger);
    thisCart.dom.productList = [];
    thisCart.dom.addressInput = element.querySelector(select.cart.address);
    thisCart.dom.phoneInput = element.querySelector(select.cart.phone);
    thisCart.renderTotalsKeys = ['totalNumber', 'totalPrice', 'subtotalPrice', 'deliveryFee'];
    for (let key of thisCart.renderTotalsKeys) {
      thisCart.dom[key] = thisCart.dom.wrapper.querySelectorAll(select.cart[key]);
    }
    thisCart.dom.form = thisCart.dom.wrapper.querySelector(select.cart.form);
  }

  initActions() {
    const thisCart = this;

    thisCart.dom.toggleTrigger.addEventListener('click', function (event) {
      event.preventDefault();
      thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
    });
    thisCart.dom.wrapper.addEventListener('updated', function () {
      thisCart.update();
    });
    thisCart.dom.wrapper.addEventListener('remove', function (event) {
      thisCart.remove(event.detail.cartProduct);
    });
    thisCart.dom.form.addEventListener('submit', function (event) {
      event.preventDefault();
      thisCart.sendOrder();
    });
  }

  sendOrder() {
    const thisCart = this;
    const url = settings.db.url + '/' + settings.db.order;

    const payload = {
      address: thisCart.dom.addressInput.value,
      phone: thisCart.dom.phoneInput.value,
      totalNumber: thisCart.totalNumber,
      subtotalPrice: thisCart.subtotalPrice,
      delivery: thisCart.deliveryFee,
      totalPrice: thisCart.totalPrice,
      products: [],
    };
    for (let product of thisCart.products) {
      const productData = product.getData();
      payload.products.push(productData);
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    fetch(url, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (parsedResponse) {
        console.log('parsedResponse', parsedResponse);
      })
      .catch(function() {
        alert('There has been a problem with sending your order. Please call us at: 666666666666');
      });
  }

  add(menuProduct) {
    const thisCart = this;

    const generatedHTML = templates.cartProduct(menuProduct);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);

    const productWrapper = thisCart.dom.wrapper.querySelector(select.cart.productList);
    productWrapper.appendChild(generatedDOM);
    thisCart.dom.productList.push(generatedDOM);

    thisCart.products.push(new CartProduct(menuProduct, generatedDOM));
    thisCart.update();
  }

  update() {
    const thisCart = this;
    thisCart.totalNumber = 0;
    thisCart.subtotalPrice = 0;
    for (let product of thisCart.products) {
      thisCart.subtotalPrice += product.price;
      thisCart.totalNumber += product.amount;
      console.log(thisCart.totalNumber);
    }
    thisCart.totalPrice = thisCart.subtotalPrice + thisCart.deliveryFee;
    console.log(thisCart.totalPrice);
    for (let key of thisCart.renderTotalsKeys) {
      for (let elem of thisCart.dom[key]) {
        elem.innerHTML = thisCart[key];
      }
    }
  }

  remove(cartProduct) {
    const thisCart = this;
    const index = thisCart.products.indexOf(cartProduct);
    thisCart.products.splice(index, 1);
    cartProduct.dom.wrapper.remove();
    thisCart.update();
  }

}
