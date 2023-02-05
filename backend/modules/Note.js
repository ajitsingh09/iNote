const mongoose=require("mongoose")
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,//this will work as a foreign key and it is used to connect two different databases
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"General",
    },
    Date:{
        type:Date,
        default:Date.now
    }

  });
  module.exports = mongoose.model("Notes",NotesSchema)