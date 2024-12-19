let swipers = []; // swiper objects for destroying later

let currentFoodItems = getFoodItems();

setup();


function setup() {

    let username = document.getElementById("usernameNavBar");
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


        let scrollContainer = document.getElementById("scrollContainer");

        scrollContainer.innerHTML += `
        <div class="w-full flex flex-col">

            <!-- Item header  -->
            <div class="flex justify-end w-full">

                <div class="flex flex-col items-end pb-10 mr-10">
                    <h1 class="font-madimi stroke text-[70px]  text-yellow-400 stroke"
                        data-text="${category}">
                        ${category}</h1>

                    <div class="bg-white text-end h-4 w-[70%]"></div>
                </div>

            </div>


            <!-- Swipeable carousel -->

            <div class="w-fit">
            
            
                <div class="w-full">
                    <div >
                        <div class="collection-page-${category}-carousel flex gap-10 overflow-x-scroll   ">


                        </div>

                    </div>

                </div>
                
            </div>

        </div>
        
        `;

        let carousel = document.querySelector(`.collection-page-${category}-carousel`);


        getFoodItems()[category].forEach(item => {



            carousel.innerHTML += (
                `
                    <div class="w-auto shrink-0 pb-8">
                        <div onclick="addItem('${item.code}');"
                            class="bg-indigo-50 max-w-2xl rounded-2xl h-64 flex overflow-hidden justify-center items-center
                            transform transition ease-in-out duration-300 hover:cursor-pointer hover:opacity-40 hover:scale-75 hover:shadow-lg hover:shadow-red-600">
                            <div class=" flex flex-row items-end pt-60 ">
                                <div class="absolute  pl-7 bg-red-400 bg-opacity-[0.26] w-full">

                                    <span
                                        class="text-[21px] font-itim text-white block">${item.name}</span>
                                    <span class="text-[20px] font-itim text-white ">Rs.
                                        ${item.price}</span>
                                </div>
                            </div>
                            <img src="${getImageURL(item.code, true)}"
                                class="object-cover w-full h-full" alt="">
                                ${item.discount ? `<div class="absolute top-4 right-1 bg-red-500 text-white px-3 py-1 rounded-full text-sm">${item.discount} off</div>` : ""}
                                <div class="absolute top-4 left-1 bg-yellow-500 bg-opacity-30 text-white px-3 py-1 rounded-full text-sm">x${getCurrentQuantity(item.code)} left!</div>

                                <div
                                    class="absolute text-green-500 font-bold flex justify-center items-center opacity-0 w-full h-full transition-opacity ease-out duration-300 hover:opacity-100">
                                    <div class="text-9xl">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                            viewBox="0 0 24 24" stroke-width="1.5" class="w-2/3"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                        </svg>

                                    </div>
                                </div>
                        </div>
                        
                    </div>

                `
            );
        });

    }
}

function updateSwipers(category) {
    document.getElementById("scrollContainer").innerHTML = "";
    initalizeSwipers();



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
            price: 0, // TODO: ADD Price
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

function updatePrice() {

    calculatePrice();

    let price = document.getElementById("priceLabel");

    price.innerText = "Rs. " + getCurrentOrder().price;
}

function updateItems() {
    let itemList = document.getElementById("itemContainer");
    itemList.innerHTML = "";

    let items = getCurrentOrder().items;

    console.log("UpdateItems", items);


    items?.forEach((item) => {

        itemList.innerHTML += `
        <div class="item">
            <div class="flex flex-col ">
                <div class="font-madimi text-xl">
                    ${getItem(item.code).name}
                </div>
                <div class="font-madimi opacity-[53%]">
                    <span class="text-lg ">${getCategoryByItemCode(item.code)} x${item.quantity}</span>
                    <span> . </span>
                    <span class="text-sm">Rs. ${getItem(item.code).price}</span>
                </div>
            </div>

            <div>
                <div onclick="removeItem('${item.code}')"
                    class="bg-red-600 rounded-full font-bold text-white px-4 py-2 text-2xl hover:bg-red-300 hover:text-black hover:cursor-pointer transition ease-out duration-300">

                    X
                </div>
            </div>
        </div>

        `;
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

function restoreItemQuantity(itemCode, quantity) {

    for (category in currentFoodItems) {
        let foodCategory = currentFoodItems[category];
        foodCategory.forEach((item, index) => {
            if (item.code === itemCode) {
                currentFoodItems[category][index].quantity += quantity;
                return currentFoodItems[category][index].quantity;
            }
        })
    }


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

function getCurrentQuantity(itemCode) {
    for (const category in currentFoodItems) {
        if (Object.prototype.hasOwnProperty.call(currentFoodItems, category)) {
            const element = currentFoodItems[category];

            let item = element.find((item) => item.code === itemCode);

            if (item) return item.quantity;
        }
    }

}

function calculatePrice() {
    let currentOrder = getCurrentOrder();


    console.log("CURORDER", currentOrder);


    currentOrder.price = 0;

    currentOrder.items.forEach((item) => {
        let itemData = getItem(item.code);

        console.log("item", item);


        currentOrder.price += itemData.price * item.quantity - (item.discount ? (itemData.price * (parseInt(item.discount.replace("%", "")) / 100)) : 0);



    });

    setCurrentOrder(currentOrder);

}

function addEventListeners() {

    function updateValues(key, value) {
        let order = getCurrentOrder();

        order[key] = value;

        setCurrentOrder(order);
    }

    function search() {
        let searchInput = document.getElementById("searchInput").value.toLowerCase();

        let scrollContainer = document.getElementById("scrollContainer");
        scrollContainer.innerHTML = `
            <div class="w-full">
                <div >
                    <div id="searchCarousel" class="flex gap-10 overflow-x-scroll   ">


                    </div>

                </div>

            </div>
        `;

        if (searchInput.length != 0) {

            const results = [];


            for (const category in currentFoodItems) {
                if (currentFoodItems.hasOwnProperty(category)) {
                    const matchedItems = currentFoodItems[category].filter(item =>
                        item.name.toLowerCase().includes(searchInput)
                    );

                    results.push(...matchedItems);
                }
            }

            results.forEach((item) => {
                document.getElementById("searchCarousel").innerHTML += `

                
                
                    <div class="w-auto shrink-0 pb-8">
                        <div onclick="addItem('${item.code}');"
                            class="bg-indigo-50 max-w-2xl rounded-2xl h-64 flex overflow-hidden justify-center items-center
                            transform transition ease-in-out duration-300 hover:cursor-pointer hover:opacity-40 hover:scale-75 hover:shadow-lg hover:shadow-red-600">
                            <div class=" flex flex-row items-end pt-60 ">
                                <div class="absolute  pl-7 bg-red-400 bg-opacity-[0.26] w-full">

                                    <span
                                        class="text-[21px] font-itim text-white block">${item.name}</span>
                                    <span class="text-[20px] font-itim text-white ">Rs.
                                        ${item.price}</span>
                                </div>
                            </div>
                            <img src="${getImageURL(item.code, true)}"
                                class="object-cover w-full h-full" alt="">
                                ${item.discount ? `<div class="absolute top-4 right-1 bg-red-500 text-white px-3 py-1 rounded-full text-sm">${item.discount} off</div>` : ""}
                                <div class="absolute top-4 left-1 bg-yellow-500 bg-opacity-30 text-white px-3 py-1 rounded-full text-sm">x${getCurrentQuantity(item.code)} left!</div>

                                <div
                                    class="absolute text-green-500 font-bold flex justify-center items-center opacity-0 w-full h-full transition-opacity ease-out duration-300 hover:opacity-100">
                                    <div class="text-9xl">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                            viewBox="0 0 24 24" stroke-width="1.5" class="w-2/3"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                        </svg>

                                    </div>
                                </div>
                        </div>
                        
                    </div>
                `;
            })

        } else {
            updateSwipers();
        }

    }


    document.getElementById("customerName").addEventListener('input',
        function (_) {

            updateValues("customerName", this.value);

        });

    document.getElementById("telephoneNumber").addEventListener('input',
        function (_) {
            updateValues("telephoneNumber", this.value);
        })

    document.getElementById("searchInput").addEventListener('input',
        function (_) {
            search(this.value);
        }
    );
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
    updateSwipers();
    updateItems();
    updatePrice();

}

function getOrderID() {
    let lastOrderNumber = localStorage.getItem("lastOrderNumber");

    if (lastOrderNumber == null) {
        localStorage.setItem("lastOrderNumber", "ODR#0");
        return "ODR#" + 1;

    } else {

        return "ODR#" + (parseInt(lastOrderNumber.substring(4)) + 1);
    }

}

function removeItem(itemCode) {


    let currentOrder = getCurrentOrder();

    let quantity = currentOrder.items.find((item) => item.code === itemCode).quantity;

    currentOrder.items = currentOrder.items.filter(
        (item) => item.code !== itemCode
    );

    restoreItemQuantity(itemCode, quantity);

    setCurrentOrder(currentOrder);
    restoreQuantities();
    adjustQuantities();
    updateSwipers();
    updateItems();
    updatePrice();

    console.log("Current Food Items", currentFoodItems);




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


    alert("Order placed succesfully! Your Order ID is :", getOrderID());

    localStorage.setItem("lastOrderNumber", getOrderID());
    updateFoodItems();
    resetOrder(true);

    console.log("Order placed:", allUsers);
    updateSwipers();



}



function updateOrderID() {
    let orderID = document.getElementById("orderID");

    orderID.value = getOrderID();

}

function resetOrder(new_order) {
    createNewOrder();

    if (!new_order) restoreQuantities();
    updateSwipers();
    updateItems();
    updatePrice();

    document.getElementById("itemContainer").innerHTML = "";
    document.getElementById("priceLabel").innerHTML = "";

}


