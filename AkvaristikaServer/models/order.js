const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
    },
  ],
  price: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("Order", orderSchema);
