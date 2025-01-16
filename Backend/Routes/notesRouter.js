const express = require("express");
const { noteModel } = require("../Schema/noteSchema");

const notesRouter = express.Router();

notesRouter.post("/create", async(req,res)=>{
     try{
        const notes = new noteModel(req.body);
        await notes.save();
        res.status(200).send({message: "new note has been added"});
     }
     catch(error){
        res.status(400).send({error:error.message})
     }
});


notesRouter.get("/",async(req,res)=>{
    try {
        const notes = await noteModel.find({authorID:req.body.authorID});
        res.status(200).send(notes);
    } catch (error) {
     res.status(400).send({error:error.message});   
    }
})

notesRouter.delete("/delete/:noteId", async(req,res)=>{
    const {noteId} = req.params;
    const note = await noteModel.findOne({_id:noteId})
    const userID = req.body.authorID;
    try {
        if(note.authorID!= userID){
        res.status(200).send({message: "you are not authorized"})
       }
       else{
       await noteModel.findByIdAndDelete({_id:noteId}); 
        res.status(200).send({message: `notes with ${noteId} has been deleted`});
       }
    } catch (error) {
        res.status(400).send({error:error.message});
    }
})

notesRouter.patch("/update/:noteId", async (req,res)=>{
  const {noteId} =req.params;
  const payload = req.body;

  const note = await noteModel.findOne({_id:noteId})
    const userID = req.body.authorID;
  try {  
    if(note.authorID!= userID){
        res.send({message: "you are authorized!!"})
    } 
    else{  
     await noteModel.findByIdAndUpdate({_id:noteId},payload);
     res.status(200).send({message: `notes with ${noteId} has been updated`});
    }
  } catch (error) {
    res.status(400).send({error:error.message});
  }

})


module.exports={
    notesRouter
}