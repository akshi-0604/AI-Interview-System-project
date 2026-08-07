function QuestionCard({ question, index }) {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 mt-6">
      <h2 className="text-xl font-semibold">
        Question {index + 1}
      </h2>

      <p className="text-lg mt-4">
        {question}
      </p>
    </div>
  );
}

export default QuestionCard;