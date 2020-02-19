/**
* Class Test
* @param {null} empty no argument.
*/
class Test {
  /**
  * Constructor
  * @param {null} empty no argument.
  */
  constructor() {
    if (!this.setVars()) {
      return;
    }
    this.setEvents();
  }

  /**
  * Vars
  * @param {null} empty no argument.
  * @return {boolean} true.
  */
  setVars() {
    this.form = document.querySelector('.form');
    if (!this.form) {
      return;
    }
    return true;
  }

  /**
  * Events
  * @param {null} empty no argument.
  */
  setEvents() {
    console.log('test');
  }
}
