import moment from 'moment';
import Singletons from 'app/controllers/singletons';
import Actions from 'app/actions';
import ACTIONS from 'app/constants/actionTypes';

let apiGetter = (function() {
  let resolve, reject;
  let promise = new Promise(function(res, rej) {
    resolve = res;
    reject = rej;
  });
  return { resolve, reject, promise };
}());

function setWithAPI(options) {
  this.schedule({
    id: options.id,
    title: options.title,
    text: options.text,
    led: '7700DD',
    at: moment(options.at).toDate()
  });
}
function removeWithAPI(id) {
  this.cancel(id);
}

var Controller = {

  remove(id) {
    apiGetter.promise.then((api) => {
      removeWithAPI.call(api, id);
    });
  },

  set(options) {
    apiGetter.promise.then((api) => {
      setWithAPI.call(api, options);
    });
  },

  onReady() {
    apiGetter.resolve(cordova.plugins.notification.local);
    // Reset fired notifications for tomorrow
    cordova.plugins.notification.local.on('trigger', function(notification) {
      Singletons.Store.update(
        undefined,
        Actions[ACTIONS.TRIGGER_ALERT](notification.id)
      );
    });
  }

};

Singletons.NotificationsController = Controller;

export default Controller;
