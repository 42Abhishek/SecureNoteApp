const express = require('express');
const {addNote,getNote,deleteNote,updateNote}= require('../controller/noteHandle');
const note = express.Router();
const userMiddleware = require("../middleware/userMiddleware");


// POST a create a new note
note.post('/create-note',userMiddleware,addNote);

//GET notes
note.get('/get-notes',userMiddleware,getNote);

// //delete note
note.delete('/delete-note/:id',userMiddleware,deleteNote); 

// //update note
note.put('/update-note/:id',userMiddleware ,updateNote);

module.exports = note;
