const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3500;
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const userController = require("./controllers/userController");
const aquariumController = require("./controllers/aquariumController");
const cartController = require("./controllers/cartController");

connectDB();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.get("/getUser", userController.getUser);
app.post("/registerUser", userController.registerUser);

app.post("/addAquarium", aquariumController.addAquarium);

app.put("/addToCart", cartController.addToCart);
app.get("/getItemCount", cartController.getItemCount);
app.put("/removeItem", cartController.removeItem);
app.use("/addToUserCart", userController.addItemToUsersCart);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
