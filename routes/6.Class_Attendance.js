const express = require('express')
const router = express.Router()
const connectDB = require('../db/mongoClient')

router.post('/attendance', async (req, res) => {
  const { class_id, date, present_students } = req.body

  try {
    const { attendanceCollection } = await connectDB()
    const isExistenceClassId = await attendanceCollection.findOne({ class_id })
    if (isExistenceClassId) {
      res
        .send({ message: 'Attendance of this class has already been recorded.' })
        .status(400)
      return
    } else {
      const total_present = present_students.length
      const result = await attendanceCollection.insertOne({
        class_id,
        date,
        present_students,
        total_present
      })
      if (result.insertedId) {
        res.send({ message: 'Attendance Recorded!', total_present }).status(200)
      }
    }
  } catch (err) {
    res.send(err.message).status(500)
  }
})

module.exports = router
