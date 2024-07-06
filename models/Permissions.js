const mongoose = require("mongoose");

const permissionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const PermissionModel = mongoose.model("Permission", permissionSchema);
module.exports = PermissionModel;
