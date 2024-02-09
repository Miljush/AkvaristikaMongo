const Cart = require("../models/cart");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cartController = require("../controllers/cartController");
const cookies = require("cookie-parser");
require("dotenv").config();
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
  console.log(req.body);
  if (!username || !password || !email || !firstName || !lastName)
    return res
      .status(400)
      .json({ message: "You need to fill out the required fields." });
  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ username: username }).exec();
  console.log(req.body);
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

const getCartItemCountForUser = async (req, res) => {
  const { id } = req.query;
  try {
    const user = await User.findById(id);
    if (user) {
      const cart = await Cart.findOne({ _id: `${user.cart}` }).exec();
      res.status(200).json(cart.items.length);
    } else {
      res.status(404).json("No such User");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const handleUserInfo = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userInfo) => {
      if (err) {
        console.log(err);
      }
      const {
        username,
        email,
        firstName,
        lastName,
        profilePicture,
        _id,
        role,
        cart,
        __t,
      } = await User.findById(userInfo.id);
      res.json({
        username,
        email,
        firstName,
        lastName,
        profilePicture,
        _id,
        role,
        cart,
        __t,
      });
    });
  } else {
    res.json(null);
  }
};
module.exports = {
  getUser,
  registerUser,
  addItemToUsersCart,
  getCartForUser,
  handleUserInfo,
  getCartItemCountForUser,
};
