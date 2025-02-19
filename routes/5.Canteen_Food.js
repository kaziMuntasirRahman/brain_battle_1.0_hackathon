const express = require('express')
const router = express.Router()
const connectDB = require('../db/mongoClient')

router.post('/canteen/order', async (req, res) => {
  const { student_id, items, order_time } = req.body
  let total_price = 0
  for (let i = 0; i < items.length; i++) {
    total_price = total_price + items[i].price * items[i].quantity
  }
  try {
    const { orderCollection } = await connectDB()
    const order_id = (await orderCollection.countDocuments()) + 1
    const result = await orderCollection.insertOne({ student_id, items, order_time, order_id, total_price })
    if(result.insertedId){
      res.status(200).send({order_id, status: "Order Placed", total_price})
    }else{
      res.status(400).send({message: "Sorry! Couldn't Place Order."})
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
})

module.exports = router
