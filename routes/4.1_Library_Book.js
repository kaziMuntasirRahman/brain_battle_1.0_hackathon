const express = require('express')
const router = express.Router()
const connectDB = require('../db/mongoClient')

router.get('/library/book/:isbn', async (req, res) => {
  const isbn = req.params.isbn
  try {
    const { bookCollection } = await connectDB()
    const result = await bookCollection.findOne({ isbn })
    if (result) {
      res.send(result).status(200)
    } else {
      res.send({ message: 'No book found' }).status(404)
    }
  } catch (err) {
    res.send(err.message).status(500)
  }
})

module.exports = router
