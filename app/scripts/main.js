// import Formatter from './formatter';
/*
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features

  const isLocalhost = Boolean(window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
  );

  if (
    'serviceWorker' in navigator
    && (window.location.protocol === 'https:' || isLocalhost)
  ) {
    navigator.serviceWorker.register('service-worker.js')
      .then(function(registration) {
        // updatefound is fired if service-worker.js changes.
        registration.onupdatefound = function() {
          // updatefound is also fired the very first time the SW is installed,
          // and there's no need to prompt for a reload at that point.
          // So check here to see if the page is already controlled,
          // i.e. whether there's an existing service worker.
          if (navigator.serviceWorker.controller) {
            // The updatefound event implies that registration.installing is set
            // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
            const installingWorker = registration.installing;

            installingWorker.onstatechange = function() {
              switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                    'service worker became redundant.');

              default:
                  // Ignore
              }
            };
          }
        };
      }).catch(function(e) {
        console.error('Error during service worker registration:', e);
      });
  }


  // new Formatter();

  // Your custom JavaScript goes here

  // Clone Img
  /**
   * Clone image
   * @param {null} empty no argument.
   */
  function cloneImgElement() {
    const btn = document.querySelector('button');
    const img = document.querySelector('img');
    const container = document.querySelector('.container');
    const attrs = [...img.attributes];

    btn.addEventListener('click', cloneImg);

    /**
     * Create element.
     * @param {null} empty no argument.
     */
    function cloneImg() {
      const element = document.createElement('img');
      attrs.forEach(
        (el, i) => element.setAttribute(attrs[i].name, attrs[i].value));
      container.appendChild(element);
    };
  }
  cloneImgElement();

  // List of caountries
  /**
   * Fetch country list
   * @param {null} empty no argument.
   */
  function fetchCountries() {
    const path = window.location.origin;
    const countries = 'countries.json';
    const listOfCountries = path + '/' + countries;

    fetch(listOfCountries)
      .then( (res) => res.json() )
      .then( (data) => {
        const items = data;
        const select = document.querySelector('#country');
        items.forEach( (item) => {
          const option = document.createElement('span');
          option.setAttribute('value', item.name);
          option.innerText = item.name;
          if (item.name === 'United States') {
            option.setAttribute('data-selected', true);
          }
          option.classList.add('form__option');
          select.appendChild(option);
        });
        openSelect();
      })
      .catch( (err) => {
        console.log(err);
        const select = document.querySelector('#country');
        const option = document.createElement('option');
        option.setAttribute('value', 'United States');
        option.innerText = 'United States';
        option.classList.add('form__option');
        select.appendChild(option);
      });
  }
  fetchCountries();

  /**
   * Open select
   * @param {null} empty no argument.
   */
  function openSelect() {
    const input = document.querySelector('input[name="country"]');
    const inputs = document.querySelectorAll('.form__input');
    const select = document.querySelector('.form__datalist');
    const options = document.querySelectorAll('.form__option');
    const arrow = document.querySelector('.form__icon--arrow');
    input.addEventListener('keyup', (e) => {
      const value = document.querySelector('input[name="country"]').value;
      options.forEach((option) => {
        if (option.textContent.toUpperCase().indexOf(value.toUpperCase()) > -1) {
          option.style.display = '';
        } else {
          option.style.display = 'none';
        }
      });
    });
    inputs.forEach((item)=> {
      item.addEventListener('focus', () => {
        if (item.getAttribute('name') !== 'country') {
          select.classList.remove('form__datalist--active');
        }
      });
    });
    input.addEventListener('click', (e) => {
      select.classList.toggle('form__datalist--active');
    });
    arrow.addEventListener('click', () => {
      if (select.classList.contains('form__datalist--active')) {
        select.classList.remove('form__datalist--active');
      } else {
        select.classList.toggle('form__datalist--active');
      }
    });
    options.forEach((option) => {
      const input = document.querySelector('input[name="country"]');
      if (option.getAttribute('data-selected')) {
        input.value = option.innerText;
      }
      option.addEventListener('click', (e) => {
        input.value = e.target.innerText;
      });
    });
  }

  /**
   * Form validation
   * @param {null} empty no argument.
   */
  function validation() {
    const formCta = document.querySelector('#btn2');
    const form = document.querySelector('.form');

    formCta.addEventListener('click', (e) => {
      e.preventDefault();
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      required();
      minLength();
      emailValidation();
      const errors = catchErros();
      const response = document.querySelector('.form__response');
      const succes = response.querySelector('.form__response--success');
      const error = response.querySelector('.form__response--error');
      const loader = document.querySelector('.form__loader');
      loader.hidden = true;
      response.hidden = true;
      error.hidden = true;
      succes.hidden = true;
      if (errors === true) {
        response.hidden = false;
        error.hidden = false;
        succes.hidden = true;
      } else {
        response.hidden = false;
        loader.hidden = false;
        setTimeout(() => {
          loader.hidden = true;
          succes.hidden = false;
          error.hidden = true;
        }, 5000);
        setTimeout(() => {
          response.hidden = true;
          const inputs = [...document.querySelectorAll('.form__input')];
          inputs.forEach( (input) => {
            input.value = '';
          });
        }, 8000);
      }
    });
  }
  validation();

  /**
   * Catch error.
   * @param {null} empty no argument.
   * @return {boolean}
   */
  function catchErros() {
    const inputs = [...document.querySelectorAll('.form__input')];
    const errors = [];
    inputs.forEach( (input) => {
      const parent = input.parentElement.parentElement;
      const error = parent.querySelector('[data-error]');
      if (error == null) {
        console.log('error');
      } else {
        errors.push(error);
      }
    });
    if (errors.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Check if value is not null.
   * @param {null} empty no argument.
   */
  function required() {
    const inputs = [...document.querySelectorAll('.form__input')];
    inputs.forEach( (input) => {
      const value = input.value.length;
      const required = 'This field is required';
      const parent = input.parentElement.parentElement;
      if (!value > 0) {
        parent.querySelector('.form__error--required').innerText = required;
        parent.querySelector('.form__error--required')
          .setAttribute('data-error', true);
      } else {
        parent.querySelector('.form__error--required').innerText = '';
        parent.querySelector('.form__error--required')
          .removeAttribute('data-error');
      }
    });
  }

  /**
   * Check if value is not null.
   * @param {null} empty no argument.
   */
  function minLength() {
    const inputs = [...document.querySelectorAll('.form__input--minlen')];
    inputs.forEach( (input) => {
      const value = input.value.length;
      const minlen = 'This value is too short';
      const parent = input.parentElement.parentElement;
      if (value < 2) {
        parent.querySelector('.form__error--minlen').innerText = minlen;
        parent.querySelector('.form__error--minlen')
          .setAttribute('data-error', true);
      } else {
        parent.querySelector('.form__error--minlen').innerText = '';
        parent.querySelector('.form__error--minlen')
          .removeAttribute('data-error');
      }
    });
  }

  // Email
  /**
   * Regex on email input value.
   * @param {string} input DOM input element.
   * @return {boolean}
   */
  function regExEmail(input) {
    // eslint-disable-next-line max-len
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRegEx.test(String(input.value).toLowerCase());
  }

  /**
   * Email validation.
   * @param {string} input DOM input element.
   */
  function emailValidation(input) {
    let email;
    if (input == undefined) {
      email = document.querySelector('#email');
    } else {
      email = input;
    }
    const validation = regExEmail(email);
    const error = document.querySelector('.form__error--email');
    const errorName = 'Email format is inncroect';
    if (validation === true) {
      if (error) {
        error.remove('data-error');
        error.innerText = '';
      }
    } else {
      if (error) {
        error.setAttribute('data-error', true);
        error.innerText = errorName;
      }
    }
  }

  /**
   * Remove errors
   * @param {null} empty no argument.
   */
  function removeErrors() {
    const inputs = [...document.querySelectorAll('.form__input')];
    inputs.forEach( (input) => {
      input.addEventListener('keyup', (e) => {
        switch (e.target.value.length) {
        case (e.target.value.length > 0):
          e.target.parentElement.parentElement
            .querySelector('.form__error--required')
            .removeAttribute('data-error');
          e.target.parentElement.parentElement
            .querySelector('.form__error--required').innerText = '';
          break;
        }
      });
    });
  }

  /**
   * Iitial values.
   * @param {null} empty no argument.
   */
  function init() {
    const creditCard = document.querySelector('[data-cc]');
    creditCard.classList.add('icon-visa');
    creditCard.classList.add('form__icon--visa');
    creditCard.classList.remove('icon-mastercard');
    creditCard.classList.remove('form__icon--mastercard');
    new Cleave('#phone', {
      phone: true,
      phoneRegionCode: 'us',
    });
    new Cleave('#postal', {
      numericOnly: true,
      blocks: [5],
    });
    new Cleave('#security', {
      numericOnly: true,
      blocks: [3],
    });
    new Cleave('#date', {
      date: true,
      datePattern: ['m', 'y'],
    });
    new Cleave('#credit', {
      creditCard: true,
      onCreditCardTypeChanged: function(e) {
        const cardName = e;
        switch (cardName) {
        case 'mastercard':
          creditCard.classList.add('icon-mastercard',
            'form__icon--mastercard');
          creditCard.classList.remove('icon-visa', 'form__icon--visa');
          break;
        case 'visa':
          creditCard.classList.remove('icon-mastercard',
            'form__icon--mastercard');
          creditCard.classList.add('icon-visa',
            'form__icon--visa');
          break;
        default:
          console.log(cardName);
          creditCard.classList.remove('icon-mastercard',
            'form__icon--mastercard');
          creditCard.classList.add('icon-visa', 'form__icon--visa');
        }
      },
    });
    removeErrors();
  }
  init();
})();
