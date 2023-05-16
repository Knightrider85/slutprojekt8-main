import express from "express";
import mongoose from "mongoose";

const app = express();
const url = 'mongodb+srv://Knightrider:<Slutproject8>@cluster0.lv2qtau.mongodb.net/stepup?retryWrites=true&w=majority'; // Your MongoDB Atlas connection URI
const port = 3000;

// Connect to the MongoDB Atlas cluster using Mongoose
mongoose.connect(url)
  .then(() => {
    console.log("Connected to MongoDB Atlas");

    // Start the server after connecting to the database
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB Atlas:", err);
  });
