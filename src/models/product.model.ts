import {Expression, model, Schema, Types} from "mongoose";
import {setCurrency} from "./util";


interface IProduct {
    price: number;
    expense: number;
    transactions: [Types.ObjectId];

}

const productSchema = new Schema<IProduct>({

    price: {
        type: Number,
        set: (v: string) => setCurrency(v),
        get: (v: number) => v / 100,
    },
    expense: {
        type: Number,
        set: (v: string) => setCurrency(v),
        get: (v: number) => v / 100,
    },
    transactions: [{
        type: Types.ObjectId,
        ref: "Transaction"
    }]
}, {
    toJSON: {
        getters: true
    },
    timestamps: true
});


export const ProductModel = model<IProduct>("Product", productSchema);
