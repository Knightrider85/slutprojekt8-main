import express from "express";
import { addOrder, getOrders } from "../controllers/orderController";

const router = express.Router();

router.post("/api/order", addOrder);
// router.get("/api/orders", getOrders);
router.get("/api/orders/all", getOrders);

export default router;
