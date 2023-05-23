import { Request, Response } from "express";
import router from "../routes/orderRoutes";

// POST new order
export const addOrder = async (req: Request, res: Response) => {
  try {
    const {
      orderNumber,
      products,
      customerId,
      deliveryAddress,
      isShipped,
      shippingPrice,
      createdAt,
    } = req.body;
    if (orderNumber && orderNumber.length === 0) {
      res.status(400).send({ message: "No order items" });
    } else {
      const order = new Order({
        orderNumber,
        products,
        customerId,
        deliveryAddress,
        isShipped,
        shippingPrice,
        createdAt,
      });
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: "New Order Created", order: createdOrder });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
// PUT update order
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id;
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
// GET Admin get all orders
export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({});
    res.send(orders);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
// GET order by id
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//router.post("/api/orders", addOrder);
//router.put("/api/orders/:id", updateOrder);
//router.get("/api/orders/all", getOrders);
//router.get("/api/orders", getOrderById);

export default router;
