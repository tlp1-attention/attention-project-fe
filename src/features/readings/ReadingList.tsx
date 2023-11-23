import { Await } from "@common/components/Await";
import { ReadingListItem } from "@features/readings/ReadingListItem";
import { useReadings } from "@features/readings/hooks/useReadings";

export function ReadingList() {
  const { readings } = useReadings()!;

  return (
    <Await value={readings}>
      {data =>
        data.map(reading => (
          <ReadingListItem key={reading.id} reading={reading} />
        ))
      }
    </Await>
  );
}
