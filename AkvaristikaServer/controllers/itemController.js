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

module.exports = { getItems };
