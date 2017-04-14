var raptorPubsub = require('raptor-pubsub');
var extend = require('raptor-util/extend');

module.exports = {
  onCreate(input) {
    console.log('[IMAGE SRC:SERVER]', input.src);
    console.log('[IMAGE CREATE:SERVER]');
  },
  onMount(input) {
    console.log('[IMAGE MOUNTED:CLIENT]');
  },
  open() {
    this.el.classList.toggle('opened');
  }
};