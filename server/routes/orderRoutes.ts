import express from "express";
import { addOrder, getOrderById, getOrders, updateOrder } from "../controllers/orderController";

const router = express.Router();

router.get("/order/:id", (req, res) => {
  const orderId = req.params.id;
  res.send(`Order Page - ID: ${orderId}`);
});

router.post("/api/orders", addOrder);
router.put("/api/orders/:id", updateOrder);
router.get("/api/orders/all", getOrders);
router.get("/api/orders", getOrderById);

export default router;
