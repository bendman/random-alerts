/*eslint no-unused-vars:0*/
import moment from 'moment';
import Singletons from 'app/controllers/singletons';

function setWithAPI(options) {
  this.schedule({
    id: options.id,
    title: options.title,
    text: options.text,
    led: '005A4E',
    at: moment(options.at).toDate()
  });
}
function removeWithAPI(id) {
  this.cancel(id);
}

var Controller = {

  remove(id) {
    // cancel things here
  },

  set(options) {
    // set things here
  },

  onReady() {
    // Reset fired notifications for tomorrow
    cordova.plugins.notification.local.on('trigger', function(notification) {
      console.warn('alerting', notification.id);
      // TODO: this needs to happen!
    });
  }

};

Singletons.NotificationsController = Controller;

export default Controller;
