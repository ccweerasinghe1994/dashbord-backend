import {model, Schema} from "mongoose";
import {setCurrency} from "./util";

type expenseCategory = "salaries" | "supplies" | "services";

interface IKPI {
    totalProfit: number
    totalRevenue: number;
    totalExpenses: number;
    monthlyData: IMonthlyExpenses[];
    dailyData: IDailyExpenses[];
    expensesByCategory: Map<expenseCategory, string>;
}

interface IMonthlyExpenses {
    month: string;
    revenue: number;
    expenses: number;
    operationalExpenses: number;
    nonOperationalExpenses: number;
}

interface IDailyExpenses {
    date: string;
    revenue: number;
    expenses: number;

}

const dailyExpenses = new Schema<IDailyExpenses>({
    date: {
        type: String
    },
    revenue: {
        type: Number,
        set: (v: string) => setCurrency(v),
        get: (v: number) => v / 100,
    },
    expenses: {
        type: Number,
        set: (v: string) => setCurrency(v),
        get: (v: number) => v / 100,
    }
});

const MonthlySchema = new Schema<IMonthlyExpenses>({
    month: {
        type: String
    },
    revenue: {
        type: Number,
        set: (v: string) => setCurrency(v),
        get: (v: number) => v / 100,
    },
    expenses: {
        type: Number,
        set: (v: string) => setCurrency(v),
        get: (v: number) => v / 100,
    },
    nonOperationalExpenses: {
        type: Number,
        set: (v: string) => setCurrency(v),
        get: (v: number) => v / 100,
    },
    operationalExpenses: {
        type: Number,
        set: (v: string) => setCurrency(v),
        get: (v: number) => v / 100,
    }

});


const kpiSchema = new Schema<IKPI>({
    totalProfit: {
        type: Number,
        set: (v: string) => setCurrency(v),
        get: (v: number) => v / 100,
    },
    totalRevenue: {
        type: Number,
        set: (v: string) => setCurrency(v),
        get: (v: number) => v / 100,
    },
    totalExpenses: {
        type: Number,
        set: (v: string) => setCurrency(v),
        get: (v: number) => v / 100,
    },
    expensesByCategory: {
        type: Map,
        of: {
            type: String,
            set: (v: string) => setCurrency(v),
            get: (v: number) => v / 100,

        },
    },
    monthlyData: [MonthlySchema],
    dailyData: [dailyExpenses]

}, {
    toJSON: {
        getters: true
    },
    timestamps: true
});

export const KPIModel = model<IKPI>("KPI", kpiSchema);
