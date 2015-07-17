let timers = [{
  name: 'Picture a Day',
  id: 0,
  timeWindow: {
    start: '08:00',
    end: '21:30'
  },
  isEnabled: false
}, {
  name: '1 Second Every Day',
  id: 1,
  timeWindow: {
    start: '12:30',
    end: '19:00'
  },
  isEnabled: true
}, {
  name: 'Call Mom',
  id: 2,
  timeWindow: {
    start: '09:00',
    end: '20:00'
  },
  isEnabled: true
}];

export default {

  get(id) {
    if (id === undefined) {
      return timers;
    } else {
      id = Number(id);
      return timers.filter(timer => timer.id === id)[0];
    }
  },

  set(id, newState) {
    let timer = this.get(id);
    console.log('setting timer', timer);
  }

};
