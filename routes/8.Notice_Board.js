const express = require('express')
const router = express.Router()
const connectDB = require('../db/mongoClient')

router.get('/notices', async (_, res) => {
  try {
    const { noticeCollection } = await connectDB()
    const result = await noticeCollection.find().sort({ date: -1 }).toArray()
    res.send(result)
  } catch (err) {
    res.send(err.message).status(500)
  }
})

module.exports = router