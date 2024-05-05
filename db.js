const mongoose=require('mongoose');

async function connectDB(){
   

    try{
        await  mongoose.connect("mongodb+srv://admin:12345678cluster@cluster0.gvklmyl.mongodb.net/");
        console.log("connected to DB");
    }
    catch(err){
        console.log("error connecting to DB",err);
    }
}
connectDB();


const todoschema=mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
})

const todo=mongoose.model("todo",todoschema);

module.exports={
    todo
}