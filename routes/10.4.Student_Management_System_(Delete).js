const express = require('express');
const router = express.Router()
const connectDB = require('../db/mongoClient')

router.delete('/students/:id', async (req, res)=>{
  const id = parseInt(req.params.id);
  try{
    const {studentCollection} = await connectDB()
    const result = await studentCollection.deleteOne({id})
    if(result.deletedCount>0){
      res.status(200).send({message: "The Student info has been removed.!"})
    }else{
      console.log(result)
      res.status(400).send({message: "Student data with user id is not available."})
    }
  }catch(err){
    res.send(err.message).send(500)
  }
})

module.exports = router