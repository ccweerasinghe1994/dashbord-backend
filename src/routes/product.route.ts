import {Router} from "express";
import {ProductModel} from "../models/product.model";


export const ProductRouter = Router();

ProductRouter.get("/products", async (req, res) => {
    try {
        const products = await ProductModel.find();
        return res.status(200).json(products);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(404).json({message: error.message});
        }
        return res.status(404).json({message: "error calling /kpis api"});
    }
});


