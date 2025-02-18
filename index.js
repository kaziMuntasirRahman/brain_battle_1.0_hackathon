const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./db/mongoClient')

const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

app.get('/', (_, res) => {
  res.send('Hello from the server side...')
})

// check if mongodb establishment is successful
connectDB()

// Import Routes
const healthRoutes = require('./routes/1_Health')
const examRollRoutes = require('./routes/2_Exam_Room')
const wifiLoginRoutes = require('./routes/3_Wifi_Login')
const libraryBooks = require('./routes/4.1_Library_Book')
const canteenFood = require('./routes/5.Canteen_Food')
const attendance = require('./routes/6.Class_Attendance')
const emergencyAlert = require('./routes/7.Emergency_Alert')
const noticeBoard = require('./routes/8.Notice_Board')
const createStudentInfo = require('./routes/10.1.Student_Management_System_(Create)')
const readStudentInfo = require('./routes/10.2.Student_Management_System_(Read)')
const updateStudentInfo = require('./routes/10.3.Student_Management_System_(Update)')
const deleteStudentInfo = require('./routes/10.4.Student_Management_System_(Delete)')

// use those routes
app.use('/api', healthRoutes)
app.use('/api', examRollRoutes)
app.use('/api', wifiLoginRoutes)
app.use('/api', libraryBooks)
app.use('/api', canteenFood)
app.use('/api', attendance)
app.use('/api', emergencyAlert)
app.use('/api', noticeBoard)
app.use('/api', createStudentInfo)
app.use('/api', readStudentInfo)
app.use('/api', updateStudentInfo)
app.use('/api', deleteStudentInfo)

app.listen(port, () => {
  console.log(`This server is running in the port no: ${port}`)
})
