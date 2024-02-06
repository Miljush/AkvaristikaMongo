const mongoose = require("mongoose");
const Item = require("./item");

const aquariumSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
});

module.exports = Item.discriminator("Aquarium", aquariumSchema);
