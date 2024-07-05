const Errors = require("../error/error");
const StateManager = require("../statemanagement/stateUser");

class UserController {
  userRepository;
  authRepository;
  stateManager;

  constructor(_userRepository, _authRepository, stateManager) {
    this.userRepository = _userRepository;
    this.authRepository = _authRepository;
    this.stateManager = stateManager;
  }

  async getUser(userId) {
    const user = await this.userRepository.getUser(userId);
    return user;
  }

  async updateUser(userId, val) {
    const user = await this.userRepository.updateUser(userId, val);
    this.stateManager.updateUserState(userId, val);
    return user;
  }

  async addUser(user) {
    const newUser = await this.userRepository.addUser(user);
    this.stateManager.addUser(newUser);
    return newUser;
  }

  async getRestaurantsAdmins() {
    const admins = await this.userRepository.getRestaurantsAdmins();
    return admins;
  }

  async getRestaurantCashiers(resId) {
    const cashiers = await this.userRepository.getRestaurantCashiers(resId);
    return cashiers;
  }
}

module.exports = UserController;
