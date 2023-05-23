import express from "express";

const router = express.Router();

export const orderRouter = express
.Router().get("/order/:id", (req, res) => {
  // Logic for the product page route
  const orderId = req.params.id;
  res.send(`Order Page - ID: ${orderId}`);
}
);