
// INSIGHTS
function calculatePopularItemArray() { }

function displayGeneralInformation() {

}

// HISTORY
function logToHistory() {

}

function displayHistory() {

}

// ORDERS
function completeOrder(orderID) {
    alert("Order Completed!", orderID);

    deleteOrder(orderID);
}

function deleteOrder(orderID) {
    let users = getAllUsers();

    users = users.map((user) => {
        user.orders = user.orders.filter((order) => order.orderID !== orderID);
        return user;
    });


    localStorage.setItem("users", JSON.stringify(users));
    displayOrders();
}



function viewOrderItems(items) {
    items = JSON.parse(items);

}


function displayItems() {

    let itemTableBody = document.getElementById("itemTableBody");


    itemTableBody.innerHTML = "";

    let foodItems = getFoodItems();

    for (category in foodItems) {
        let foodCategory = foodItems[category];

        foodCategory.forEach((item) => {
            itemTableBody.innerHTML += `
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        ${item.code}
                    </th>
                    <td class="px-6 py-4">
                        ${item.name}
                    </td>
                    <td class="px-6 py-4">
                        Rs. ${item.price}
                    </td>
                    <td class="px-6 py-4">
                        ${item.discount ? item.discount : "No Discount"}
                    </td>
                    <td class="px-6 py-4">
                        ${item.expiryDate}
                    </td>
                    <td class="px-6 py-4">
                        ${item.quantity}
                    </td>
                    <td class="px-6 py-4">
                        ${category}
                    </td>
                    <td class="px-6 py-4 flex justify-evenly">
                        <a
                            class="font-bold text-yellow-600  dark:text-yellow-500 hover:underline hover:cursor-pointer" onclick="showEditItemPopup('${JSON.stringify(item).replace(/"/g, '&quot;')}', '${category}')">Edit
                            Item</a>
                        <a
                            class="font-bold text-red-600 dark:text-red-500 hover:underline hover:cursor-pointer" onclick="activatePopup('${item.code}')">Delete
                            Item</a>
    
    
                    </td>
                </tr>
            `;

        });
    }



}

function displayOrders() {

    let orderTableBody = document.getElementById("orderTableBody");

    orderTableBody.innerHTML = "";
    getAllOrders().forEach((order) => {
        orderTableBody.innerHTML += `
         <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                ${order.orderID}
            </th>
            <td class="px-6 py-4">
                ${order.customerName}
            </td>
            <td class="px-6 py-4">
                ${order.telephoneNumber}
            </td>
            <td class="px-6 py-4">
                ${order.price}
            </td>
            <td class="px-6 py-4 flex justify-between">
                <a
                    class="font-bold text-green-600  dark:text-green-500 hover:underline hover:cursor-pointer" onclick="completeOrder('${order.orderID}')">Complete</a>
                <a
                    onclick="viewOrderItems(${JSON.stringify(order.items)})"
                    class="font-bold text-yellow-600  dark:text-yellow-500 hover:underline hover:cursor-pointer">View
                    Items</a>
                <button onclick="deleteOrder('${order.orderID}')"
                    class="font-bold text-red-600 dark:text-red-500 hover:underline hover:cursor-pointer">Delete</button>


            </td>
        </tr>
        `;
    })



}

// USERS

function addUser() {
    document.getElementById("addUserPopup").classList.remove("hidden");

    document.getElementById("modal-title").innerHTML = "Add User";
    document.getElementById("addUserConfirm").innerHTML = "Create User";

    document.getElementById("addUserConfirm").addEventListener("click", function () {


        createUser(
            document.getElementById("userEmailInput").value,
            document.getElementById("userPasswordInput").value,
            document.getElementById("userNameInput").value,
            document.getElementById("userRoleInput").value,
        )

        displayUsers();
        dismissAddUserPopup();
    }, { once: true });

}

function dismissAddUserPopup() {
    document.getElementById("addUserPopup").classList.add("hidden");
}

function deleteUser(email, password) {
    console.log("deletUser", JSON.stringify(getAllUsers().filter((user) => user.email !== email && user.password !== password)));


    localStorage.setItem("users", JSON.stringify(getAllUsers().filter((user) => user.email !== email && user.password !== password)));
    displayUsers();

}

function displayUsers() {
    let userTableBody = document.getElementById("userTableBody");

    console.log("allUsers", getAllUsers());


    userTableBody.innerHTML = "";

    getAllUsers().forEach((user, index) => {
        userTableBody.innerHTML += `
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                ${index}
            </th>
            <td class="px-6 py-4">
                ${user.username}
            </td>
            <td class="px-6 py-4">
                ${user.email}
            </td>
            <td class="px-6 uppercase py-4">
                ${user.role}
            </td>
            <td class="px-6 py-4 flex justify-around">
                <a
                    class="font-bold text-yellow-600  dark:text-yellow-500 hover:underline hover:cursor-pointer"
                    onclick="showEditUserPopup('${JSON.stringify(user).replace(/"/g, '&quot;')}')">Edit
                    User</a>
                <a
                    onclick="deleteUser('${user.email}', '${user.password}')"
                    class="font-bold text-red-600 dark:text-red-500 hover:underline hover:cursor-pointer">Delete
                    User</a>


            </td>
        </tr>
        `;
    })


}

function showEditUserPopup(user) {

    user = JSON.parse(user);

    document.getElementById("addUserPopup").classList.remove("hidden");
    document.getElementById("modal-title").innerHTML = "Edit User";
    document.getElementById("addUserConfirm").innerHTML = "Edit User";

    document.getElementById("userEmailInput").value = user.email;
    document.getElementById("userPasswordInput").value = user.password;
    document.getElementById("userNameInput").value = user.username;
    document.getElementById("userRoleInput").value = user.role;

    document.getElementById("addUserConfirm").addEventListener("click", function () {

        editUser(
            document.getElementById("userEmailInput").value,
            document.getElementById("userPasswordInput").value,
            document.getElementById("userNameInput").value,
            document.getElementById("userRoleInput").value,
        )

        displayUsers();     
        dismissAddUserPopup();

}, { once: true });
}

function editUser(email, password, username, role) {

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
                if (item.code == - code) {
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

function deleteItem(code) {

    let items = getFoodItems();

    for (category in items) {
        items[category] = items[category].filter(
            item => item.code !== code
        );

    }

    setFoodItems(items);
    displayItems();
}

function activatePopup(itemCode) {
    document.getElementById("deleteItemPopup").classList.remove("hidden");

    document.getElementById("deleteItemConfirm").addEventListener("click", function () {
        deleteItem(itemCode);
        dismissDeleteItemModal();
    }, { once: true });


}

function dismissDeleteItemModal() {

    document.getElementById("deleteItemPopup").classList.add("hidden");

}

function createCategory(category) {
    let foodItems = getFoodItems();
    foodItems[category] = [];
    setFoodItems(foodItems);
}

function createItem(code, name, price, discount, expiryDate, quantity, category) {

    let foodItems = getFoodItems();

    if (foodItems[category] !== undefined) {
        foodItems[category].push({
            code,
            name,
            price,
            discount,
            expiryDate,
            quantity
        });
    } else {
        foodItems[category] = [{
            code,
            name,
            price,
            discount,
            expiryDate,
            quantity
        }]
    }

    setFoodItems(foodItems);
    displayItems();

}


function showCreateItemPopup() {
    document.getElementById("createItemPopup").classList.remove("hidden");

    document.getElementById("modal-title").innerHTML = "Create Item";    
    document.getElementById("createItemConfirm").innerHTML = "Create Item";



    document.getElementById("createItemConfirm").addEventListener("click", function () {

        createItem(
            document.getElementById("itemCodeInput").value,
            document.getElementById("itemNameInput").value,
            parseFloat(document.getElementById("itemPriceInput").value),
            document.getElementById("itemDiscountInput").value,
            document.getElementById("itemExpiryInput").value,
            parseInt(document.getElementById("itemQuantityInput").value),
            document.getElementById("itemCategoryInput").value
        )

        dismissCreateItemPopup();
    }, { once: true });

}

function dismissCreateItemPopup() {
    document.getElementById("createItemPopup").classList.add("hidden");

}


function showEditItemPopup(item, category) {

    document.getElementById("modal-title").innerHTML = "Edit Item";    
    document.getElementById("createItemConfirm").innerHTML = "Edit Item";

    item = JSON.parse(item);

    document.getElementById("createItemPopup").classList.remove("hidden");
    
    let itemCode = document.getElementById("itemCodeInput");
    let itemName = document.getElementById("itemNameInput");
    let itemPrice = document.getElementById("itemPriceInput");
    let itemDiscount = document.getElementById("itemDiscountInput");
    let itemExpiry = document.getElementById("itemExpiryInput");
    let itemQuantity = document.getElementById("itemQuantityInput");
    let itemCategory = document.getElementById("itemCategoryInput");

    itemCode.value = item.code;
    itemName.value = item.name;
    itemPrice.value = item.price;
    itemDiscount.value = item.discount;
    itemExpiry.value = item.expiryDate;
    itemQuantity.value = item.quantity;
    itemCategory.value = category;

    document.getElementById("createItemConfirm").addEventListener("click", function () {

        editItem(
            itemCode.value,
            itemName.value,
            itemPrice.value,
            itemDiscount.value,
            itemExpiry.value,
            itemQuantity.value,
            itemCategory.value
        )

        itemCode.value = "";
        itemName.value = "";
        itemPrice.value = "";
        itemDiscount.value = "";        
        itemExpiry.value = "";
        itemQuantity.value = "";
        itemCategory.value = "";

        displayItems();
        dismissCreateItemPopup();
    }, { once: true });


}

function editItem(code, name, price, discount, expiryDate, quantity, category) {
    
}