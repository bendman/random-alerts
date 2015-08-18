import moment from 'moment';
import Immutable from 'immutable';
import Notifications from './notifications';

const TIME_FORMAT = 'HH:mm';

// Return a moment between a start and end time
function getRandomMoment(start, end) {
  let rangeStart = moment(start, 'HH:mm');
  let rangeEnd = moment(end, 'HH:mm');

  // Create a randomized offset for a time between start and end
  let offset = parseInt(Math.random() * rangeEnd.diff(start, 'seconds'), 10);
  let target = rangeStart.clone().add(offset, 'seconds');

  console.info('target time', target.format('HH:mm:ss'));
  return target;
}

let Controller = {

  fetch() {
    let fetched = localStorage.getItem('alerts');
    return fetched ? JSON.parse(fetched) : null;
  },

  save(store) {
    if (store instanceof Immutable.List) {
      store = store.toJS();
    }
    let storable = JSON.stringify(store);
    localStorage.setItem('alerts', storable);
  },

  remove(id) {
    Notifications.remove(id);
  },

  // Update all of the arrays to match the current state
  updateAll(alerts) {
    let updatedAlerts = alerts.map(this.update.bind(this));
    console.info('updatedAlerts', updatedAlerts);
    return updatedAlerts;
  },

  // Update a single alert to match it's current state
  update(alert) {
    let earliest = moment(alert.timeWindow.start, TIME_FORMAT);
    let latest = moment(alert.timeWindow.end, TIME_FORMAT);

    // For overnight end times, add a day
    if (latest.isBefore(earliest)) {
      latest.add(1, 'day');
    }

    if (!alert.isEnabled) {
      this.remove(alert.id);

    } else if (
      !alert.nextFiring ||
      !moment(alert.nextFiring).isBetween(earliest, latest)
    ) {
      // nextFiring isn't set for today yet, and needs a value
      console.warn('replacing nextFiring', alert.nextFiring);
      alert.nextFiring = getRandomMoment(earliest, latest).toJSON();
    }

    return alert;
  }

};


export default Controller;
