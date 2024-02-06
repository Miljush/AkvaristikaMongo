const mongoose = require("mongoose");
const Item = require("./item");

const fishSchema = new mongoose.Schema({});

module.exports = Item.discriminator("Fish", fishSchema);
