
const users = [
    {
        email: "abc@example.com",
        username: "Senuka",
        password: "password123",
        role: "customer"
    }
]


function getUser(email, password) {
    return localStorage.getItem("users").find((u) => u.email === email && u.password === password);
}

function login() {
    let email = "";
    let password = "";

    let user = getUser(email, password);

    if (user == undefined) {
        // No user found


    } else {
        // User found, redirect to dashboard/collection


    }
}