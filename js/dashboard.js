
function addItem() {
    let code;
    let name;
    let price;
    let expiryDate;
    let quantity;

    let category;

    let items = getFoodItems();

    for (category in items) {

        if (Object.keys().includes(category)) {
            items[category].push(
                {
                    code,
                    name,
                    price,
                    expiryDate,
                    quantity
                }
            );

        } else {
            items[category] = [{
                code,
                name,
                price,
                expiryDate,
                quantity
            }]

        }

        
    }

    setFoodItems(items);

}

function deleteItem() {
    let code;

    let items = getFoodItems();

    for (category in items) {
        items[category] = items[category].filter(
            item => item.code !== code
        );

    }

    setFoodItems(items);
    
}