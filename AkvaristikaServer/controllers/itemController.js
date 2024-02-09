const Item = require("../models/item");

const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    if (!items) {
      return res
        .sendStatus(400)
        .json({ message: "You need to fill out the required fields." });
    } else {
      res.json(items);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getItem = async (req, res) => {
  try {
    const { id } = req.query;
    const item = await Item.findById(id);
    if (!item) {
      return res.sendStatus(400);
    } else {
      res.json(item);
    }
  } catch (err) {
    console.error(err);
  }
};
module.exports = { getItems, getItem };
