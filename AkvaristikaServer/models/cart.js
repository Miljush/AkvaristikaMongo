const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  items: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
