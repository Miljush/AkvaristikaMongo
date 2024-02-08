const Plant = require("../models/plant");

const getPlant = async (req, res) => {
  try {
    const plant = await Plant.find();
    if (!plant) {
      return res
        .sendStatus(400)
        .json({ message: "You need to fill out the required fields." });
    } else {
      res.json(plant);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addPlant = async (req, res) => {
  const { name, price, image, description } = req.body;
  console.log(req.body);
  if (!name || !price || !image || !description)
    return res
      .status(400)
      .json({ message: "You need to fill out the required fields." });
  // check for duplicate usernames in the db
  const duplicate = await Plant.findOne({ name: name }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict
  try {
    const result = await Plant.create({
      name: name,
      price: price,
      description: description,
      image: image,
    });

    console.log(result);

    res.status(201).json({ success: `New plant ${name} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePlant = async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res
      .sendStatus(400)
      .json({ message: "You need to fill out the required fields." });
  }
  try {
    const plant = await Plant.findOne({ _id: `${id}` }).exec();
    if (!plant) {
      return res
        .sendStatus(400)
        .json({ message: "You need to fill out the required fields." });
    } else {
      if (req.body?.name) plant.name = req.body.name;
      if (req.body?.price) plant.price = req.body.price;
      if (req.body?.description) plant.description = req.body.description;
      if (req.body?.image) plant.image = req.body.image;
      const result = await plant.save();
      res.json(result);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deletePlant = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res
      .status(400)
      .json({ message: "You need to fill out the required fields." });
  }
  try {
    const plant = await Plant.findById(id);
    if (!plant) {
      return res
        .status(400)
        .json({ message: `There is no plant with id ${id}` });
    }
    await Plant.deleteOne({ _id: id });
    return res.status(200).json({ message: "Plant deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addPlant, getPlant, updatePlant, deletePlant };
