const UserModel = require("../models/user.model");
const { Types } = require("mongoose");

class UserRepository {
  async getUser(userId) {
    return await UserModel.findOne({ _id: userId }).populate("restaurantId");
  }

  async updateUser(userId, val) {
    return await UserModel.updateOne({ _id: userId }, val);
  }

  async getRestaurantsAdmins() {
    const admins = await UserModel.find({
      typeId: Types.ObjectId("663e9b24a2ede177e6885e45"),
    })
      .populate("restaurantId")
      .sort({ createdOn: -1 });

    return admins;
  }

  async getRestaurantCashiers(restaurantId) {
    return await UserModel.find({
      restaurantId,
      typeId: Types.ObjectId("664fc05da9a0560d2742da1b"),
    }).sort({ createdOn: -1 });
  }
}

module.exports = UserRepository;
