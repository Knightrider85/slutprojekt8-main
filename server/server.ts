import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes';
import productRouter from './routes/productRoutes';

dotenv.config();

const app = express();
const url = process.env.MONGO_URL || 'mongodb://localhost:27017/stepup';
const port = 3000;

// Connect to the MongoDB Atlas cluster using Mongoose
mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to MongoDB Atlas');

    // Set up cookie session middleware
    app.use(
      cookieSession({
        name: 'session',
        secret: 'YourSecretHere',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        secure: false, // Set to true in production with HTTPS
        httpOnly: true,
      })
    );

    // Parse incoming JSON payloads
    app.use(express.json());

    // Use the routes in your Express application
    app.use(userRouter);
    app.use(productRouter);

    // Start the server after connecting to the database
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB Atlas:', err);
  });
