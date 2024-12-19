
const sampleUsers = [
    {
        email: "abc@example.com",
        username: "Senuka",
        password: "password123",
        role: "customer",
        orders: [
            {
                orderID: "ODR#0001",
                customerName: "Senuka Bandara",
                telephoneNumber: "0705532339",
                items: ["B1044", "B1045"]
            }
        ]
    }
]


function getUser(email, password) {
    let allUsers = localStorage.getItem("users");

    return allUsers == null ? undefined : JSON.parse(allUsers).find((u) => u.email === email && u.password === password);
}

function getAllUsers() {
    return JSON.parse(localStorage.getItem("users"));
}

function login() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let user = getUser(email, password);

    if (user == undefined) {
        // No user found
        alert("Invalid email and/or password!");

    } else {
        // User found, redirect to dashboard/collection
        alert("user found");

        setCurrentUser(user.email);

        if (user.role === "customer") {
            redirect("collection");
        } else {
            redirect("dashboard");

        }


    }
}

function promptForUsername(callback) {

    let nameSelector = document.querySelector("#nameSelector");
    let signupSelector = document.querySelector("#signupSelector");
    let usernameSubmitButton = document.querySelector("#usernameSubmitButton");

    signupSelector.classList.add("hidden");
    nameSelector.classList.remove("hidden");
    nameSelector.classList.add("flex");
    nameSelector.classList.add("opacity-100");

    let username = document.getElementById("signupUsername");

    usernameSubmitButton.addEventListener("click", function () {

        if (!username.value) {
            alert("Please enter a username");
            return;
        }

        alert("New User created " + username.value)
        callback(username.value);

    });


}

function signup() {
    let email = document.getElementById("signupEmail").value.toLowerCase();
    let password = document.getElementById("signupPassword").value;
    let confirm_password = document.getElementById("signupConfirmPassword").value;


    if (!email || !password || !confirm_password) {
        alert("Please fill out all fields");
        return;
    }

    if (password !== confirm_password) {

        alert("Passwords do not match");

        return;
    }

    let userExists = getUser(email, password) !== undefined;


    if (userExists) {
        // User exists
        alert("User already exists");

        return;
    } else {
        // Ask for name

        promptForUsername(function (username) {

            let newUser = createUser(email, password, username, "customer");
            setCurrentUser(newUser.email);
            redirect("collection");

        });


    }


}

function createUser(email, password, username, role) {
    let user = {
        email: email,
        password: password,
        username: username,
        role: role,
        orders: []
    };

    let users = JSON.parse(localStorage.getItem("users"));

    if (users === null) {
        users = [user];
    } else {

        users.push(
            user
        );
    }


    console.log("USERS: ", JSON.stringify(users));


    localStorage.setItem("users", JSON.stringify(users));
    return user;

}

function setCurrentUser(user) {
    localStorage.setItem("currentUser", user);
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "../../index.html";
}

function getCurrentUser() {
    let allUsers = JSON.parse(localStorage.getItem("users"));

    return allUsers.find((user) => user.email === localStorage.getItem("currentUser"))
}

function redirect(location) {
    window.location.href = location === "collection" ? "collection.html" :
        location === "dashboard" ? "dashboard/index.html" :
            location === "home" ? "../index.html" : "";
}

function getAllOrders() {
    let allUsers = JSON.parse(localStorage.getItem("users"));

    return allUsers.map((user) => user.orders).flat();

}