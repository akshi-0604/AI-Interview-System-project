import { generateNextQuestion } from "../utils/generateNextQuestion.js";

export const followupQuestion = async (req, res) => {

    try {

        const {
            previousQuestion,
            answer,
        } = req.body;

        const question =
            await generateNextQuestion(
                previousQuestion,
                answer
            );

        res.json({
            success: true,
            question,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};