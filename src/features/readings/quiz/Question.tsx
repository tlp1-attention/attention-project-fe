import { IQuestion } from "@interfaces/question";
import { QuizOption } from "@features/readings/quiz/QuizOptionProps";
import { formatTime } from "@utils/formatTime";

type QuestionProps = {
  question: IQuestion;
  onSelect: (responseId: number) => void;
  score: number;
  totalQuestions: number;
  currentIndex: number;
  seconds: number;
  isOptionSelected: boolean;
};

export function Question({
  question,
  score,
  totalQuestions,
  currentIndex,
  seconds,
  isOptionSelected,
  onSelect
}: QuestionProps) {
  const responses = question.response;

  return (
    <article>
      <section className="quiz-section">
        <div className="question-container" data-id="<%= readingId %>">
          <p className="question shadow-lg">{question.text}</p>
          <p className="timer border border-1 shadow-lg">
            <i className="bi bi-clock mx-3"></i>
            <span className="reading-timer-text">{formatTime(seconds)}</span>
          </p>
        </div>
        <div className="options">
          {responses.map((response, i) => (
            <QuizOption
              key={response.id}
              optionNumber={i}
              optionText={response.response}
              correct={response.correct}
              onSelect={() => { 
                onSelect(response.id)
              }}
              disabled={isOptionSelected}
            />
          ))}
        </div>
        <div className="score-container">
          <p className="score text-brand border border-3 shadow-sm">
            <i className="bi bi-trophy"></i>
            <span className="score-text">{score}</span>
          </p>
          <p className="w-50 mx-auto question-count text-brand shadow-sm border border-3">
            <span className="question-count-current">{currentIndex}</span>
            <span className="question-count-total">{totalQuestions}</span>
          </p>
        </div>
      </section>
    </article>
  );
}
