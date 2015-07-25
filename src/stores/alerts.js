import Immutable from 'immutable';
import * as ACTIONS from 'app/constants/actionTypes';

let idIterator = 0;
const INIT_STATE = Immutable.fromJS([{
  name: 'Picture a Day',
  id: idIterator++,
  timeWindow: {
    start: '08:00',
    end: '21:30'
  },
  isEnabled: false
}, {
  name: '1 Second Every Day',
  id: idIterator++,
  timeWindow: {
    start: '12:30',
    end: '19:00'
  },
  isEnabled: true
}, {
  name: 'Call Mom',
  id: idIterator++,
  timeWindow: {
    start: '09:00',
    end: '20:00'
  },
  isEnabled: true
}]);

let HANDLERS = {};
HANDLERS[ACTIONS.ADD_ALERT] = function(STATE) {
  return STATE.push({
      name: 'New Alert',
      id: idIterator++,
      timeWindow: {
        start: '09:00',
        end: '21:00'
      },
      isEnabled: true
    });
};
HANDLERS[ACTIONS.DELETE_ALERT] = function(STATE, ACTION) {
  return STATE.filter(alert => alert.id !== ACTION.id);
};
HANDLERS[ACTIONS.NAME_ALERT] = function(STATE, ACTION) {
  var newState = STATE.toJS().map(function(alert) {
    if (alert.id !== ACTION.id) {
      return alert;
    }
    alert.name = ACTION.name;
    return alert;
  });
  console.log('new state', newState);
  return Immutable.fromJS(newState);
  // return Immutable.fromJS(STATE.map(function(alert) {
  //   if (alert.get('id') !== ACTION.id) {
  //     return alert;
  //   }
  //   alert.name = ACTION.name;
  //   return alert;
  // });
};
HANDLERS[ACTIONS.ENABLE_ALERT] = function(STATE, ACTION) {
  return STATE.map(function(alert) {
    if (alert.id !== ACTION.id) {
      return alert;
    }
    alert.isEnabled = true;
    return alert;
  });
};
HANDLERS[ACTIONS.DISABLE_ALERT] = function(STATE, ACTION) {
  return STATE.map(function(alert) {
    if (alert.id !== ACTION.id) {
      return alert;
    }
    alert.isEnabled = false;
    return alert;
  });
};

export default function alerts(STATE = INIT_STATE, ACTION) {

  console.info('reduce state', STATE, ACTION);

  if (ACTION && HANDLERS.hasOwnProperty(ACTION.type)) {
    return HANDLERS[ACTION.type](STATE, ACTION);
  } else {
    return STATE;
  }

}
