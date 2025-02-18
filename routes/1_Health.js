const express = require('express')
const router = express.Router()

router.get('/health', (_, res) => {
  const currentTimeUTC = new Date().toISOString() // Get current time in UTC format
  res.send({
    message: 'Current server time in UTC',
    serverTime: currentTimeUTC
  }).status(200)
})

module.exports = router