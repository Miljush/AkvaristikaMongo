const express = require("express");
const cors = require("cors");
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

connectDB();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
//User
app.get("/getUser", userController.getUser);
app.post("/registerUser", userController.registerUser);
app.get("/getCartForUser", userController.getCartForUser);

//Item
app.get("/getItems", itemController.getItems);
app.get("/getItem", itemController.getItem);

//Aquarium
app.get("/getAquariums", aquariumController.getAquariums);
app.post("/addAquarium", aquariumController.addAquarium);
app.put("/updateAquarium", aquariumController.updateAquarium);
app.delete("/deleteAquarium", aquariumController.deleteAquarium);

//Fish
app.get("/getFish", fishController.getFish);
app.post("/addFish", fishController.addFish);
app.put("/updateFish", fishController.updateFish);
app.delete("/deleteFish", fishController.deleteFish);

//Plant
app.get("/getPlant", plantController.getPlant);
app.post("/addPlant", plantController.addPlant);
app.put("/updatePlant", plantController.updatePlant);
app.delete("/deletePlant", plantController.deletePlant);

//Equipment
app.get("/getEquipment", equipmentController.getEquipment);
app.post("/addEquipment", equipmentController.addEquipment);
app.put("/updateEquipment", equipmentController.updateEquipment);
app.delete("/deleteEquipment", equipmentController.deleteEquipment);

//Cart
app.put("/addToCart", cartController.addToCart);
app.get("/getItemCount", cartController.getItemCount);
app.put("/removeItem", cartController.removeItem);
app.use("/addToUserCart", userController.addItemToUsersCart);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
