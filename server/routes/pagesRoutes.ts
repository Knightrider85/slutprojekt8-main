import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  // Logic for the home page route
  res.send("Home Page");
});

router.get("/faq", (req, res) => {
  // Logic for the FAQ page route
  res.send("FAQ Page");
});

router.get("/checkout", (req, res) => {
  // Logic for the checkout page route
  res.send("Checkout Page");
});

router.get("/admin", (req, res) => {
  // Logic for the admin page route
  res.send("Admin Page");
});

export default router;
