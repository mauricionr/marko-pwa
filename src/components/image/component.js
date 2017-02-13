var raptorPubsub = require('raptor-pubsub');
var extend = require('raptor-util/extend');

module.exports = {
  onMount(input) {
    console.log('[IMAGE MOUNTED]');
  },
  open() {
    this.el.classList.toggle('opened')
  }
};