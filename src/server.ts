import dotenv from 'dotenv';
import express from 'express';
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import {KpiRouter} from "./routes/kpi.route";
import {ProductRouter} from "./routes/product.route";
import {KPIModel} from "./models/kpi.model";
import {kpis, products, transactions} from "./data/data";
import {ProductModel} from "./models/product.model";
import {TransactionRouter} from "./routes/transaction.route";
import {TransactionModel} from "./models/transaction.model";


if (process.env.NODE_ENV === 'test') {
    dotenv.config({path: '.env.test'});
} else {
    dotenv.config();
}

console.log("process.env.PORT -> ", process.env.PORT);
console.log("process.env.NODE_ENV -> ", process.env.NODE_ENV);

const add = (a: number, b: number): number => a + b;

add(1, 2); // 3

const PORT = process.env.PORT || 3000;

const app = express();
app.use(helmet());
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin",
    })
);
app.use(express.json());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use('/kpi', KpiRouter);
app.use('/product', ProductRouter);
app.use('/transaction', TransactionRouter);

mongoose
    .connect(process.env.MONGO_DB_URL!)
    .then(async () => {
        app.listen(PORT, () => {
            console.log(`server is running on http://localhost:${PORT}`);
        });
        // clear the database before running the tests
        // console.log("?? data seeding started??")
        // await mongoose.connection.db.dropDatabase();
        // await KPIModel.insertMany(kpis);
        // console.log("?? data seeding completed ??");
        // await ProductModel.insertMany(products);
        // await TransactionModel.insertMany(transactions);

    })
    .catch((error) => {
        console.error(error, `did not connect`);
    });


export default app;