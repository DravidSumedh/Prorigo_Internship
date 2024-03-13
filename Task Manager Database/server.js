const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

const port = process.env.PORT || 3000;



// Create a MySQL connection pool
const pool = mysql.createPool({
 
 host: 'localhost',
 user: 'root',
 password: 'password',
 database: 'tmanager',
 authPlugins:{
    mysql_clear_password:() => () => Buffer.from('password','utf8'),
 },
});

// Insert data into the database
function insertData(data) {
    const sql = 'INSERT INTO tasks SET ?';
    pool.query(sql, data, (error, results) => {
      if (error) {
        console.error('Error inserting data:', error);
        return;
      }
      console.log('Data inserted successfully');
    });
   }
   
   // Fetch data from the database
   function fetchData() {
    const sql = 'SELECT * FROM tasks';
    pool.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        return;
      }
      console.log('Fetched data:', results);
    });
   }
   
   
   const newData = { id: '1', task_name: 'drink water' };
   insertData(newData);
   fetchData();


app.use(bodyParser.json());

// Route to add a task
app.post('/addTask', (req, res) => {
   const { taskName } = req.body;
   if (!taskName) {
       return res.status(400).json({ error: 'Task name is required' });
   }
   // Query to insert task into database
   pool.query('INSERT INTO tasks (task_name) VALUES (?)', [taskName], (error, results) => {
       if (error) {
           console.error('Error adding task:', error);
           return res.status(500).json({ error: 'An error occurred while adding the task' });
       }
       res.status(201).json({ message: 'Task added successfully' });
   });
});

// Route to get all tasks
app.get('/tasks', (req, res) => {
   // Query to fetch all tasks from database
   pool.query('SELECT * FROM tasks', (error, results) => {
       if (error) {
           console.error('Error fetching tasks:', error);
           return res.status(500).json({ error: 'An error occurred while fetching tasks' });
       }
       res.status(200).json(results);
   });
});

// Route to update a task
app.put('/updateTask/:id', (req, res) => {
   const { id } = req.params;
   const { taskName } = req.body;
   if (!taskName) {
       return res.status(400).json({ error: 'Task name is required' });
   }
   // Query to update task in database
   pool.query('UPDATE tasks SET task_name = ? WHERE id = ?', [taskName, id], (error, results) => {
       if (error) {
           console.error('Error updating task:', error);
           return res.status(500).json({ error: 'An error occurred while updating the task' });
       }
       res.status(200).json({ message: 'Task updated successfully' });
   });
});

// Route to delete a task
app.delete('/deleteTask/:id', (req, res) => {
   const { id } = req.params;

   // Query to delete task from database
   pool.query('DELETE FROM tasks WHERE id = ?', [id], (error, results) => {
       if (error) {
           console.error('Error deleting task:', error);
           return res.status(500).json({ error: 'An error occurred while deleting the task' });
       }
       res.status(200).json({ message: 'Task deleted successfully' });
   });
});



app.get('/', (req, res) => {
    res.sendFile(path.join('D:/' ,'Task Manager_DB', 'index.html'));
});

app.use(express.static(path.join('D:/', 'Task Manager_DB')));

/*// Set correct MIME type for CSS files
app.get('*.css', (req, res, next) => {
    res.setHeader('style.css', 'text/css');
    next();
   });
   // Set correct MIME type for JavaScript files
   app.get('*.js', (req, res, next) => {
    res.setHeader('script.js', 'text/javascript');
    next();
   });
*/
// Start the server
app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});