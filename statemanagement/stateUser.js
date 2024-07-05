const EventEmitter = require("events");

class StateManagerUser extends EventEmitter {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  getState() {
    return this.state;
  }

  updateUserState(userId, newVal) {
    const userIndex = this.state.users.findIndex(
      (user) => user._id.toString() === userId
    );
    if (userIndex !== -1) {
      this.state.users[userIndex] = {
        ...this.state.users[userIndex],
        ...newVal,
      };
      this.emit("stateChange", this.state);
    }
  }

  addUser(user) {
    this.state.users.push(user);
    this.emit("stateChange", this.state);
  }
}

module.exports = StateManagerUser;
