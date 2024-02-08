const Cart = require("../models/cart");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const cartController = require("../controllers/cartController");
const getUser = async (req, res) => {
  const id = req.body.id;
  try {
    const user = await User.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;

      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No such User");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const registerUser = async (req, res) => {
  const { username, password, email, profilePicture, firstName, lastName } =
    req.body;
  if (!username || !password || !email || !firstName || !lastName)
    return res
      .status(400)
      .json({ message: "You need to fill out the required fields." });
  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ username: username }).exec();

  if (duplicate) return res.sendStatus(409); //Conflict
  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);

    //create and store the new user
    const result = await User.create({
      username: username,
      password: hashedPwd,
      email: email,
      profilePicture: profilePicture,
      firstName: firstName,
      lastName: lastName,
    });

    const cart = await Cart.create({});
    result.cart = cart._id;
    const finalResult = await result.save();
    console.log(finalResult);

    res.status(201).json({ success: `New user ${username} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addItemToUsersCart = async (req, res) => {
  const { userId, itemId } = req.body;
  const user = await User.findById(userId);
  if (user) {
    const { password, ...otherDetails } = user._doc;
    res.status(200);
  } else {
    res.status(404).json("No such User");
  }
  const message = await cartController.addToCart(
    { body: { itemId: itemId, cartId: user.cart } },
    res
  );
  return res.status(200);
};

const getCartForUser = async (req, res) => {
  const id = req.body.id;
  try {
    const user = await User.findById(id);
    if (user) {
      res.status(200).json(user.cart);
    } else {
      res.status(404).json("No such User");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = { getUser, registerUser, addItemToUsersCart,getCartForUser };
