import {setCurrency} from "../../models/util";


describe("Testing setCurrency function", () => {
    it("should throw an error when the currency value has more than two decimal places", () => {
        const currencyValue: string = "$100.999";
        expect(() => setCurrency(currencyValue)).toThrowError("Invalid currency value with more than 2 decimal places");
    });

    it("should handle currency values with no dollar sign and no decimal places correctly", () => {
        const currencyValue: string = "100";
        const expectedValue: number = 10000;
        expect(() => setCurrency(currencyValue)).toThrowError("Invalid currency value");
    });

    it("should handle currency values with no dollar sign but with decimal places correctly", () => {
        const currencyValue: string = "100.99";
        expect(() => setCurrency(currencyValue)).toThrowError("Invalid currency value");
    });

    it("should handle currency values with dollar sign but no decimal places correctly", () => {
        const currencyValue: string = "$100";
        const expectedValue: number = 10000;
        expect(setCurrency(currencyValue)).toBe(expectedValue);
    });

    it("should handle currency values with dollar sign and decimal places correctly", () => {
        const currencyValue: string = "$100.99";
        const expectedValue: number = 10099;
        expect(setCurrency(currencyValue)).toBe(expectedValue);
    });
    it("should handle currency values with dollar sign and decimal places correctly", () => {
        const currencyValue: string = "$10340.03";
        const expectedValue: number = 1034003;
        expect(setCurrency(currencyValue)).toBe(expectedValue);
    });
});
