import { ReadingListItem } from "@features/readings/ReadingListItem";
import { useReadings } from "@features/readings/hooks/useReadings";
import { ErrorScreen } from "@features/ui/error-screen/ErrorScreen";
import { Spinner } from "@features/ui/spinner/Spinner";

export function ReadingList() {
  const { readings } = useReadings()!;

  if (readings.loading)
    return (
      <div className="h-100">
        <Spinner />
      </div>
    );
  if (readings.error)
    return <ErrorScreen error={readings.error as Error} />;

  return readings.data.map(reading => (
    <ReadingListItem reading={reading} key={reading.id} />
  ));
}
