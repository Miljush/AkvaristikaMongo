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
  const { cartId } = req.body;
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
      duplicateItems[item] = (duplicateItems[item] || 0) + 1;
    });
    res.json(duplicateItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const removeItem = async (req, res) => {
  const { cartId, itemId, many } = req.body;
  try {
    const cart = await Cart.findOne({ _id: `${cartId}` }).exec();
    if (!cart) {
      return res
        .sendStatus(400)
        .json({ message: "No cart with that id found" });
    }
    const items = cart.items;
    if (many) {
      items.forEach((item) => {
        if (item._id == itemId) {
          items.pop(item);
        }
      });
    } else {
      const item = await Item.findOne({_id:`${itemId}`}).exec();
      items.pop(item);
    }
    cart.items = items;
    const newCart = await cart.save();
    return res.json(newCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addToCart, getItemCount, removeItem };
