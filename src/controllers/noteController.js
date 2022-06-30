const note = require("../models/note");
const noteModel = require("../models/note");

const createNote = async (req,res)=>{
    
    const {title,description} = req.body;

    const newNote = new noteModel({
        title: title,
        description: description,
        userId: req.userId
    });

    try{
        await newNote.save();
        res.status(201).json(newNote);
    }catch(error){
        console.log(error)
        res.status(500).json({message: "Something went wrong"});
    }

}

const deleteNote = async (req,res)=>{
    const id = req.params.noteId;
    try{
        const note = await noteModel.findByIdAndDelete(id);
        res.status(202).json(note);
    }catch(error){
        console.log(error)
        res.status(500).json({message: "Something went wrong"});
    }
}

const updateNote = async (req,res)=>{
    const id = req.params.noteId;
    const {title,description} = req.body;

    const updatedNote = {
        title: title,
        description: description,
        userId: req.userId
    }
    try{
        await note.findByIdAndUpdate(id,updatedNote,{new:true});
        res.status(200).json(updatedNote);
    }catch(error){
        console.log(error)
        res.status(500).json({message: "Something went wrong"});
    }
}

const getNotes = async(req,res)=>{
    try{
        const notes = await noteModel.find({userId:req.userId});
        res.status(200).json(notes);
    }catch(error){
        console.log(error)
        res.status(500).json({message: "Something went wrong"});
    }
}

module.exports = {createNote,deleteNote,updateNote,getNotes};