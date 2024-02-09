const Equipment = require("../models/equipment");

const getEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find();
    if (!equipment) {
      return res
        .sendStatus(400)
        .json({ message: "You need to fill out the required fields." });
    } else {
      res.json(equipment);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addEquipment = async (req, res) => {
  const { name, price, image, description, brand, type } = req.body;
  if (!name || !price || !image || !description || !brand || !type)
    return res
      .status(400)
      .json({ message: "You need to fill out the required fields." });
  // check for duplicate usernames in the db
  const duplicate = await Equipment.findOne({ name: name }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict
  try {
    const result = await Equipment.create({
      name: name,
      price: price,
      description: description,
      image: image,
      brand: brand,
      type: type,
    });

    res.status(201).json({ success: `New equipment ${name} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateEquipment = async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res
      .sendStatus(400)
      .json({ message: "You need to fill out the required fields." });
  }
  try {
    const equipment = await Equipment.findOne({ _id: `${id}` }).exec();
    if (!equipment) {
      return res
        .sendStatus(400)
        .json({ message: "You need to fill out the required fields." });
    } else {
      if (req.body?.name) equipment.name = req.body.name;
      if (req.body?.price) equipment.price = req.body.price;
      if (req.body?.description) equipment.description = req.body.description;
      if (req.body?.image) equipment.image = req.body.image;
      if (req.body?.brand) equipment.brand = req.body.brand;
      if (req.body?.type) equipment.type = req.body.type;
      const result = await equipment.save();
      res.json(result);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteEquipment = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res
      .status(400)
      .json({ message: "You need to fill out the required fields." });
  }
  try {
    const equipment = await Equipment.findById(id);
    if (!equipment) {
      return res
        .status(400)
        .json({ message: `There is no equipment with id ${id}` });
    }
    await Equipment.deleteOne({ _id: id });
    return res.status(200).json({ message: "Equipment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const filterByType = async (req, res) => {
  const { type } = req.body;
  try {
    const equipment = await Equipment.find();
    if (!equipment) {
      return res
        .sendStatus(400)
        .json({ message: "You need to fill out the required fields." });
    } else {
      filteredEquipment = [];
      equipment.forEach((eq) => {
        if (eq.type == type) {
          filteredEquipment.push(eq);
        }
      });
      res.json(filteredEquipment);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const filterByTypeAndBrand = async (req, res) => {
  const { brand, type } = req.body;
  try {
    const equipment = await Equipment.find();
    if (!equipment) {
      return res
        .sendStatus(400)
        .json({ message: "You need to fill out the required fields." });
    } else {
      filteredEquipment = [];
      equipment.forEach((eq) => {
        if (eq.type == type && eq.brand == brand) {
          filteredEquipment.push(eq);
        }
      });
      res.json(filteredEquipment);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addEquipment,
  updateEquipment,
  deleteEquipment,
  getEquipment,
  filterByType,
  filterByTypeAndBrand,
};
