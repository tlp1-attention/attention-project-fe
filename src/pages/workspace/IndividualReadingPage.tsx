import { ReadingContextProvider } from "@features/readings/context/ReadingContextProvider";
import { IndividualReading } from "../../features/readings/IndividualReading";

export function ReadingPage() {
  return (
    <ReadingContextProvider>
      <IndividualReading />
    </ReadingContextProvider>
  );
}
