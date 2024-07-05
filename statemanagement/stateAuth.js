const EventEmitter = require("events");

class StateManagerAuth extends EventEmitter {
  constructor() {
    super();
    this.state = {
      loggedInUsers: [],
    };
  }

  getState() {
    return this.state;
  }

  addUser(user) {
    this.state.loggedInUsers.push(user);
    this.emit("stateChange", this.state);
  }

  removeUser(userId) {
    this.state.loggedInUsers = this.state.loggedInUsers.filter(
      (user) => user._id.toString() !== userId
    );
    this.emit("stateChange", this.state);
  }
}

module.exports = StateManagerAuth;
