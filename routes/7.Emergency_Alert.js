const express = require('express')
const router = express.Router()

// Predefined categories and response teams
const emergencyResponseTeams = {
  Medical: 'Medical Unit',
  Fire: 'Fire Department',
  Security: 'Security Team',
  Technical: 'Technical Support'
}

router.post('/emergency', async (req, res) => {
  const { type, location, details } = req.body

  // Validate input
  if (!type || !location || !details) {
    return res
      .send({ message: 'Missing required fields: type, location, or details' })
      .status(400)
  }

  // Assign response team based on emergency type
  const responseTeam = emergencyResponseTeams[type]

  if (!responseTeam) {
    return res.send({ message: 'Invalid emergency type. Please specify a valid type.' }).status(400)
  }

  res.send({message: 'Emergency alert sent',response_team: responseTeam}).status(200)
})

module.exports = router