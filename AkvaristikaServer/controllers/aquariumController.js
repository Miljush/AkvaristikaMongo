const Aquarium = require("../models/aquarium");

const getAquariums = async (req, res) => {
  try {
    const aquariums = await Aquarium.find();
    if (!aquariums) {
      return res
        .sendStatus(400)
        .json({ message: "You need to fill out the required fields." });
    } else {
      res.json(aquariums);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addAquarium = async (req, res) => {
  const { name, price, image, description, brand } = req.body;
  console.log(req.body);
  if (!name || !price || !image || !description || !brand)
    return res
      .status(400)
      .json({ message: "You need to fill out the required fields." });
  // check for duplicate usernames in the db
  const duplicate = await Aquarium.findOne({ name: name }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict
  try {
    const result = await Aquarium.create({
      name: name,
      price: price,
      description: description,
      image: image,
      brand: brand,
    });

    console.log(result);

    res.status(201).json({ success: `New aquarium ${name} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateAquarium = async (req, res) => {
  const id = req.body._id;
  if (!id) {
    return res
      .sendStatus(400)
      .json({ message: "You need to fill out the required fields." });
  }
  try {
    const aquarium = await Aquarium.findOne({ _id: `${id}` }).exec();
    if (!aquarium) {
      return res
        .sendStatus(400)
        .json({ message: "You need to fill out the required fields." });
    } else {
      if (req.body?.name) aquarium.name = req.body.name;
      if (req.body?.price) aquarium.price = req.body.price;
      if (req.body?.description) aquarium.description = req.body.description;
      if (req.body?.image) aquarium.image = req.body.image;
      if (req.body?.brand) aquarium.brand = req.body.brand;
      const result = await aquarium.save();
      res.json(result);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteAquarium = async (req, res) => {
  const { id } = req.query;
  console.log(id);
  if (!id) {
    return res
      .status(400)
      .json({ message: "You need to fill out the required fields." });
  }
  try {
    const aquarium = await Aquarium.findById(id);
    if (!aquarium) {
      return res
        .status(400)
        .json({ message: `There is no Aquarium with id ${id}` });
    }
    await Aquarium.deleteOne({ _id: id });
    return res.status(200).json({ message: "Aquarium deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const filterByBrand = async(req,res)=>{
  const {brandName} = req.body;
  try {
    const aquariums = await Aquarium.find();
    if (!aquariums) {
      return res
        .sendStatus(400)
        .json({ message: "You need to fill out the required fields." });
    } else {
      filteredAquariums=[];
      aquariums.forEach((aquarium)=>{
        if(aquarium.brand==brandName){
          filteredAquariums.push(aquarium);
        }
      })
      res.json(filteredAquariums);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addAquarium, updateAquarium, deleteAquarium, getAquariums,filterByBrand };
