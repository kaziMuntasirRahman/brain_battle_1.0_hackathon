const express = require('express')
const router = express.Router()
const connectDB = require('../db/mongoClient')

// TODO: 1.input validation 2.error handling 3.error bounty 4.don't provide _id
// 2. API to get seat allocation based on their student_id
router.get('/exam-room/:student_id', async (req, res) => {
  const id = req.params.student_id
  if (!/^\d+$/.test(id)) {
    return res.status(400).send({
      message: 'Invalid student_id. It should be a valid numeric string.'
    })
  } else if (parseInt(id) <= 0) {
    return res
      .status(400)
      .send({ message: 'Invalid student_id. It should be a positive number.' })
  }
  try {
    const { seatCollection } = await connectDB()
    const result = await seatCollection.findOne({ student_id: parseInt(id) })
    if (result) {
      const { student_id, exam_room, seat_number } = result
      return res.status(200).send({ student_id, exam_room, seat_number })
    } else {
      return res
        .status(400)
        .send({ message: "Student with the id no " + id + " couldn't be found. Please give student id ranging from 220001 to 220050." })
    }
  } catch (err) {
    res.send({ message: err.message }).send(400)
  }
})

module.exports = router
