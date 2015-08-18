let isReady = false;

var Controller = {

  remove(id) {
    if (isReady) {
      cordova.plugins.notification.local.cancel(id);
    }
  },

  set(options) {
    if (!isReady) {
      return false;
    }
    cordova.plugins.notification.local.schedule({
      id: options.id,
      title: options.title,
      text: options.text,
      led: 'ED52B9',
      at: options.at
    });
  },

  onReady() {
    isReady = true;
    cordova.plugins.notification.local.on('trigger', function(notification) {
      console.warn('alerting', notification.id);
    });
  }

};

// document.addEventListener('deviceready', Controller.handleEvents);

export default Controller;
