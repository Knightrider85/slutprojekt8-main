import express from "express";
import { addOrder, getOrders } from "../controllers/orderController";

const orderRouter = express.Router();

orderRouter.post("/api/order", addOrder);
// router.get("/api/orders", getOrders);
orderRouter.get("/api/orders/all", getOrders);

export default orderRouter;
