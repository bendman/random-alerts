import * as types from 'app/constants/actionTypes';

export function add_alarm() {
  return {
     type: types.ADD_ALARM
  };
}

export function delete_alarm(id) {
  return {
     type: types.DELETE_ALARM,
     id
  };
}

export function name_alarm(id, name) {
  return {
     type: types.NAME_ALARM,
     id,
     name
  };
}

export function enable_alarm(id) {
  return {
     type: types.ENABLE_ALARM,
     id
  };
}

export function disable_alarm(id) {
  return {
     type: types.DISABLE_ALARM,
     id
  };
}

export function set_alarm_start(id, start) {
  return {
     type: types.SET_ALARM_START,
     id,
     start
  };
}

export function set_alarm_end(id, end) {
  return {
     type: types.SET_ALARM_END,
     id,
     end
  };
}
