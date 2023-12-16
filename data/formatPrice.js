export function formatPrice(price) {
    const priceString = String(price);
    if (priceString.length < 4) {
        return priceString + ' VND'; 
    }
    const priceParts = [];
    for (let i = priceString.length - 1, j = 0; i >= 0; i--, j++) {
        if (j !== 0 && j % 3 === 0) {
            priceParts.unshift(priceString[i]); 
        } else {
            if (priceParts[0]) {
                priceParts[0] = priceString[i] + priceParts[0]; 
            } else {
                priceParts.unshift(priceString[i]);
            }
        }
    }
    return priceParts.join('.') + ' VND';
}
