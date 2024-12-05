let swipers = []; // swiper objects for destroying later

let currentFoodItems = getFoodItems();

setup();


function setup() {
    

    let username = document.getElementById("username");
    let customerName = document.getElementById("customerName");

    username.innerText = getCurrentUser().username;
    customerName.value = getCurrentUser().username;

    updateOrderID();
    initalizeSwipers();

}

function initalizeSwipers() {
    for (category in getFoodItems()) {
        swipers[category] = new Swiper(
            // TODO:
        );
    }
}

function updateSwipers(category) {
    
    if (swipers[category] !== undefined) {
        swipers[category].destroy();
        swipers[category] = new Swiper(

        );
    }

    let categorySwiper  = swipers[category];
    let items = getFoodItems()[category];

    items.forEach(item => {
        let itemSlide = ``;

        categorySwiper.addSlide(itemSlide);
    });


    
}

function updateItems() {
    let itemList = document.getElementById("items");
    itemList.innerHTML = "";

    let orders = getCurrentUser().orders;

    orders.forEach((order) => {
        itemList.innerHTML += ``;
    });
}

function updateQuantities() {

    let currentUser = getCurrentUser();

    let userItems = currentUser.orders.map(order => order.items).flat();

    userItems.forEach((uItem) => {
        for (category in currentFoodItems) {
            let foodCategory = currentFoodItems[category];
            foodCategory.forEach((item, index) => {
                if (item.code === uItem.itemCode) {
                    currentFoodItems[category][index].quantity -= 1;

                    console.log("currentFoodItems", currentFoodItems);


                    return currentFoodItems[category][index].quantity;
                }
            })
        }
    });

    


}


function addItem(itemCode) {
    let orderID = getOrderID();

    let user = getCurrentUser();

    
    let item = getItem(itemCode, currentFoodItems)

    // MODAL QUANTITY

    console.log("ITEM", item);

    if (item.quantity-1 <= 0) {
        alert("Not enough quantity");
        return;
    } 

    updateQuantities();


    let index = user.orders.findIndex((order) => order.orderID === orderID);


    let order;
    if (index === -1) {
        order = {
            orderID: getOrderID(),
            customerName: document.getElementById("customerName").value, // TODO: ADD EVENT LISTENERS
            telephoneNumber: document.getElementById("telephoneNumber").value,
            items: [{itemCode: itemCode, quantity: 1}]
        };

        user.orders.push(order);

    } else {
        user.orders[index].items = user.orders[index].items.filter((item) => {
            if (item.itemCode === itemCode) {
                item.quantity += 1;
                return item;
            }
        });
        
    }

    setCurrentUser(user);
    
}

function getOrderID() {
    let lastOrderNumber = localStorage.getItem("lastOrderNumber");

    if (lastOrderNumber == null) {
        localStorage.setItem("lastOrderNumber", "ODR#0");
        return  "ODR#" + 1;

    } else {
    
        return  "ODR#" + (parseInt(lastOrderNumber.substring(4))+1);
    }

}

function removeItem(itemCode) {
    let orderID = getOrderID();

    let user = getCurrentUser();

    let index = user.orders.findIndex((order) => order.orderID === orderID);
   
    user.orders[index].items = user.orders[index].items.filter((item) => item.itemCode !== itemCode);
    
    user.orders.splice(index, user.orders[index]);
}

function updateFoodItems() {

    setFoodItems(currentFoodItems);
    currentFoodItems = getFoodItems();
}

function placeOrder() {

    let currentUser = getCurrentUser();

    localStorage.setItem("lastOrderNumber", getOrderID());

    let allUsers = JSON.parse(localStorage.getItem("users"));

    let index = allUsers.findIndex((user) => currentUser.email === user.email);

    allUsers[index] = currentUser;

    localStorage.setItem("users", JSON.stringify(allUsers));

    
    updateFoodItems();
    updateOrderID();
    clearOrder();


    console.log(allUsers);
    

}

function clearOrder() {
}

function updateOrderID() {
    let orderID = document.getElementById("orderID");

    orderID.innerText = getOrderID();
}

function resetOrder() {
    setCurrentUser(
        JSON.stringify(localStorage.getItem("users")).find((u) => u.email === getCurrentUser().email)
    );
}

function search() {

}


