### Project README: Setup Guide

---

# Student Management API

This is a simple Node.js and Express-based API that allows users to manage student information. It supports CRUD operations such as adding, updating, retrieving, and deleting student data stored in a MongoDB database.

---

## Features

- **Add a student** (`POST /students`): Add new student data (name, student_id, department).
- **Update student info** (`PATCH /students/:id`): Modify the existing student data using the student ID.
- **Get all students** (`GET /students`): Retrieve the list of all students.
- **Get a specific student** (`GET /students/:id`): Retrieve details of a student by ID.
- **Delete a student** (`DELETE /students/:id`): Remove a student from the database using their ID.

---

## Setup Guide

### 1. Prerequisites

- Node.js (v14 or later)
- MongoDB (MongoDB Atlas or local MongoDB instance)
- Git

### 2. Clone the repository

```bash
git clone https://github.com/your-username/student-management-api.git
cd student-management-api
```

### 3. Install dependencies

Make sure you have `npm` or `yarn` installed. Run the following command to install the necessary dependencies:

```bash
npm install
```

### 4. Setup environment variables

Create a `.env` file in the root directory and configure the following environment variables for your MongoDB connection:

```
DB_USER=yourMongoDBUsername
DB_PASS=yourMongoDBPassword
PORT=5000
```

For MongoDB Atlas, the connection string should look like this:

```
MONGODB_URI=mongodb+srv://<DB_USER>:<DB_PASS>@your-cluster.mongodb.net/?retryWrites=true&w=majority
```

### 5. Configure MongoDB Collections

In `db/mongoClient.js`, ensure you have defined the necessary collections such as:

```js
const connectDB = async () => {
  await client.connect();
  const db = client.db('yourDatabaseName');
  return {
    studentCollection: db.collection('students')
  };
};
```

### 6. Start the server

Run the following command to start the server:

```bash
npm start
```

The API will be running at `http://localhost:5000`.

### 7. Testing the API

You can use tools like [Postman](https://www.postman.com/) or [cURL](https://curl.se/) to test the API. Below are some example requests.

#### Add a student

```http
POST /students
Content-Type: application/json
{
  "name": "John Doe",
  "student_id": "12345",
  "department": "Computer Science"
}
```

#### Update student info

```http
PATCH /students/12345?name=Jane%20Doe&department=Mathematics
```

#### Get all students

```http
GET /students
```

#### Delete a student

```http
DELETE /students/12345
```

---

### 8. Folder Structure

```bash
.
├── db/
│   └── mongoClient.js  # MongoDB connection and collections
├── routes/
│   └── students.js     # Student-related API routes
├── .env                # Environment configuration
├── app.js              # Express setup and middleware
├── package.json        # Project dependencies
└── README.md           # Setup guide and documentation
```

---

## Notes

- Ensure that MongoDB is running or connected via Atlas before starting the server.
- You can modify the MongoDB database name and collection names in the `mongoClient.js` file.

---
