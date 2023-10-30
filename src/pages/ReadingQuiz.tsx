import { ReadingContextProvider } from "@features/readings/context/ReadingContextProvider";
import { Alert } from "@features/ui/alert/Alert";
import "@features/readings/ReadingQuiz.css";
import "@features/readings/ReportTable.css";
import { useReducer, useState, useCallback } from "react";
import { useTimer } from "@features/timer/hooks/useTimer";
import { formatTime } from "@utils/formatTime";
import { usePromise } from "@hooks/usePromise";
import { useReadings } from "@features/readings/hooks/useReadings";
import { useParams } from "react-router-dom";
import { Spinner } from "@features/ui/spinner/Spinner";
import { ErrorScreen } from "@features/ui/error-screen/ErrorScreen";
import { IQuestion } from "@interfaces/question";

function ReadingQuiz() {
  const { readingId = "" } = useParams();
  const { getQuestionsForReading } = useReadings()!;
  const getQuestions = useCallback(() => getQuestionsForReading(readingId), [
    getQuestionsForReading,
    readingId
  ]);
  const { data: questions, loading, error } = usePromise(getQuestions);
  const options = ["Opción 1", "Opción 2", "Opción 3", "Opción 4"];

  if (loading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <Spinner />
      </div>
    );
  }
  if (error) return <ErrorScreen error={error as Error} />;

  console.log("Rerenderizando ReadingQuiz...");
  return (
    <>
      <main className="quiz-page-container">
        <link rel="stylesheet" href="/css/quiz.css" />
        <link rel="stylesheet" href="/css/report.css" />
        <article>
          <section className="quiz-section">
            <div className="question-container" data-id="<%= readingId %>">
              <p className="question shadow-lg">{questions?.[0]?.text}</p>
              <p className="timer border border-1 shadow-lg">
                <i className="bi bi-clock mx-3"></i>
                <span className="reading-timer-text">
                  {/* {formatTime(seconds)} */}
                </span>
              </p>
            </div>
            <div className="options">
              {options.map((option, i) => (
                <QuizOption
                  key={option}
                  optionNumber={i}
                  optionText={option}
                  correct={false}
                  onSelect={() => {}} //rerender()}
                />
              ))}
            </div>
            <div className="score-container">
              <p className="score text-brand border border-3 shadow-sm">
                <i className="bi bi-trophy"></i>
                <span className="score-text">{0}</span>
              </p>
              <p className="w-50 mx-auto question-count text-brand shadow-sm border border-3">
                <span className="question-count-current">{}</span>
                <span className="question-count-total">{}</span>
              </p>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}

type QuizOptionProps = {
  optionNumber: number;
  optionText: string;
  correct: boolean;
  onSelect: (optionIdx: number) => void;
};

function QuizOption({
  optionNumber,
  optionText,
  correct,
  onSelect
}: QuizOptionProps) {
  const [clicked, click] = useReducer(() => true, false);
  const className = correct ? "correct" : "incorrect";

  return (
    <p
      className={`bi option text-brand border border-3 fs-2 shadow-sm ${
        clicked ? className : ""
      }`}
      onClick={() => {
        onSelect(optionNumber);
        click();
      }}
    >
      <span className="mark">{optionNumber}</span>
      <span className="option-text">{optionText}</span>
    </p>
  );
}

function reportResultTable({ show }: { show: boolean }) {
  if (!show) return null;
  return Alert.fire({
    title: <h1>Aquí va el título</h1>,
    html: <ResultTable />,
    confirmButtonText: "Volver a intentar",
    cancelButtonText: "Volver a la lectura",
    showCancelButton: true
  });
}

export function ResultTable() {
  return (
    <table className="report-table border-0 shadow">
      <tbody className="text-start">
        <tr>
          <th className="corner top-left">Preguntas totales</th>
          <th className="total-questions">10</th>
        </tr>
        <tr>
          <th className="">
            <i className="bi bi-check colored-item color-green"></i>
            <span className="d-none d-md-inline mx-1 text-success">
              Correctas
            </span>
          </th>
          <th className="">
            <span className="d-none d-md-inline mx-1 correct-count">
              10<span className="multiplier"></span>
            </span>
          </th>
        </tr>
        <tr>
          <th className="corner top-right">
            <i className="bi bi-x colored-item color-red"></i>
            <span className="d-none d-md-inline mx-1 text-red">
              Incorrectas
            </span>
          </th>
          <th className="">
            <span className="d-none d-md-inline mx-1 incorrect-count">
              10 <span className="multiplier"></span>
            </span>
          </th>
        </tr>
        <tr>
          <th className="corner top-right">
            <i className="bi bi-trophy-fill colored-item color-blue"></i>
            <span className="d-none d-md-inline mx-1 text-blue">Puntaje</span>
          </th>
          <th className="">
            <span className="d-none d-md-inline mx-1 total-score">
              10<span className="multiplier"></span>
            </span>
          </th>
        </tr>
      </tbody>
    </table>
  );
}

export function ReadingQuizPage() {
  return (
    <ReadingContextProvider>
      <ReadingQuiz />
    </ReadingContextProvider>
  );
}
