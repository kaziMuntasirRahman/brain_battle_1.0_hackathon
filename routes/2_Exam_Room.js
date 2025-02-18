const express = require('express')
const router = express.Router()
const connectDB = require('../db/mongoClient')

// TODO: 1.input validation 2.error handling 3.error bounty 4.don't provide _id
// 2. API to get seat allocation based on their student_id
router.get('/exam-room/:student_id', async (req, res) => {
  const student_id = parseInt(req.params.student_id)
  try {
    const { seatCollection } = await connectDB()
    const result = await seatCollection.findOne({ student_id: student_id })
    res.send(result)
  } catch (err) {
    res.send({ message: err.message }).send(400)
  }
})

module.exports = router
