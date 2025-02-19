const express = require('express')
const connectDB = require('../db/mongoClient')
const router = express.Router()

//TODO: _id 2.student id should be unique 3.error validation 4.change full code
//3. wifi login history
router.post('/wifi-login', async (req, res) => {
  const { student_id, timestamp } = req.body

  try {
    // Check if timestamp is provided and is a string
    if (!timestamp || typeof timestamp !== 'string') {
      return res.status(400).send({ message: 'Invalid or missing timestamp' })
    }

    // Regular expression to validate UTC format (ISO 8601 with 'Z' at the end)
    const utcRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/

    // Check if timestamp matches the UTC format
    if (!utcRegex.test(timestamp)) {
      return res.status(400).send({ message: 'Timestamp is not in UTC format' })
    }

    // Further validation to check if the date is valid
    const date = new Date(timestamp)
    if (isNaN(date.getTime())) {
      return res.status(400).send({ message: 'Invalid timestamp' })
    }
    
    const { wifiLoginHistoryCollection } = await connectDB()
    let login_count = await wifiLoginHistoryCollection
      .find({ student_id })
      .toArray()
    // increase login_count by 1
    login_count = login_count.length + 1

    const result = await wifiLoginHistoryCollection.insertOne({
      student_id,
      timestamp,
      login_count
    })
    if (result.insertedId) {
      res
        .status(200)
        .send({ message: 'Login recorded', student_id, login_count })
    } else {
      res.status(400).send({ message: "Login couldn't be recorded" })
    }
  } catch (err) {
    res.status(500).send({ message: 'Server Error ' + err.message })
  }
})

module.exports = router
