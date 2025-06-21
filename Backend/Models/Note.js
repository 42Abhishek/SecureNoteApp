
const mongoose = require("mongoose");
const {Schema} = mongoose;

const noteSchema = new Schema({
    userId : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "user",
      required : true,
    },
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    }


},{timestamps:true})
  

const Note = mongoose.model('note', noteSchema);

module.exports = Note;



