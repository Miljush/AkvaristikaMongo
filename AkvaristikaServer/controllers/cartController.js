const { default: mongoose } = require("mongoose");
const Cart = require("../models/cart");
const Item = require("../models/item");

const addToCart = async (req, res) => {
  const { itemId, cartId } = req.body;
  try {
    const item = await Item.findOne({ _id: `${itemId}` }).exec();
    if (!item) {
      return res
        .sendStatus(400)
        .json({ message: "No item with that id found." });
    }
    const cart = await Cart.findOne({ _id: `${cartId}` }).exec();
    if (!cart) {
      return res.sendStatus(400);
    }
    cart.items.push(itemId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getItemCount = async (req, res) => {
  const { cartId } = req.query;
  try {
    const cart = await Cart.findOne({ _id: `${cartId}` }).exec();
    if (!cart) {
      return res
        .sendStatus(400)
        .json({ message: "No cart with that id found" });
    }
    const items = cart.items;
    const duplicateItems = {};
    items.forEach((item) => {
      duplicateItems[item._id] = (duplicateItems[item._id] || 0) + 1;
    });
    res.json(duplicateItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllItemsCart = async (req, res) => {
  const { cartId } = req.query;
  try {
    const cart = await Cart.findOne({ _id: `${cartId}` }).exec();
    if (!cart) {
      return res
        .sendStatus(400)
        .json({ message: "No cart with that id found" });
    }
    var niz = [];
    var pom = null;
    for (let i = 0; i < cart.items.length; i++) {
      pom = await Item.findById(cart.items[i]);
      niz.push(pom);
    }
    res.status(200).json(niz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const removeItem = async (req, res) => {
  const { cartId, itemId, many } = req.body;
  const objectId = new mongoose.Types.ObjectId(itemId);
  try {
    const cart = await Cart.findOne({ _id: `${cartId}` }).exec();
    if (!cart) {
      return res
        .sendStatus(400)
        .json({ message: "No cart with that id found" });
    }
    var itemi = cart.items;
    if (many) {
      itemi = itemi.filter(
        (item) => item._id.toString() != objectId.toString()
      );
    }
    cart.items = itemi;
    const newCart = await cart.save();
    return res.json(newCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addToCart, getItemCount, removeItem, getAllItemsCart };
