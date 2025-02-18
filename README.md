### Project README: Setup Guide

---

# Brain Battle 1.0 Hackathon

This project is a collection of 10 different APIs created as part of the **Brain Battle 1.0 Hackathon** contest. Each API addresses a specific problem statement, implementing various functionalities, such as managing student information, emergency alerts, notice boards, and more.

---

## API Features

1. **Student Management API**
   - **Add a student** (`POST /students`): Add a new student's information (name, student_id, department).
   - **Update student info** (`PATCH /students/:id`): Update student details using their ID.
   - **Get all students** (`GET /students`): Retrieve a list of all students.
   - **Get a student** (`GET /students/:id`): Fetch details of a specific student by ID.
   - **Delete a student** (`DELETE /students/:id`): Remove a student from the database.

2. **Emergency Alert API**
   - **Create an emergency alert** (`POST /api/emergency`): Send an emergency alert (e.g., medical, fire) with location details and assign a response team based on the emergency type.

3. **Notice Board API**
   - **Get all notices** (`GET /api/notices`): Retrieve the latest college notices, sorted by date.

---

## Setup Guide

### 1. Prerequisites

- **Node.js** (v14 or later)
- **MongoDB** (MongoDB Atlas or local MongoDB instance)
- **Git**

### 2. Clone the repository

```bash
git clone https://github.com/kaziMuntasirRahman/brain_battle_1.0_hackathon
cd brain_battle_1.0_hackathon
```

### 3. Install dependencies

Make sure you have `npm` installed. Run the following command to install all necessary packages:

```bash
npm install
```

### 4. Setup environment variables

Create a `.env` file in the root directory with your MongoDB credentials:

```
DB_USER=yourMongoDBUsername
DB_PASS=yourMongoDBPassword
PORT=5000
```

### 5. MongoDB Collections

In `db/mongoClient.js`, ensure that the appropriate MongoDB collections are defined for each API, such as:

```js
const connectDB = async () => {
  await client.connect();
  const db = client.db('yourDatabaseName');
  return {
    studentCollection: db.collection('students'),
    noticeCollection: db.collection('notices')
  };
};
```

### 6. Start the server

Run the following command to start the server:

```bash
npm start
```

The server will run at `http://localhost:5000`.

### 7. Testing the APIs

You can use tools like [Postman](https://www.postman.com/) or [cURL](https://curl.se/) to test the various APIs.

#### **Example Requests**

- **Add a student**
  ```http
  POST /students
  Content-Type: application/json
  {
    "name": "John Doe",
    "student_id": "12345",
    "department": "Computer Science"
  }
  ```

- **Update student info**
  ```http
  PATCH /students/12345?name=Jane%20Doe&department=Mathematics
  ```

- **Emergency alert**
  ```http
  POST /api/emergency
  Content-Type: application/json
  {
    "type": "Medical",
    "location": "Building A, Room 101",
    "details": "Student fainted during exam."
  }
  ```

- **Get all notices**
  ```http
  GET /api/notices
  ```

---

## Folder Structure

```bash
.
├── db/
│   └── mongoClient.js  # MongoDB connection setup
├── routes/
│   └── students.js     # Student Management routes
│   └── emergency.js    # Emergency Alert routes
│   └── notices.js      # Notice Board routes
├── .env                # Environment variables
├── app.js              # Express server setup and middleware
├── package.json        # Dependencies and scripts
└── README.md           # Setup guide and documentation
```

---

## Notes

- Ensure that MongoDB is running or connected via MongoDB Atlas before starting the server.
- You can customize the database and collection names in the `mongoClient.js` file.

---

GitHub Repository: [https://github.com/kaziMuntasirRahman/brain_battle_1.0_hackathon](https://github.com/kaziMuntasirRahman/brain_battle_1.0_hackathon)  
Live Server: [https://brainbattle10hackathonreal.vercel.app](https://brainbattle10hackathonreal.vercel.app)