import Immutable from 'immutable';
import * as ACTIONS from 'app/constants/actionTypes';
import AlertController from 'app/controllers/alerts';

let idIterator = 0;
const INIT_STATE = Immutable.fromJS([{
  name: 'Picture a Day',
  id: ++idIterator,
  timeWindow: {
    start: '08:00',
    end: '21:30'
  },
  isEnabled: false
}, {
  name: '1 Second Every Day',
  id: ++idIterator,
  timeWindow: {
    start: '12:30',
    end: '19:00'
  },
  isEnabled: true
}, {
  name: 'Call Mom',
  id: ++idIterator,
  timeWindow: {
    start: '09:00',
    end: '20:00'
  },
  isEnabled: true
}]);

let HANDLERS = {};
HANDLERS[ACTIONS.ADD_ALERT] = function(STATE) {
  return STATE.push(Immutable.fromJS({
      name: 'New Alert',
      id: ++idIterator,
      timeWindow: {
        start: '09:00',
        end: '21:00'
      },
      isEnabled: true
    }));
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

export function getNewId() {
  return idIterator;
}

export default function alerts(STATE = INIT_STATE, ACTION) {
  let newState = STATE;

  if (ACTION && HANDLERS.hasOwnProperty(ACTION.type)) {
    newState = HANDLERS[ACTION.type](STATE, ACTION);
  }

  AlertController.updateAll(newState.toJS());

  return newState;
}
