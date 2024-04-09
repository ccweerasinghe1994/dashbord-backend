import {Router} from "express";
import {KPIModel} from "../models/kpi.model";

export const KpiRouter = Router();

KpiRouter.get("/kpis", async (req, res) => {
    try {
        const getKPIs = await KPIModel.find();
        return res.status(200).json(getKPIs);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(404).json({message: error.message});
        }
        return res.status(404).json({message: "error calling /kpis api"});
    }
});


KpiRouter.post("/kpis", async (req, res) => {
    try {

        const kpiSchema = new KPIModel({
            totalProfit: req.body.totalProfit,
            totalRevenue: req.body.totalRevenue,
            totalExpenses: req.body.totalExpenses,
            expensesByCategory: req.body.expensesByCategory
        })
        const response = await kpiSchema.save();
        return res.status(201).json({
            message: "kpi created successfully",
            data: response
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(404).json({message: error.message});
        }
        return res.status(404).json({message: "error creating kpi"});
    }
});