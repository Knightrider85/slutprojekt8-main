import express from "express";
import { addOrder, getOrderById, getOrders, updateOrder } from "../controllers/orderController";
import authMiddleware from "../middlewares/orderMiddlewear";


const orderRouter = express.Router();

// router.get("/order/:id", (req, res) => {
//   const orderId = req.params.id;
//   res.send(`Order Page - ID: ${orderId}`);
// });

orderRouter.post("/api/orders", addOrder, authMiddleware);
orderRouter.put("/api/orders/:id", updateOrder);
orderRouter.get("/api/orders/all", getOrders);
orderRouter.get("/api/orders", getOrderById);

export default orderRouter;
