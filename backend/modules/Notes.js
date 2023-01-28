const mongoose=require("mongoose")

const NotesSchema = new Schema({
    title:{
        type:string,
        required:true
    },
    discription:{
        type:string,
        required:true
    },
    tag:{
        type:string,
        default:"General",
    },
    Date:{
        type:Date,
        default:Date.now
    }

  });
  module.exports = mongoose.model("Notes",NotesSchema)