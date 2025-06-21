const Note = require('../Models/Note');


const addNote = async (req, res) => {

  try {

    const newTodo =await Note.create({
      userId : req.userId,
      title : req.body.title,
      content : req.body.content
    })

    res.status(201).send({note: newTodo });
 
  } catch (err) {

    res.status(400).send(err);

  }
}

const getNote= async (req,res)=> {
    const  userId = req.userId;
    try{
      const notes = await Note.find({userId : userId});
      res.status(200).send(notes);
    }
    catch(err){
       console.log("error : " + err);
       res.status(400).send(err);
    }
}

const deleteNote = async (req, res) => {
    const userId = req.userId;
    const noteId = req.params.id;

    try {

      const deletedNote =await Note.findOneAndDelete({_id : noteId, userId : userId});
  
      if(!deletedNote){
        res.status(404).json({ message: 'Note not found' });
      }else{
        res.status(200).send("note deleted successfully");
      }

    } catch (err) {
      console.log("error : " + err);
      res.status(500).send(err);
    }
}

const updateNote = async (req, res) => {

    const id = req.params.id;

  try {
    const updatedTodo = await Note.findByIdAndUpdate(id,{
      "title" : req.body.title, 
      "content" : req.body.content
    },{new:true})

    if (!updatedTodo) {
      return res.status(404).send("note not found");
    }else{
      res.status(200).send(updatedTodo);
    }

  } catch (err) {
    console.log("error : " + err);
    res.status(400).send(err);
  }
}


// const toggleComplete = async (req,res)=>{
//     const id = req.params.id;
//     try{
//       const todo = await Note.findById(id);

//       if (!todo) {
//         return res.status(404).send("note not found");
//       }else{
//         todo.completed = !todo.completed;
//         await todo.save();

//         res.status(200).send("completed updated successfully");
//       }

//     }catch(error){
//       console.log("error : " + error);
//       res.status(500).send(error);
//     }
// }


 module.exports = {addNote,getNote,deleteNote,updateNote};