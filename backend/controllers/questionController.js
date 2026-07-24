import Question from "../models/Question.js";

export const getQuestions = async(req,res)=>{

    try{

        const questions=await Question.find();

        res.json({
            success:true,
            questions
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};