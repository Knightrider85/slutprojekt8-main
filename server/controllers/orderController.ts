import { Request, Response } from 'express';
import Order from "../models/orderModel";


// Controller method for submitting an order
export const addOrder = async (req: Request, res: Response) => {
  try {
    const { userId, products, totalCost, name, address, city, zip, email, phone } = req.body;

    const orderId = Math.floor(Math.random() * (1000000000 - 10000) + 10).toString();

    const order = new Order({
      orderId,
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

    const savedOrder = await order.save();
    console.log('Order saved:', savedOrder);

    res.status(201).json({ message: 'Order submitted successfully' });
  } catch (error) {
    console.error('Error submitting order:', error);
    res.status(500).json({ message: 'Failed to submit order' });
  }
};

// Controller method for retrieving all orders
export const getOrders = async (req: Request, res: Response) => {
  try {
    // Retrieve all orders from the database
    const orders = await Order.find();

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({ message: 'Failed to retrieve orders' });
  }
};
