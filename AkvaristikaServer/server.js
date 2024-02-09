const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 3500;
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const userController = require("./controllers/userController");
const aquariumController = require("./controllers/aquariumController");
const cartController = require("./controllers/cartController");
const itemController = require("./controllers/itemController");
const fishController = require("./controllers/fishController");
const plantController = require("./controllers/plantController");
const equipmentController = require("./controllers/equipmentController");
const authController = require("./controllers/authController");
const orderController = require("./controllers/orderController")

connectDB();
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
//User
app.get("/getUser", userController.getUser);
app.post("/registerUser", userController.registerUser);
app.get("/getCartForUser", userController.getCartForUser);
app.use("/login", authController.handleLogin);
app.use("/logout", authController.handleLogout);
app.get("/userProfileInfo", userController.handleUserInfo);
app.get("/cartItemCountUser", userController.getCartItemCountForUser);

//Item
app.get("/getItems", itemController.getItems);
app.get("/getItem", itemController.getItem);

//Aquarium
app.get("/getAquariums", aquariumController.getAquariums);
app.post("/addAquarium", aquariumController.addAquarium);
app.put("/updateAquarium", aquariumController.updateAquarium);
app.delete("/deleteAquarium", aquariumController.deleteAquarium);
app.get("/filterByBrand", aquariumController.filterByBrand);

//Fish
app.get("/getFish", fishController.getFish);
app.post("/addFish", fishController.addFish);
app.put("/updateFish", fishController.updateFish);
app.delete("/deleteFish", fishController.deleteFish);

//Plant
app.get("/getPlants", plantController.getPlants);
app.post("/addPlant", plantController.addPlant);
app.put("/updatePlant", plantController.updatePlant);
app.delete("/deletePlant", plantController.deletePlant);

//Equipment
app.get("/getEquipment", equipmentController.getEquipment);
app.post("/addEquipment", equipmentController.addEquipment);
app.put("/updateEquipment", equipmentController.updateEquipment);
app.delete("/deleteEquipment", equipmentController.deleteEquipment);
app.get("/filterByType", equipmentController.filterByType);
app.get("filterByTypeAndBrand", equipmentController.filterByTypeAndBrand);

//Cart
app.put("/addToCart", cartController.addToCart);
app.get("/getItemCount", cartController.getItemCount);
app.put("/removeItem", cartController.removeItem);
app.use("/addToUserCart", userController.addItemToUsersCart);
app.get("/getAllItemsCart", cartController.getAllItemsCart);

//Order
app.put("/createOrder",orderController.createOrder);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
