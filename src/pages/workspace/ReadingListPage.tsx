import { ReadingListItem } from "@features/readings/ReadingListItem";
import "@features/readings/Reading.css";
import "@features/readings/ReadingList.css";
import { useReadings } from "@features/readings/hooks/useReadings";
import { ReadingContextProvider } from "@features/readings/context/ReadingContextProvider";
import { ErrorScreen } from "@features/ui/error-screen/ErrorScreen";
import { Spinner } from "@features/ui/spinner/Spinner";


export function ReadingListPage() {
  return (
    <ReadingContextProvider>
      <main className="py-3">
        <h1 className="display-3 fw-semibold text-brand text-start">
          Lista de textos
        </h1>
        <article className="m-3" id="reading-container">
          <ReadingList />
        </article>
      </main>
    </ReadingContextProvider>
  );
}

export function ReadingList() {
  const { readings } = useReadings()!;
  console.log(readings);

  if (readings.loading) return <Spinner />;
  if (readings.error || !readings.data) return <ErrorScreen error={readings.error as Error} />;

  return readings.data.map(reading => (
    <ReadingListItem reading={reading} key={reading.id} />
  ));
}
