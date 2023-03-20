export default class EventEmitter {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, callback) {
    this.events[eventName] = this.events?.[eventName] ?? [];
    this.events[eventName].push(callback);
  }

  unsubscribe(eventName, callback) {
    this.events[eventName] = this.events?.[eventName].filter(
      (eventCallback) => eventCallback !== callback
    );
  }

  emit(eventName, data) {
    this.events?.[eventName].forEach((callback) => callback.call(null, data));
  }
}
