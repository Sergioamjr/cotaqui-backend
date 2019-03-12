var mongoose = require("mongoose");

const UserObject = {
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  password: { type: String, required: true }
};

const UserSchema = mongoose.Schema(UserObject);

module.exports = mongoose.model("User", UserSchema);
