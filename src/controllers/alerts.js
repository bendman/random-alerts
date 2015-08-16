import moment from 'moment';

let isReady = false;
let firedAlerts = {

};

function getRangeSpread(start, end) {
  let rangeStart = moment(start, 'HH:mm');
  let rangeEnd = moment(end, 'HH:mm');
  return rangeEnd.diff(rangeStart);
}

var Controller = {

  set(options) {
    // Use now for a comparison
    const NOW = moment();

    let start = moment(options.range.start, 'HH:mm');
    let end = moment(options.range.end, 'HH:mm');

    // Handle times for later dates
    // TODO handling for overnight ranges
    if (options.firedThisCycle) {
      start.add(1, 'day');
      end.add(1, 'day');
    }

    // Ensure the range start is after NOW
    if (start.isBefore(NOW)) {
      start = moment(NOW).clone();
    }

    // Get the range in milliseconds for randomization
    let rangeSpread = getRangeSpread(start, end);

    // Get a random target time from the range
    let targetTime = moment()
      .add(parseInt(Math.random() * rangeSpread, 10), 'milliseconds');

    let wait = 0;

    wait = targetTime.diff(NOW);

    options.text += ' ' + moment.duration(wait).asSeconds();

    if (!isReady) {
      return;
    }

    cordova.plugins.notification.local.schedule({
      id: options.id,
      title: options.title,
      text: `Random Alert @ ${targetTime.format('HH:mm')}`,
      led: 'ED52B9',
      at: targetTime.clone().toDate()
    });

    // window.setTimeout(function() {
    //
    //   window.alert(`${options.title}\n\n${options.text}`);
    // }, wait);
  },

  remove(id) {
    if (isReady) {
      cordova.plugins.notification.local.cancel(id);
    }
  },

  // Update all of the arrays to match the current state
  updateAll(alerts) {
    alerts.forEach(this.update.bind(this));
  },

  // Update a single alert to match it's current state
  update(alert) {
    if (!alert.isEnabled) {
      this.remove(alert.id);
    } else {
      let lastFire = firedAlerts[alert.id];
      // Use this to determine if it has already fired this cycle
      let firedThisCycle = false;
      // if alert.lastFire is after the current possible range of time,
      // firedThisCycle => true;
      firedThisCycle = lastFire && moment(lastFire).isAfter(alert.timeWindow.start);
      //
      // TODO handling for overnight ranges

      this.set({
        id: alert.id,
        title: alert.name,
        firedThisCycle: firedThisCycle,
        range: {
          start: alert.timeWindow.start,
          end: alert.timeWindow.end
        }
      });
    }
  },

  handleEvents() {
    isReady = true;
    cordova.plugins.notification.local.on('trigger', function(notification) {
      firedAlerts[notification.id] = moment();
    });
  }

};

document.addEventListener('deviceready', Controller.handleEvents);

export default Controller;
