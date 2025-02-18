const express = require('express');
const router = express.Router();
const connectDB = require('../db/mongoClient');

router.patch('/students/:id', async (req, res) => {
  const id = req.params.id; // Get student id from the request parameters
  const name = req.query?.name;
  const department = req.query?.department;

  try {
    const { studentCollection } = await connectDB();
    const filter = { id: parseInt(id) }; // Convert id to number and use it as filter
    const options = { upsert: true }; // Upsert option to insert if not found
    const updateData = { $set: { name, department } };

    const result = await studentCollection.updateOne(filter, updateData, options);

    if (result.modifiedCount > 0) {
      res.status(200).send({ message: "Student info has been modified." });
    } else {
      res.status(400).send({ message: "Student info couldn't be updated." });
    }
  } catch (err) {
    res.status(500).send(err.message); // Use status(500) for internal server errors
  }
});

module.exports = router;
