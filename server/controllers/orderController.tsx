import { Request, Response } from "express";
import Order from "../models/orderModel"; 
import router from "../routes/orderRoutes";

// POST new order
// orderController.js

// Controller method for submitting an order
export const addOrder = async (req, res) => {
  try {
    const { userId, products, totalCost, name, address, city, zip, email, phone } = req.body;

    // Create a new order
    const order = new Order({
      userId,
      products,
      totalCost,
      name,
      address,
      city,
      zip,
      email,
      phone,
      isShipped: false,
    });

    // Save the order to the database
    const savedOrder = await order.save();
    console.log('Order saved:', savedOrder);
    
    res.status(201).json({ message: 'Order submitted successfully' });
  } catch (error) {
    console.error('Error submitting order:', error);
    res.status(500).json({ message: 'Failed to submit order' });
  }
};

// Controller method for retrieving all orders
export const getOrders = async (req, res) => {
  try {
    // Retrieve all orders from the database
    const orders = await Order.find();

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({ message: 'Failed to retrieve orders' });
  }
};



export default router;
