import * as TYPES from 'app/constants/actionTypes';

export function add_alert(alert) {
  return {
     type: TYPES.ADD_ALERT,
     alert
  };
}

export function delete_alert(id) {
  return {
     type: TYPES.DELETE_ALERT,
     id
  };
}

export function trigger_alert(id) {
  return {
    type: TYPES.TRIGGER_ALERT,
    id
  };
}

export function update_alert(alert) {
  return {
    type: TYPES.UPDATE_ALERT,
    alert
  };
}
