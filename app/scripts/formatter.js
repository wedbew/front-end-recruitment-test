/**
 * Create element.
 * @param {null} empty no argument.
 */
class Formatter {
  /**
   * Create element.
   * @param {null} empty no argument.
   */
  constructor() {
    if (!this.setVars()) {
      return;
    }
    this.setEvents();
  }
  /**
   * Create element.
   * @param {null} empty no argument.
   * @return {boolean}
   */
  setVars() {
    this.form = document.querySelector('.form');
    if (!this.form) {
      return;
    }
    return true;
  }
  /**
   * Create element.
   * @param {null} empty no argument.
   */
  setEvents() {
    console.log('Formatter');
  }
}
