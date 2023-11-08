import { ReadingQuiz } from "@features/readings/quiz/ReadingQuiz";
import "@features/readings/ReadingQuiz.css";
import "@features/readings/ReportTable.css";
import { ReadingContextProvider } from "@features/readings/context/ReadingContextProvider";

export function ReadingQuizPage() {
  return (
    <ReadingContextProvider>
      <ReadingQuiz />
    </ReadingContextProvider>
  );
}
