const mongoose= require("mongoose")
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@      NEVER FORGET DONT EVER USE LOCALHOST INSTEAD USE 127.0.0.1  @@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//connected to the local data base in mongoDB compass
//created a collection having name personaldiary
const mongoURI="mongodb://127.0.0.1:27017/iNotebook"

//strictquery does not allow any info other than what is mention in the schema
//though it has no effect because we use express validator..but without this node gives warning
mongoose.set('strictQuery', true);

//created a function to connect to the mongodb using above url mongouri
const connectToMongo=()=>{
    mongoose.connect(mongoURI, (err) => {
        if(err) 
        {
            console.log(err) 
        }

        else {console.log("mongdb is connected");
       }
     
    })
}

module.exports= connectToMongo