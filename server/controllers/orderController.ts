import { Request, Response } from 'express';
import * as yup from 'yup';
import Order, { IOrder } from "../models/orderModel";
import ProductModel from "../models/productModel";

const orderSchema = yup.object().shape({
  products: yup
    .array()
    .of(
      yup.object().shape({
        _id: yup.string().required(),
        name: yup.string().required(),
        description: yup.string().required(),
        price: yup.number().required(),
        imageId: yup.string().required(),
        stock: yup.number().required(),
        category: yup.string().required(),
        color: yup.string().required(),
        __v: yup.string().required(),
        size: yup.string().required(),
        quantity: yup.number().required(),
      })
    )
    .required(),
  quantity: yup.array().of(yup.number()).required(),
  totalCost: yup.number().required(),
  name: yup.string().trim().min(1).required(),
  address: yup.string().required(),
  city: yup.string().required(),
  zip: yup.string().required().matches(/^[0-9]{5}$/),
  email: yup.string().email().required(),
  phone: yup.string().required().matches(/^[0-9]{10}$/),
});


// Controller method for submitting an order
export const addOrder = async (req: Request, res: Response) => {
  try {
    const { products, quantity, totalCost, name, address, city, zip, email, phone } = req.body;

    // Validate the order data using Yup
    await orderSchema.validate({
      products,
      quantity,
      totalCost,
      name,
      address,
      city,
      zip,
      email,
      phone,
    });

    const dbProducts = await ProductModel.find({ _id: { $in: products } });

    const orderId = Math.floor(Math.random() * (1000000000 - 10000) + 10).toString();

    const order: IOrder = new Order({
      orderId,
      products: dbProducts,
      quantity,
      totalCost,
      name,
      address,
      city,
      zip,
      email,
      phone,
    });

    const savedOrder = await order.save();

    res.status(201).json({ message: 'Order submitted successfully', orderId: savedOrder.orderId });
  } catch (error) {
    console.error('Error submitting order:', error);
    if (error instanceof yup.ValidationError) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Failed to submit order' });
    }
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
