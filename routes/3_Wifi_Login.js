const express = require('express')
const connectDB = require('../db/mongoClient')
const router = express.Router()

//TODO:1.don't provide _id 2.student id should be unique 3.error validation 4.change full code
//3. wifi login history
router.post('/wifi-login', async (req, res) => {
  const { student_id, timestamp } = req.body
  try {
    const { wifiLoginHistoryCollection } = await connectDB()
    const login_count =
      (await wifiLoginHistoryCollection.countDocuments()) + 1 || 1
    const result = await wifiLoginHistoryCollection.insertOne({
      student_id,
      timestamp,
      login_count
    })
    if (result.insertedId) {
      res
        .send({ message: 'Login recorded', student_id, login_count })
        .status(200)
    } else {
      res.send({ message: "Login couldn't be recorded" }).status(400)
    }
  } catch (err) {
    res.status(500).send({ message: 'Server Error ' + err.message })
  }
})

module.exports = router
