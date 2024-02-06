const mongoose = require("mongoose");
const Item = require("./item");

const equipmentSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

module.exports = Item.discriminator("Equipment", equipmentSchema);
