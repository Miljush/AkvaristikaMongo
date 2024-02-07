const Aquarium = require("../models/aquarium");

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

module.exports = { addAquarium };
