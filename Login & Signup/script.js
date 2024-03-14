document.getElementById('loginForm').addEventListener('submit', function (event) {

    event.preventDefault();

    const email = document.getElementById('loginEmail').value;

    const password = document.getElementById('loginPassword').value;

    const captchaInput = document.getElementById('loginCaptchaInput').value;

    const captchaText = document.getElementById('loginCaptchaText').innerText; // Get CAPTCHA text

    // Validate CAPTCHA input

    if (captchaInput.toLowerCase() !== captchaText.toLowerCase()) {

        document.getElementById('loginError').innerText = 'Invalid CAPTCHA';

        return;

    }

    // Proceed with login authentication

});

document.getElementById('signupForm').addEventListener('submit', function (event) {

    event.preventDefault();

    const email = document.getElementById('signupEmail').value;

    const password = document.getElementById('signupPassword').value;

    const captchaInput = document.getElementById('signupCaptchaInput').value;

    const captchaText = document.getElementById('signupCaptchaText').innerText; // Get CAPTCHA text

    // Validate CAPTCHA input

    if (captchaInput.toLowerCase() !== captchaText.toLowerCase()) {

        document.getElementById('signupError').innerText = 'Invalid CAPTCHA';

        return;

    }

    // Proceed with signup

});

// Function to generate random CAPTCHA text

function generateCaptcha(length) {

    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let captcha = '';

    for (let i = 0; i < length; i++) {

        captcha += charset.charAt(Math.floor(Math.random() * charset.length));

    }

    return captcha;

}

// Display CAPTCHA text when the page loads

window.addEventListener('load', function () {

    const loginCaptchaText = generateCaptcha(6); // Generate a 6-character CAPTCHA text for login

    document.getElementById('loginCaptchaText').innerText = loginCaptchaText;

    const signupCaptchaText = generateCaptcha(6); // Generate a 6-character CAPTCHA text for signup

    document.getElementById('signupCaptchaText').innerText = signupCaptchaText;

});

document.addEventListener('DOMContentLoaded', function () {

    // Function to generate random CAPTCHA text

    function generateCaptcha(length) {

        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        let captcha = '';

        for (let i = 0; i < length; i++) {

            captcha += charset.charAt(Math.floor(Math.random() * charset.length));

        }

        return captcha;

    }

    // Display CAPTCHA text when the page loads

    function displayCaptcha() {

        const loginCaptchaText = generateCaptcha(6); // Generate a 6-character CAPTCHA text

        document.getElementById('loginCaptchaText').innerText = loginCaptchaText;

        const signupCaptchaText = generateCaptcha(6); // Generate a 6-character CAPTCHA text

        document.getElementById('signupCaptchaText').innerText = signupCaptchaText;

    }

    displayCaptcha(); // Display CAPTCHA text when the page loads

    // Handle login form submission

    document.getElementById('loginForm').addEventListener('submit', function (event) {

        event.preventDefault();

        const email = document.getElementById('loginEmail').value;

        const password = document.getElementById('loginPassword').value;

        const captchaInput = document.getElementById('loginCaptchaInput').value;

        const captchaText = document.getElementById('loginCaptchaText').innerText;

        // Validate CAPTCHA input

        if (captchaInput.toLowerCase() !== captchaText.toLowerCase()) {

            document.getElementById('loginError').innerText = 'Invalid CAPTCHA';

            return;

        }

        // Send login request to server

        fetch('/login', {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json'

            },

            body: JSON.stringify({

                email: email,

                password: password

            })

        })

            .then(response => {

                if (response.ok) {

                    // Login successful

                    window.location.href = 'final.html'; // Redirect to dashboard page

                } else {

                    // Login failed

                    document.getElementById('loginError').innerText = 'Invalid email or password';

                }

            })

            .catch(error => {

                console.error('Error:', error);

            });

    });

    // Handle sign-up form submission

    document.getElementById('signupForm').addEventListener('submit', function (event) {

        event.preventDefault();

        const email = document.getElementById('signupEmail').value;

        const password = document.getElementById('signupPassword').value;

        const captchaInput = document.getElementById('signupCaptchaInput').value;

        const captchaText = document.getElementById('signupCaptchaText').innerText;

        // Validate CAPTCHA input

        if (captchaInput.toLowerCase() !== captchaText.toLowerCase()) {

            document.getElementById('signupError').innerText = 'Invalid CAPTCHA';

            return;

        }

        // Send sign-up request to server

        fetch('/signup', {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json'

            },

            body: JSON.stringify({

                email: email,

                password: password

            })

        })

            .then(response => {

                if (response.ok) {

                    // Registration successful

                    window.location.href = 'success.html'; // Redirect to dashboard page

                } else {

                    // Registration failed

                    document.getElementById('signupError').innerText = 'Email already registered';

                }

            })

            .catch(error => {

                console.error('Error:', error);

            });

    });

    // Refresh CAPTCHA text

    document.getElementById('refreshCaptcha').addEventListener('click', function () {

        displayCaptcha(); // Generate and display new CAPTCHA text

    });

});