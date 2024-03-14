const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 4000;

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'login_signup'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JavaScript)
const staticPath = path.join('D:/', 'Login & Signup');
app.use(express.static(staticPath));

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});

// Handle login form submission
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // Query database to check if the user exists and credentials are correct
    db.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password], (err, results) => {
        if (err) {
            throw err;
        }
        if (results.length > 0) {
            // User found, login successful
            res.sendStatus(200); // Send success status code
        } else {
            // User not found or credentials are incorrect
            res.sendStatus(401); // Send unauthorized status code
        }
    });
});

// Handle sign-up form submission
app.post('/signup', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // Check if the email is already registered
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            throw err;
        }
        if (results.length > 0) {
            // Email already exists
            res.sendStatus(409).send('Data Already Registered...'); // Send conflict status code
        } else {
            // Email does not exist, insert new user into database
            db.query('INSERT INTO user (email, password) VALUES (?, ?)', [email, password], (err, results) => {
                if (err) {
                    throw err;
                }
                // User successfully registered
                res.sendStatus(201); // Send created status code
            });
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});