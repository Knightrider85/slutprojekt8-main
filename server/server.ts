import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import routes from './routes/pagesRoutes';
import userRouter from './routes/userRoutes';

const app = express();
const url = 'mongodb+srv://Knightrider:<StepUp8>@cluster0.lv2qtau.mongodb.net:27017/stepup?retryWrites=true&w=majority'; 
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
    app.use(routes);
    app.use(userRouter);

    // Start the server after connecting to the database
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB Atlas:', err);
  });
