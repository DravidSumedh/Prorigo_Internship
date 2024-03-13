// Function to add a task
function addTask() {
    const taskName = prompt("Enter task name:");
    if (taskName) {
        fetch('/addTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ taskName })
        })
        .then(response => {
            if (response.ok) {
                console.log("Task added successfully");
                showTasks();
            } else {
                throw new Error('Error adding task');
            }
        })
        .catch(error => {
            console.error('Error adding task:', error);
        });
    }
 }
 
 // Function to show tasks
 function showTasks() {
    fetch('/tasks')
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error fetching tasks');
        }
    })
    .then(tasks => {
        const taskListDiv = document.getElementById("taskList");
        let taskListHTML = "<h2>Tasks:</h2><ul>";
        tasks.forEach(task => {
            taskListHTML += `<li>${task.task_name}</li>`;
        });
        taskListHTML += "</ul>";
        taskListDiv.innerHTML = taskListHTML;
    })
    .catch(error => {
        console.error('Error fetching tasks:', error);
    });
 }

 // Function to update a task
 function updateTask() {
    const taskId = prompt("Enter task ID to update:");
    if (taskId) {
        const newTaskName = prompt("Enter new task name:");
        if (newTaskName) {
            fetch(`/updateTask/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ taskName: newTaskName })
            })
            .then(response => {
                if (response.ok) {
                    console.log("Task updated successfully");
                    showTasks();
                } else {
                    throw new Error('Error updating task');
                }
            })
            .catch(error => {
                console.error('Error updating task:', error);
            });
        }
    }
 }

 // Function to delete a task
 function deleteTask() {
    const taskId = prompt("Enter task ID to delete:");
    if (taskId) {
        fetch(`/deleteTask/${taskId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                console.log("Task deleted successfully");
                showTasks();
            } else {
                throw new Error('Error deleting task');
            }
        })
        .catch(error => {
            console.error('Error deleting task:', error);
        });
    }
 }
 // Show tasks initially when the page loads
 showTasks();

 