import Immutable from 'immutable';
import * as ACTIONS from 'app/constants/actionTypes';
import 'app/controllers/alerts';
import Singletons from 'app/controllers/singletons';

let idIterator = 0;

// Use this to make new alerts
export function newAlert() {
  return {
    name: 'New Alert',
    id: null,
    timeWindow: {
      start: '09:00',
      end: '21:00'
    },
    isEnabled: true
  };
}

// Set the initial state from local storage or defaults
const INIT_STATE = (function() {
  let alerts = Singletons.AlertsController.fetch();
  console.info('fetched', alerts);

  if (!alerts) {
    alerts = [{
      name: 'Demo Alert',
      id: ++idIterator,
      timeWindow: {
        start: '08:00',
        end: '21:30'
      },
      isEnabled: true
    }];
    Singletons.AlertsController.save(alerts);
  }

  return Immutable.fromJS(alerts);
}());
let currentState = INIT_STATE;

let HANDLERS = {};
HANDLERS[ACTIONS.ADD_ALERT] = function(STATE, ACTION) {
  let createdAlert = ACTION.alert;
  createdAlert.id = ++idIterator;
  return STATE.push(Immutable.fromJS(createdAlert));
};
HANDLERS[ACTIONS.DELETE_ALERT] = function(STATE, ACTION) {
  return STATE.filter(alert => alert.get('id') !== ACTION.id);
};
HANDLERS[ACTIONS.NAME_ALERT] = function(STATE, ACTION) {
  return STATE.map(function(alert) {
    if (alert.get('id') === ACTION.id) {
      alert = alert.set('name', ACTION.name);
    }
    return alert;
  });
};
HANDLERS[ACTIONS.ENABLE_ALERT] = function(STATE, ACTION) {
  return STATE.map(function(alert) {
    if (alert.get('id') === ACTION.id) {
      alert = alert.set('isEnabled', true);
    }
    return alert;
  });
};
HANDLERS[ACTIONS.DISABLE_ALERT] = function(STATE, ACTION) {
  return STATE.map(function(alert) {
    if (alert.get('id') === ACTION.id) {
      alert = alert.set('isEnabled', false);
    }
    return alert;
  });
};
HANDLERS[ACTIONS.SET_ALERT_START] = function(STATE, ACTION) {
  return STATE.map(function(alert) {
    if (alert.get('id') === ACTION.id) {
      alert = alert.setIn(
        [ 'timeWindow', 'start' ],
        ACTION.start
      );
    }
    return alert;
  });
};
HANDLERS[ACTIONS.SET_ALERT_END] = function(STATE, ACTION) {
  return STATE.map(function(alert) {
    if (alert.get('id') === ACTION.id) {
      alert = alert.setIn(
        [ 'timeWindow', 'end' ],
        ACTION.end
      );
    }
    return alert;
  });
};
HANDLERS[ACTIONS.UPDATE_ALERT] = function(STATE, ACTION) {
  return STATE.map(function(alert) {
    if (alert.get('id') === ACTION.alert.id) {
      alert = Immutable.fromJS(ACTION.alert);
    }
    return alert;
  });
};

export function getNewId() {
  return idIterator;
}

function updateStore(STATE = currentState, ACTION) {
  let newState = STATE;

  if (ACTION && HANDLERS.hasOwnProperty(ACTION.type)) {
    newState = HANDLERS[ACTION.type](STATE, ACTION);
  }

  let updated = Singletons.AlertsController.updateAll(newState.toJS(), ACTION);
  console.log('updating alerts', ACTION, updated);

  currentState = Immutable.fromJS(updated);
  return currentState;
}

Singletons.Store = {
  update: updateStore
};

export default updateStore;
