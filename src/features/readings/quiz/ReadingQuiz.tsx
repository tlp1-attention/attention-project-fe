import { usePromise } from "@common/hooks/usePromise";
import { useReadings } from "@features/readings/hooks/useReadings";
import { Question } from "@features/readings/quiz/Question";
import { reportResultTable } from "@features/readings/utils/reportResults";
import { useTimer } from "@features/timer/hooks/useTimer";
import { ErrorScreen } from "@features/ui/error-screen/ErrorScreen";
import { Spinner } from "@features/ui/spinner/Spinner";
import { useCallback, useReducer, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export function ReadingQuiz() {
  const { readingId = "" } = useParams();
  const { getQuestionsForReading, updateExerciseCompleted } = useReadings()!;
  const getQuestions = useCallback(() => getQuestionsForReading(readingId), [
    getQuestionsForReading,
    readingId
  ]);
  const { data: questions, loading, error } = usePromise(getQuestions);
  const [right, addRight] = useReducer(right => right + 1, 0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [optionSelected, setOptionSelected] = useState(false);
  const navigate = useNavigate();
  const [seconds] = useTimer(300, async () => {
    if (!questions) return;
    await updateExerciseCompleted(readingId, right > questions.length ?? 0 / 2);

    reportResultTable({
      right: right,
      total: questions.length,
      onRetry: handleRetry,
      onBack: handleBack
    });
  });

  if (loading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <Spinner />
      </div>
    );
  }
  if (error || !questions) return <ErrorScreen error={error as Error} />;
  if (!questions) return <Navigate to="/not-found" />;

  const step = Math.floor(100 / questions?.length);

  const handleBack = () => {
    navigate(`/workspace/readings/${readingId}`);
  };
  const handleRetry = () =>
    window.location.assign(`/workspace/readings/${readingId}/quiz`);

  const handleOptionSelect = async (optionId: number) => {
    setOptionSelected(true);
    if (questionIdx >= questions.length - 1) {
      await updateExerciseCompleted(readingId, right > questions.length / 2);

      reportResultTable({
        right: right,
        total: questions.length,
        onRetry: handleRetry,
        onBack: handleBack
      });
      return;
    }
    const option = questions[questionIdx].response.find(r => r.id == optionId);
    if (!option) return;
    if (option.correct) {
      addRight();
    }
    setTimeout(() => {
      setOptionSelected(false);
      setQuestionIdx(idx => idx + 1);
    }, 500);
  };

  const score = right * step;

  return (
    <>
      <main className="quiz-page-container">
        <Question
          question={questions[questionIdx]}
          onSelect={handleOptionSelect}
          score={score}
          totalQuestions={questions.length}
          currentIndex={questionIdx + 1}
          seconds={seconds}
          isOptionSelected={optionSelected}
        />
        ;
      </main>
    </>
  );
}
