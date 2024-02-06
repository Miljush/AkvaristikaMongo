const mongoose = require("mongoose");
const Item = require("./item");

const plantSchema = new mongoose.Schema({});

module.exports = Item.discriminator("Plant", plantSchema);
