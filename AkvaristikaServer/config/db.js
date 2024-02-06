const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://milosjovanovic2001:IMAtwq6CsU5XiFO2@clusterakvaristika.kqnu9eh.mongodb.net/?retryWrites=true&w=majority`
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
