const express = require('express')
const router = express.Router()
const connectDB = require('../db/mongoClient')

router.get('/library/book/:isbn', async (req, res) => {
  const isbn = req.params.isbn
  // isbn validation
  if (!/^\d+$/.test(isbn)) {
    return res.status(400).send({
      message: 'Invalid isbn no. It should be a valid numeric string.'
    })
  }

  try {
    const { bookCollection } = await connectDB()
    const result = await bookCollection.findOne({ isbn })
    if (result) {
      const {isbn, title, available, copies_left} = result;
      if (result.copies_left > 0) {
        res.status(200)
        .send({isbn, title, available, copies_left})
      } else {
        res.status(200).send(
          {isbn, title, available, copies_left,
          message: 'Sorry! The book is not available right now.'
        })
      }
    } else {
      res.send({ message: 'No book found' }).status(404)
    }
  } catch (err) {
    res.send(err.message).status(500)
  }
})

module.exports = router

// available book list on database
// [
//   {
//       "isbn": "9780131103627"
//   },
//   {
//       "isbn": "9780132350884"
//   },
//   {
//       "isbn": "9780201616224"
//   },
//   {
//       "isbn": "9780134757599"
//   },
//   {
//       "isbn": "9780134444337"
//   },
//   {
//       "isbn": "9780134685991"
//   },
//   {
//       "isbn": "9780135166307"
//   },
//   {
//       "isbn": "9780262033848"
//   },
//   {
//       "isbn": "9780132911111"
//   },
//   {
//       "isbn": "9780321534460"
//   }
// ]
