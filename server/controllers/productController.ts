import { Request, Response } from "express";
import { Product, ProductModel } from "../models/productModel";


// Add a product

export const addProduct = async (
req: Request<{}, {}, Product>,
res: Response

) => {
try {
const product = new ProductModel(req.body);
await product.save();
res.status(200).json(product);
} catch (err) {
console.log(err);
}

};

// Delete a product with ID
export const deleteProduct = async (req: Request, res: Response) => {

const { id } = req.params;

try {

const product = await ProductModel.findByIdAndDelete(id);
if (!product) {
return res.status(200).json(product);
}
res.status(200).json(product);

} catch (err: unknown) {
if (err instanceof Error) {
res.status(400).json(err.message);
 }
}

};

// Update a product with ID


export const updateProduct = async (
req: Request<{ id: string }>,
res: Response

) => {
const { id } = req.params;



try {

const product = await ProductModel.findByIdAndUpdate(id, req.body, {
useFindAndModify: false,
});


if (!product) {
return res.status(400).json(product);
}

await product.save();

res.status(200).json({
old: product,
new: req.body,

});

} catch (err) {
console.log("update Product error");
res.status(400).json(err);
}

};

// Get all products

export const getAllProducts = async (req: Request, res: Response) => {
    const products = await ProductModel.find({});

    if(!products.length){
        return res.status(400).json(products);
    }
    res.status(200).json(products)
};
