const express = require('express')
const router = express.Router()
const connectDB = require('../db/mongoClient')

router.get('/students/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const { studentCollection } = await connectDB()
    const result = await studentCollection.findOne({ id })
    if (result) {
      const { id, name, student_id, department } = result
      return res.status(200).send({ id, name, department, student_id })
    } else {
      return res
        .status(400)
        .send({ message: 'Cannot find student with the matching Id.' })
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
})

module.exports = router
