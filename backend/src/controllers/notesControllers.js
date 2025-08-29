import Note from "../models/Note.js";
export async function getAllNotes(req,res){
    try {
       const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.error("Get All Notes Controller ",error);
        res.status(500).json({message:"Internal Sevrer Error "});
        // Catch should never be empty as it can share a error 
    }
}
export async function createNote(req,res){
    try {
        const {title,content}=req.body
        const note=new Note({title,content})

        const savedNote=await note.save();
        res.status(201).json(savedNote," :Note Created Successfully");
    } catch (error) {

        console.error("Error in createNote Controller ",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}
export async function updateNotes(req,res){
    try {
        const {title,content}=req.body;
        const updatedNote =await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true});
        if(!updatedNote){
            return res.status(404).json({message:"Note not found "});
        }  
        res.status(200).json({message:"Note Updated Successfully"});
    } catch (error) {
        console.error("Error in updateNote Controller ",error);
        res.status(500).json({message:"Internal Server Error"});    
    }
            
}
export async function deleteNotes(req,res){
     try {
        const {title,content}=req.body;
        const deletedNote =await Note.findByIdAndDelete(req.params.id,{title,content},{new:true});
        if(!deletedNote){
            return res.status(404).json({message:"Note not found "});
        }  
        res.status(200).json({message:"Note Deleted Successfully"});
    } catch (error) {
        console.error("Error in deleteNote Controller ",error);
        res.status(500).json({message:"Internal Server Error"});    
    }
}
export async function getNoteById(req,res) {
    try {
        const note=await Note.findById(req.params.id);
       if(!note){return res.status(404).json({message:"Note not found!"})}
       res.json(note);
    } catch (error) {
        console.error("Error Find By Id Notes Controller ",error);
        res.status(500).json({message:"Internal Sevrer Error "});
        // Catch should never be empty as it can share a error 
    }
    
}