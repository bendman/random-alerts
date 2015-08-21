import * as types from 'app/constants/actionTypes';

export function add_alert(alert) {
  return {
     type: types.ADD_ALERT,
     alert
  };
}

export function delete_alert(id) {
  return {
     type: types.DELETE_ALERT,
     id
  };
}

export function name_alert(id, name) {
  return {
     type: types.NAME_ALERT,
     id,
     name
  };
}

export function enable_alert(id) {
  return {
     type: types.ENABLE_ALERT,
     id
  };
}

export function disable_alert(id) {
  return {
     type: types.DISABLE_ALERT,
     id
  };
}

export function set_alert_start(id, start) {
  return {
     type: types.SET_ALERT_START,
     id,
     start
  };
}

export function set_alert_end(id, end) {
  return {
     type: types.SET_ALERT_END,
     id,
     end
  };
}

export function trigger_alert(id) {
  return {
    id
  };
}

export function update_alert(alert) {
  return {
    type: types.UPDATE_ALERT,
    alert
  };
}
