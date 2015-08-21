import moment from 'moment';
import Immutable from 'immutable';
import 'app/controllers/notifications';
import Singletons from 'app/controllers/singletons';
import * as ACTIONS from 'app/constants/actionTypes';

const TIME_FORMAT = 'HH:mm';

// Return a moment between a start and end time
function getRandomMoment(start, end) {
  let rangeStart = moment(start, 'HH:mm');
  let rangeEnd = moment(end, 'HH:mm');

  // Create a randomized offset for a time between start and end
  let offset = parseInt(Math.random() * rangeEnd.diff(start, 'seconds'), 10);
  let target = rangeStart.clone().add(offset, 'seconds');

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

  // Update all of the arrays to match the current state
  updateAll(alerts, ACTION) {
    if (ACTION.type === ACTIONS.DELETE_ALERT) {
      Singletons.NotificationsController.remove(ACTION.id);
    } else if (ACTION.type === ACTIONS.TRIGGER_ALERT) {
      let triggered = alerts.filter((alert) => alert.id === ACTION.id)[0];
      if (triggered) {
        triggered.nextFiring = true;
      }
    }

    let updatedAlerts = alerts.map(this.update.bind(this));
    this.save(updatedAlerts);
    return updatedAlerts;
  },

  // Update a single alert to match it's current state
  update(alert) {
    // Get range start time, or "now" if already passed
    let earliest = moment.max(
      moment(),
      moment(alert.timeWindow.start, TIME_FORMAT)
    );
    // Get range end time
    let latest = moment(alert.timeWindow.end, TIME_FORMAT);

    // For overnight end times or times before now, add a day
    if (latest.isBefore(earliest)) {
      latest.add(1, 'day');
    }

    if (!alert.isEnabled) {
      // Remove disabled alerts
      Singletons.NotificationsController.remove(alert.id);

    } else {

      // nextFiring isn't set for today yet, and needs a value
      if (
        !alert.nextFiring || // not yet set
        alert.nextFiring === true || // already fired today
        !moment(alert.nextFiring).isBetween(earliest, latest) // needs new time
      ) {
        let randomMoment = getRandomMoment(earliest, latest);
        if (alert.nextFiring === true) {
          randomMoment.add(1, 'day');
        }
        alert.nextFiring = randomMoment.toJSON();
      }

      // update the whole alert (this even updates text if at the same time)
      Singletons.NotificationsController.set({
        id: alert.id,
        title: alert.name,
        text: alert.name,
        at: alert.nextFiring
      });
    }

    return alert;
  }

};

Singletons.AlertsController = Controller;

export default Controller;
