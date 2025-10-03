# Todo Backend API

A simple todo application backend built with Express.js that provides RESTful API endpoints for managing todos.

## Features

- Create, read, update, and delete todos
- In-memory storage (data persists only during server runtime)
- RESTful API design
- Input validation and error handling
- CORS enabled for frontend integration

## Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Server

### Development mode (with auto-restart):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on port 3000 by default (or the PORT specified in your .env file).

## API Endpoints

### Base URL: `http://localhost:3000`

### Health Check
- **GET** `/health`
  - Returns server status

### Todos

#### Get All Todos
- **GET** `/todos`
  - Returns all todos
  - Response: `{ success: true, data: [...todos], count: number }`

#### Get Single Todo
- **GET** `/todos/:id`
  - Returns a specific todo by ID
  - Response: `{ success: true, data: {...todo} }`

#### Create Todo
- **POST** `/todos`
  - Creates a new todo
  - Body: `{ title: string, description?: string }`
  - Response: `{ success: true, data: {...newTodo}, message: string }`

#### Update Todo
- **PUT** `/todos/:id`
  - Updates an existing todo
  - Body: `{ title?: string, description?: string, completed?: boolean }`
  - Response: `{ success: true, data: {...updatedTodo}, message: string }`

#### Delete Todo
- **DELETE** `/todos/:id`
  - Deletes a todo
  - Response: `{ success: true, data: {...deletedTodo}, message: string }`

## Todo Object Structure

```json
{
  "id": 1,
  "title": "Sample Todo",
  "description": "This is a sample todo item",
  "completed": false,
  "createdAt": "2023-10-03T12:00:00.000Z",
  "updatedAt": "2023-10-03T12:00:00.000Z"
}
```

## Example Usage

### Create a new todo:
```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk, bread, eggs"}'
```

### Get all todos:
```bash
curl http://localhost:3000/todos
```

### Update a todo:
```bash
curl -X PUT http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

### Delete a todo:
```bash
curl -X DELETE http://localhost:3000/todos/1
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `404`: Not Found
- `500`: Internal Server Error