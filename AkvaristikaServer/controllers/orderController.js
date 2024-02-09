const Order = require("../models/order");
const User = require("../models/user");
const Cart = require("../models/cart");
const createOrder = async (req, res) => {
  const { userId } = req.body;
  if (!userId)
    return res
      .status(400)
      .json({ message: "You need to fill out the required fields." });

  const user = await User.findById(userId);
  if (!user) return res.sendStatus(400); //No user found
  const cart = await Cart.findById(user.cart);
  const items = cart.items;
  cart.items = [];
  await cart.save();
  var price = 0;
  items.forEach((item) => {
    price += item.price;
  });
  try {
    const result = await Order.create({
      userId: userId,
      items: items,
      price: price,
    });

    res.status(201).json({ success: `New order created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createOrder };
