let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");

signup.addEventListener("click", () => {
    slider.classList.add("moveslider");
    formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
    slider.classList.remove("moveslider");
    formSection.classList.remove("form-section-move");
});

document.addEventListener("DOMContentLoaded", function () {
    let signupButton = document.querySelector(".signup");
    let loginButton = document.querySelector(".login");
    
    signup.addEventListener("click", function () {
        validateSignupForm();
    });
    login.addEventListener("click", function () {
        validateLoginForm();
    });

    function validateSignupForm() {
        let name = document.querySelector.value;
        let email = document.querySelector.value;
        let password = document.querySelector.value;
        let confirmPassword = document.querySelector.value;
        if (name == "" || email == "" || password == "" || confirmPassword == "") {
            alert("Please fill in all fields for signup.");
        } else if (password !== confirmPassword) {
            alert("Passwords do not match.");
        } else {
            
            console.log("Signup data:", { name, email, password });
        }
    }

    function validateLoginForm() {
        let loginEmail = document.querySelector.value;
        let loginPassword = document.querySelector.value;
        if (loginEmail == "" || loginPassword == "") {
            alert("Please fill in all fields for login.");
        } else {
            
            console.log("Login data:", { email: loginEmail, password: loginPassword });
        }
    }
 });
