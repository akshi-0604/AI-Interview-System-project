import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
{
    question:{
        type:String,
        required:true
    },

    category:{
        type:String,
        default:"General"
    }
},
{
    timestamps:true
});

export default mongoose.model("Question",questionSchema);