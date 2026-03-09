export const getDiscountedPrice = (priceString, discountPercentage = 15) => {
    if (!priceString) return priceString;
    const cleanString = priceString.replace(/[^0-9.]/g, '');
    const priceNum = parseFloat(cleanString);

    if (isNaN(priceNum)) return priceString;

    const discountedNum = priceNum * (1 - discountPercentage / 100);
    const formattedNewPrice = discountedNum % 1 === 0 ? discountedNum.toString() : discountedNum.toFixed(2);

    return priceString.replace(cleanString, formattedNewPrice);
};
