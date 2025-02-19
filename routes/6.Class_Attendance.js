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
      .status(400)
        .send({ message: 'Attendance of this class has already been recorded.' })
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
        res.status(200).send({ message: 'Attendance Recorded!', total_present })
      }
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
})

module.exports = router
