console.log("DATA LOADED");



const sampleFoodItems = {
    burgers: [
        { code: "B1001", name: "Classic Burger (Large)", price: 750.00, discount: null, expiryDate: "2024-12-08", quantity: 5 },
        { code: "B1002", name: "Classic Burger (Regular)", price: 1500.00, discount: "15%", expiryDate: "2024-12-08", quantity: 8 },
        { code: "B1003", name: "Turkey Burger", price: 1600.00, discount: null, expiryDate: "2024-12-08", quantity: 4 },
        { code: "B1004", name: "Chicken Burger (Large)", price: 1400.00, discount: null, expiryDate: "2024-12-08", quantity: 7 },
        { code: "B1005", name: "Chicken Burger (Regular)", price: 800.00, discount: "20%", expiryDate: "2024-12-08", quantity: 10 },
        { code: "B1006", name: "Cheese Burger (Large)", price: 1000.00, discount: null, expiryDate: "2024-12-08", quantity: 3 },
        { code: "B1007", name: "Cheese Burger (Regular)", price: 600.00, discount: null, expiryDate: "2024-12-08", quantity: 9 },
        { code: "B1008", name: "Bacon Burger", price: 650.00, discount: "15%", expiryDate: "2024-12-08", quantity: 6 },
        { code: "B1009", name: "Shawarma Burger", price: 800.00, discount: null, expiryDate: "2024-12-08", quantity: 4 },
        { code: "B1010", name: "Olive Burger", price: 1800.00, discount: null, expiryDate: "2024-12-08", quantity: 2 },
        { code: "B1012", name: "Double-Cheese Burger", price: 1250.00, discount: "20%", expiryDate: "2024-12-08", quantity: 3 },
        { code: "B1013", name: "Crispy Chicken Burger (Regular)", price: 1200.00, discount: null, expiryDate: "2024-12-08", quantity: 5 },
        { code: "B1014", name: "Crispy Chicken Burger (Large)", price: 1600.00, discount: "10%", expiryDate: "2024-12-08", quantity: 6 },
        { code: "B1015", name: "Paneer Burger", price: 900.00, discount: null, expiryDate: "2024-12-08", quantity: 8 }
    ],

    submarines: [
        { code: "B1016", name: "Crispy Chicken Submarine (Large)", price: 2000.00, discount: null, expiryDate: "2024-12-11", quantity: 4 },
        { code: "B1017", name: "Crispy Chicken Submarine (Regular)", price: 1500.00, discount: null, expiryDate: "2024-12-11", quantity: 7 },
        { code: "B1018", name: "Chicken Submarine (Large)", price: 1800.00, discount: "3%", expiryDate: "2024-12-11", quantity: 3 },
        { code: "B1019", name: "Chicken Submarine (Regular)", price: 1400.00, discount: null, expiryDate: "2024-12-11", quantity: 5 },
        { code: "B1020", name: "Grinder Submarine", price: 2300.00, discount: null, expiryDate: "2024-12-11", quantity: 6 },
        { code: "B1021", name: "Cheese Submarine", price: 2200.00, discount: null, expiryDate: "2024-12-11", quantity: 8 },
        { code: "B1022", name: "Double Cheese n Chicken Submarine", price: 1900.00, discount: "16%", expiryDate: "2024-12-11", quantity: 4 },
        { code: "B1023", name: "Special Horgie Submarine", price: 2800.00, discount: null, expiryDate: "2024-12-11", quantity: 3 },
        { code: "B1024", name: "MOS Special Submarine", price: 3000.00, discount: null, expiryDate: "2024-12-11", quantity: 5 }
    ],

    fries: [
        { code: "B1025", name: "Steak Fries (Large)", price: 1200.00, discount: null, expiryDate: "2024-12-09", quantity: 7 },
        { code: "B1026", name: "Steak Fries (Medium)", price: 600.00, discount: null, expiryDate: "2024-12-09", quantity: 5 },
        { code: "B1027", name: "French Fries (Large)", price: 800.00, discount: null, expiryDate: "2024-12-09", quantity: 3 },
        { code: "B1028", name: "French Fries (Medium)", price: 650.00, discount: null, expiryDate: "2024-12-09", quantity: 8 },
        { code: "B1029", name: "French Fries (Small)", price: 450.00, discount: null, expiryDate: "2024-12-09", quantity: 6 },
        { code: "B1030", name: "Sweet Potato Fries (Large)", price: 600.00, discount: null, expiryDate: "2024-12-09", quantity: 4 }
    ],

    pasta: [
        { code: "B1031", name: "Chicken n Cheese Pasta", price: 1600.00, discount: "15%", expiryDate: "2024-12-12", quantity: 5 },
        { code: "B1032", name: "Chicken Penne Pasta", price: 1700.00, discount: null, expiryDate: "2024-12-12", quantity: 7 },
        { code: "B1033", name: "Ground Turkey Pasta Bake", price: 2900.00, discount: "10%", expiryDate: "2024-12-12", quantity: 4 },
        { code: "B1034", name: "Creamy Shrimp Pasta", price: 2000.00, discount: null, expiryDate: "2024-12-12", quantity: 6 },
        { code: "B1035", name: "Lemon Butter Pasta", price: 1950.00, discount: null, expiryDate: "2024-12-12", quantity: 3 },
        { code: "B1036", name: "Tagliatelle Pasta", price: 2400.00, discount: "1%", expiryDate: "2024-12-12", quantity: 5 },
        { code: "B1037", name: "Baked Ravioli", price: 2000.00, discount: "1%", expiryDate: "2024-12-12", quantity: 8 }
    ],

    chicken: [
        { code: "B1038", name: "Fried Chicken (Small)", price: 1200.00, discount: null, expiryDate: "2024-12-10", quantity: 6 },
        { code: "B1039", name: "Fried Chicken (Regular)", price: 2300.00, discount: "10%", expiryDate: "2024-12-10", quantity: 5 },
        { code: "B1040", name: "Fried Chicken (Large)", price: 3100.00, discount: "5%", expiryDate: "2024-12-10", quantity: 4 },
        { code: "B1041", name: "Hot Wings (Large)", price: 2400.00, discount: null, expiryDate: "2024-12-10", quantity: 7 },
        { code: "B1042", name: "Devilled Chicken (Large)", price: 900.00, discount: null, expiryDate: "2024-12-10", quantity: 5 },
        { code: "B1043", name: "BBQ Chicken (Regular)", price: 2100.00, discount: null, expiryDate: "2024-12-10", quantity: 6 }
    ],

    beverages: [
        { code: "B1044", name: "Pepsi (330ml)", price: 990.00, discount: "5%", expiryDate: "2024-12-31", quantity: 10 },
        { code: "B1045", name: "Coca-Cola (330ml)", price: 1230.00, discount: null, expiryDate: "2024-12-31", quantity: 8 },
        { code: "B1046", name: "Sprite (330ml)", price: 1500.00, discount: "3%", expiryDate: "2024-12-31", quantity: 6 },
        { code: "B1047", name: "Mirinda (330ml)", price: 850.00, discount: "7%", expiryDate: "2024-12-31", quantity: 4 }
    ]
};


const branches = [
    {
        name: "MOS Burgers",
        image: "assets/branches/main.webp",
        type: "Main Branch",
        description: "The main branch, where it all started. Located in Panadura near the the police station."
    },
    {
        name: "MOS Little Burgers",
        image: "assets/branches/sub1.webp",
        type: "Sub Branch",
        description: "Sub branch located in Colombo, with a simple, subtle yet beautiful atmosphere."
    },

];

setFoodItems();

function setFoodItems(data) {
    let items = localStorage.getItem("foodItems");

    if (!items) {
        data = sampleFoodItems;
    } else {
        if (!data) {
            data = getFoodItems();
        }
    }


    localStorage.setItem("foodItems", JSON.stringify(data));

}

function getFoodItems() {
    return JSON.parse(localStorage.getItem("foodItems"));
}

function getCategoryByItemCode(itemCode) {
    for (const category in getFoodItems()) {
        const item = getFoodItems()[category].find(item => item.code === itemCode);
        if (item) {
            return category;
        }
    }
    return null;
}


function getBranches() {
    return branches;
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function getRandomItemArray() {
    let allItems = [];

    for (let item in getFoodItems()) {
        let category = getFoodItems()[item];
        allItems.push(...shuffleArray(category));
    }

    return shuffleArray(allItems);
}

function getItem(itemCode, items) {
    let foodItems = items || getFoodItems()

    console.log("getItemFoodItem", foodItems);

    console.log("GetItemItemCode ", itemCode);


    for (category in foodItems) {
        for (let item of foodItems[category]) {
            if (item.code === itemCode) {
                return item;
            }
        }
    }
}


function getImageURL(itemCode, isCollection = false) {
    const itemNumber = parseInt(itemCode.substring(1)) - 1000;

    let base = isCollection ? "../assets/food/" : "assets/food/";

    const classicBurgers = [1, 2];
    const chickenBurgers = [4, 5, 13, 14];
    const cheeseBurgers = [6, 7];
    const specialBurgers = [3, 8, 9, 10, 12, 15];

    const chickenSubmarines = [16, 17, 18, 19];
    const otherSubmarines = [20, 21, 22, 23, 24];

    const fries = [25, 26, 27, 28, 29, 30];
    const pasta = [31, 32, 33, 34, 35, 36, 37];
    const friedChicken = [38, 39, 40];
    const otherChicken = [41, 42, 43];
    const beverages = [44, 45, 46, 47];

    if (classicBurgers.includes(itemNumber)) return base + "burger/classic_burger.jpg";
    if (chickenBurgers.includes(itemNumber)) return base + "burger/chicken_burger.jpg";
    if (cheeseBurgers.includes(itemNumber)) return base + "burger/cheese_burger.jpg";
    if (specialBurgers.includes(itemNumber)) return base + "burger/special_burger.jpg";

    if (chickenSubmarines.includes(itemNumber)) return base + "submarine/chicken_submarine.jpg";
    if (otherSubmarines.includes(itemNumber)) return base + "submarine/other_submarine.jpg";

    if (fries.includes(itemNumber)) return base + "fries/fries.jpg";

    if (pasta.includes(itemNumber)) return base + "pasta/pasta.jpg";

    if (friedChicken.includes(itemNumber)) return base + "chicken/fried_chicken.jpg";
    if (otherChicken.includes(itemNumber)) return base + "chicken/other_chicken.jpg";

    if (beverages.includes(itemNumber)) {
        base += "beverages/";

        if (itemNumber == 44) return base + "pepsi.jpg";
        if (itemNumber == 45) return base + "coke.jpg";
        if (itemNumber == 46) return base + "sprite.png";
        if (itemNumber == 47) return base + "miranda.jpg";
    };

    return base + "food/food_default.jpg";
}
