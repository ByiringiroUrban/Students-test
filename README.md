# Student API (Node.js + MongoDB)

## Setup
1. Install dependencies:
   npm install

2. Run MongoDB locally

3. Start server:
   npm start

4. Open Swagger UI:
   http://localhost:5000/api-docs

## API Endpoints
- POST /students
- GET /students
- GET /students/:id
- PUT /students/:id
- DELETE /students/:id

## Postman Examples

Assuming the server is running on `http://localhost:5000`, here are examples to test the endpoints using Postman:

### 1. Create a Student (POST)
- **Method:** POST
- **URL:** `http://localhost:5000/students`
- **Headers:**
  - Content-Type: application/json
- **Body (raw JSON):**
  ```json
  {
    "name": "urban",
    "age": 22,
    "course": "Computer Science"
  }
  ```

- **Response example:**
  ```json
  {
    "_id": "69d5ef937c7d864bc8b770a4",
    "name": "urban",
    "age": 22,
    "course": "Computer Science",
    "__v": 0
  }
  ```

> MongoDB creates the `_id` field automatically when the student is saved. Use this `_id` value in the URL for `GET /students/{id}`, `PUT /students/{id}`, and `DELETE /students/{id}`.

### 2. Get All Students (GET)
- **Method:** GET
- **URL:** `http://localhost:5000/students`

### 3. Get a Specific Student (GET)
- **Method:** GET
- **URL:** `http://localhost:5000/students/{id}`
  - Replace `{id}` with the actual student ID (e.g., from the response of creating a student)

### 4. Update a Student (PUT)
- **Method:** PUT
- **URL:** `http://localhost:5000/students/{id}`
  - Replace `{id}` with the actual student ID
- **Headers:**
  - Content-Type: application/json
- **Body (raw JSON):**
  ```json
  {
    "name": "Jane Doe",
    "age": 21,
    "course": "Mathematics"
  }
  ```

### 5. Delete a Student (DELETE)
- **Method:** DELETE
- **URL:** `http://localhost:5000/students/{id}`
  - Replace `{id}` with the actual student ID
