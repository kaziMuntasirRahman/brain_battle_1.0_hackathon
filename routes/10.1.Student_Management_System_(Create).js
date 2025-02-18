const express = require('express');
const router = express.Router()
const connectDB = require('../db/mongoClient')

router.post('/students', async (req, res)=>{
  const {name, student_id, department} = req.body;
  try{
    const {studentCollection} = await connectDB()
    const id = await studentCollection.countDocuments() + 1;
    const result = await studentCollection.insertOne({id,name, student_id, department})
    if(result.insertedId){
      return res.status(200).send({id, name, student_id, department, status: "Created"})
    }else{
      return res.status(404).send({message: "Sorry! Student info couldn't be uploaded now. Please try again later."})
    }
  }catch(err){
    res.send(500).send(err.message)
  }
})

module.exports = router