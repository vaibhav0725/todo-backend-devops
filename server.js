require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for todos
let todos = [
  {
    id: 1,
    title: "Sample Todo",
    description: "This is a sample todo item",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
let nextId = 2;

// Helper function to find todo by id
const findTodoById = (id) => {
  return todos.find(todo => todo.id === parseInt(id));
};

// Routes

// GET /todos - Get all todos
app.get('/todos', (req, res) => {
  res.json({
    success: true,
    data: todos,
    count: todos.length
  });
});

// GET /todos/:id - Get a specific todo
app.get('/todos/:id', (req, res) => {
  const todo = findTodoById(req.params.id);
  
  if (!todo) {
    return res.status(404).json({
      success: false,
      message: 'Todo not found'
    });
  }
  
  res.json({
    success: true,
    data: todo
  });
});

// POST /todos - Create a new todo
app.post('/todos', (req, res) => {
  const { title, description } = req.body;
  
  // Validation
  if (!title || title.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Title is required'
    });
  }
  
  const newTodo = {
    id: nextId++,
    title: title.trim(),
    description: description ? description.trim() : '',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  todos.push(newTodo);
  
  res.status(201).json({
    success: true,
    data: newTodo,
    message: 'Todo created successfully'
  });
});

// PUT /todos/:id - Update a todo
app.put('/todos/:id', (req, res) => {
  const todo = findTodoById(req.params.id);
  
  if (!todo) {
    return res.status(404).json({
      success: false,
      message: 'Todo not found'
    });
  }
  
  const { title, description, completed } = req.body;
  
  // Validation
  if (title !== undefined && (!title || title.trim() === '')) {
    return res.status(400).json({
      success: false,
      message: 'Title cannot be empty'
    });
  }
  
  // Update fields
  if (title !== undefined) todo.title = title.trim();
  if (description !== undefined) todo.description = description.trim();
  if (completed !== undefined) todo.completed = Boolean(completed);
  todo.updatedAt = new Date().toISOString();
  
  res.json({
    success: true,
    data: todo,
    message: 'Todo updated successfully'
  });
});

// DELETE /todos/:id - Delete a todo
app.delete('/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex(todo => todo.id === parseInt(req.params.id));
  
  if (todoIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Todo not found'
    });
  }
  
  const deletedTodo = todos.splice(todoIndex, 1)[0];
  
  res.json({
    success: true,
    data: deletedTodo,
    message: 'Todo deleted successfully'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Endpoint not found'
//   });
// });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Todos API: http://localhost:${PORT}/todos`);
});

module.exports = app;