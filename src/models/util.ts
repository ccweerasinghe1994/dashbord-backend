export const setCurrency = (currencyValue: string): number => {

    if (currencyValue[0] !== '$') {
        throw new Error("Invalid currency value");
    }
    // if the currency value has more than 2 decimal places, it will be rounded to 2 decimal places

    if (currencyValue.split(".")[1]?.length > 2) {
        throw new Error("Invalid currency value with more than 2 decimal places");
    }


    let removeDollarSign = currencyValue.substring(1, currencyValue.length);
    let convertToNumber = parseFloat(removeDollarSign) * 100;
    // only 2 decimal places are allowed

    return parseInt(convertToNumber.toFixed(2));
};

