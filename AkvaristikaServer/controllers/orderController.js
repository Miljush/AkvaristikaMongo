const Order = require("../models/order");
const User = require("../models/user");
const Cart = require("../models/cart");
const Item = require("../models/item");
const createOrder = async (req, res) => {
  const { userId, price } = req.body;
  if (!userId)
    return res
      .status(400)
      .json({ message: "You need to fill out the required fields." });

  const user = await User.findById(userId);
  if (!user) return res.sendStatus(400);
  const cart = await Cart.findById(user.cart);
  const items = cart.items;
  cart.items = [];
  await cart.save();
  try {
    const result = await Order.create({
      user: user,
      items: items,
      price: price,
      usernameUser: user.username,
    });
    res.status(201).json({ success: `New order created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOrder = async (req, res) => {
  const id = req.body.id;
  try {
    const order = await Order.findById(id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json("No such Order");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders) {
      return res
        .sendStatus(400)
        .json({ message: "You need to fill out the required fields." });
    } else {
      res.json(orders);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res
      .status(400)
      .json({ message: "You need to fill out the required fields." });
  }
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res
        .status(400)
        .json({ message: `There is no order with id ${id}` });
    }
    await Order.deleteOne({ _id: id });
    return res.status(200).json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createOrder, getOrder, getOrders, deleteOrder };
