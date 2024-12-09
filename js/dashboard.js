

// INSIGHTS
function calculatePopularItemArray() {}

function getGeneralInformation() {

}

// HISTORY
function logToHistory() {

}

function displayHistory() {

}

// ORDERS
function completeOrder() {

}

function deleteOrder() {

}

// USERS
function addUser() {

}

function deleteUser() {

}

// WARNINGS
function displayWarningData() {

}


// ITEMS
function addItem() {
    let code;
    let name;
    let price;
    let expiryDate;
    let quantity;

    let currentCategory;

    let items = getFoodItems();

    for (category in items) {

        if (Object.keys().includes(currentCategory)) {
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
            items[currentCategory] = [{
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

function editItem() {
    let code;
    let name;
    let price;
    let expiryDate;
    let quantity;

    let items = getFoodItems();

    for (category in items) {
        items[category] = items[category].map(
            item => {
                if (item.code ==- code) {
                    item.name = name;
                    item.price = price;
                    item.expiryDate = expiryDate;
                    item.quantity = quantity;

                    return item;
                }

                return item;
            }
        );

    }


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