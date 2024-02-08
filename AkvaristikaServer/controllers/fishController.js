const Fish = require("../models/fish");

const getFish = async (req, res) => {
  try {
    const fish = await Fish.find();
    if (!fish) {
      return res
        .sendStatus(400)
        .json({ message: "You need to fill out the required fields." });
    } else {
      res.json(fish);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addFish = async (req, res) => {
  const { name, price, image, description } = req.body;
  console.log(req.body);
  if (!name || !price || !image || !description)
    return res
      .status(400)
      .json({ message: "You need to fill out the required fields." });
  // check for duplicate usernames in the db
  const duplicate = await Fish.findOne({ name: name }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict
  try {
    const result = await Fish.create({
      name: name,
      price: price,
      description: description,
      image: image,
    });

    console.log(result);

    res.status(201).json({ success: `New fish ${name} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateFish = async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res
      .sendStatus(400)
      .json({ message: "You need to fill out the required fields." });
  }
  try {
    const fish = await Fish.findOne({ _id: `${id}` }).exec();
    if (!fish) {
      return res
        .sendStatus(400)
        .json({ message: "You need to fill out the required fields." });
    } else {
      if (req.body?.name) fish.name = req.body.name;
      if (req.body?.price) fish.price = req.body.price;
      if (req.body?.description) fish.description = req.body.description;
      if (req.body?.image) fish.image = req.body.image;
      const result = await fish.save();
      res.json(result);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteFish = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res
      .status(400)
      .json({ message: "You need to fill out the required fields." });
  }
  try {
    const fish = await Fish.findById(id);
    if (!fish) {
      return res
        .status(400)
        .json({ message: `There is no Fish with id ${id}` });
    }
    await Fish.deleteOne({ _id: id });
    return res.status(200).json({ message: "Fish deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addFish, getFish, updateFish, deleteFish };
