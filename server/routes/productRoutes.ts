import express from "express";

const router = express.Router();

//första utkast
//fortsätt todo
router.get("/product/:id", (req, res) => {
    // Logic for the product page route
    const productId = req.params.id;
    res.send(`Product Page - ID: ${productId}`);
  });