const { MongoClient, ServerApiVersion } = require('mongodb')
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@clustermuntasir.bwzlexy.mongodb.net/?retryWrites=true&w=majority&appName=clusterMuntasir`

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

const connectDB = async () => {
  try {
    // await client.connect()
    const db = client.db('HackathonDB')
    // await client.db('admin').command({ ping: 1 })
    console.log('Pinged your deployment. Successfully connected to MongoDB!')
    return {
      seatCollection: db.collection('seat'),
      wifiLoginHistoryCollection: db.collection('wifi-login-history'),
      bookCollection: db.collection('book'),
      orderCollection: db.collection('order'),
      attendanceCollection: db.collection('attendance'),
      noticeCollection: db.collection('notice'),
      studentCollection: db.collection('student')
    }
  } catch (err) {
    console.log('Failed to connect to MongoDB: ', err)
  }
}

module.exports = connectDB
