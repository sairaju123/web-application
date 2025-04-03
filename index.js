const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const DATA_FILE = path.join(__dirname, 'tasks.json');

app.use(express.json());
app.use(express.static('public'));

// Load tasks
const loadTasks = () => {
    try {
        return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    } catch (err) {
        return [];
    }
};

// Save tasks
const saveTasks = (tasks) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
};

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(loadTasks());
});

// Add a task
app.post('/tasks', (req, res) => {
    const tasks = loadTasks();
    const newTask = { id: Date.now(), text: req.body.text };
    tasks.push(newTask);
    saveTasks(tasks);
    res.status(201).json(newTask);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
