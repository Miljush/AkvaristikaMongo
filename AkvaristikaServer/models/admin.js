const mongoose = require("mongoose");
const User = require("./user");

const adminSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "Admin",
  },
});

module.exports = User.discriminator("User", adminSchema);
