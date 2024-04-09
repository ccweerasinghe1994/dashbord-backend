import {model, Schema, Types} from "mongoose";
import {setCurrency} from "./util";


interface ITransaction {
    buyer: string;
    amount: number;
    productIds: [Types.ObjectId];

}

const transactionSchema = new Schema<ITransaction>({

    buyer: {
        type: String
    },
    amount: {
        type: Number,
        set: (v: string) => setCurrency(v),
        get: (v: number) => v / 100,
    },
    productIds: [{
        type: Types.ObjectId,
        ref: "Product"
    }]
}, {
    toJSON: {
        getters: true
    },
    timestamps: true
});


export const TransactionModel = model<ITransaction>("Transaction", transactionSchema);
