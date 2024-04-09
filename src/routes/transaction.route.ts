import {Router} from "express";
import {ProductModel} from "../models/product.model";
import {TransactionModel} from "../models/transaction.model";


export const TransactionRouter = Router();

TransactionRouter.get("/transactions", async (req, res) => {
    try {
        const transactions = await TransactionModel.find().limit(50).sort({createdAt: -1});
        return res.status(200).json(transactions);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(404).json({message: error.message});
        }
        return res.status(404).json({message: "error calling /kpis api"});
    }
});


