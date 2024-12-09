let swipers = []; // swiper objects for destroying later

let currentFoodItems = getFoodItems();

setup();


function setup() {
    
    let username = document.getElementById("username");
    let customerName = document.getElementById("customerName");

    username.innerText = getCurrentUser().username;
    customerName.value = getCurrentUser().username;

    if (!getCurrentOrder()) {

        createNewOrder();
    }

    addEventListeners();
    updateOrderID();
    updateItems();
    adjustQuantities();
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

function getCurrentOrder() {
    return JSON.parse(localStorage.getItem("currentOrder"));
}

function setCurrentOrder(order) {
    localStorage.setItem("currentOrder", JSON.stringify(order));

}

function createNewOrder() {
    
    setCurrentOrder(
        {
            orderID: getOrderID(),
            customerName: document.getElementById("customerName").value,
            telephoneNumber: document.getElementById("telephoneNumber").value,
            items: []
            
        }
    );
    
    updateOrderID();
}

function adjustQuantities() { 
    // This function adjusts the current food item quantities in accordance
    // with the current order. So item quantity validations would still work
    // upon refreshes.

    removeQuantities(true);
}

function updateItems() {
    let itemList = document.getElementById("items");
    itemList.innerHTML = "";

    let items = getCurrentOrder().items;

    items?.forEach((item) => {
        itemList.innerHTML += ``;
    });
}

function removeQuantities(adjust) {

    let currentOrder = getCurrentOrder();

    currentOrder?.items.forEach((uItem) => {
        for (category in currentFoodItems) {
            let foodCategory = currentFoodItems[category];
            foodCategory.forEach((item, index) => {

                if (item.code === uItem.code) {
                    currentFoodItems[category][index].quantity -= adjust ? uItem.quantity : 1;

                    console.log("currentFoodItems quantity remove:", currentFoodItems);

                    return currentFoodItems[category][index].quantity;
                }
            })
        }
    });

}

function restoreQuantities() {

    let currentOrder = getCurrentOrder();

    currentOrder?.items.forEach((uItem) => {
        for (category in currentFoodItems) {
            let foodCategory = currentFoodItems[category];
            foodCategory.forEach((item, index) => {
                if (item.code === uItem.itemCode) {
                    currentFoodItems[category][index].quantity += 1;

                    console.log("currentFoodItems quantity restore:", currentFoodItems);

                    return currentFoodItems[category][index].quantity;
                }
            })
        }
    });
    
        
    
    
}

function addEventListeners(){

    function updateValues(key, value) {
        let order = getCurrentOrder();

        order[key] = value;
        
        setCurrentOrder(order);
    }

    document.getElementById("customerName").addEventListener('input',
         function (_) {
            
            updateValues("customerName", this.value);

    });

    document.getElementById("telephoneNumber").addEventListener('input',
        function (_) {
           updateValues("telephoneNumber", this.value);
   })
}


function addItem(itemCode) {

    let currentOrder = getCurrentOrder();

    let item = getItem(itemCode, currentFoodItems)

    console.log("Added item:", item);

    if (item.quantity <= 0) {
        alert("Not enough quantity");
        return;
    } 

    
    let itemExists = currentOrder.items.some((item) => item.code === itemCode);
    
    if (itemExists) {
        
        currentOrder.items.map((item) => {
            if (item.code === itemCode) {
                item.quantity += 1;
            }
            return item;
        });
    } else {
        
        currentOrder.items.push(
            {
                code: itemCode,
                quantity: 1
            }
        );
    }
    
    setCurrentOrder(currentOrder);
    removeQuantities();
    
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

    let currentOrder = getCurrentOrder();

    currentOrder.items = currentOrder.items.filter(
        (item) => item.code !== itemCode
    );

    setCurrentOrder(currentOrder);
    restoreQuantities();
}

function updateFoodItems() {

    setFoodItems(currentFoodItems);
    currentFoodItems = getFoodItems();
}

function placeOrder() {

    let currentUser = getCurrentUser();

    console.log("currentUser", currentUser);
    
    if (!getCurrentOrder().items) alert("No items added!");

    currentUser.orders.push(getCurrentOrder());

    let allUsers = JSON.parse(localStorage.getItem("users"));
    
    let index = allUsers.findIndex((user) => currentUser.email === user.email);
    
    allUsers[index] = currentUser;
    
    localStorage.setItem("users", JSON.stringify(allUsers));
    
    
    localStorage.setItem("lastOrderNumber", getOrderID());
    updateFoodItems();
    resetOrder();

    console.log("Order placed:", allUsers);
    

}



function updateOrderID() {
    let orderID = document.getElementById("orderID");

    orderID.innerText = getOrderID();
}

function resetOrder() {
    createNewOrder();

    document.getElementById("items").innerHTML = "";

}

function search() {

}


