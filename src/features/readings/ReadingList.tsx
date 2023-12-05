import { Await } from "@common/components/Await";
import { ReadingListItem } from "@features/readings/ReadingListItem";
import { useReadings } from "@features/readings/hooks/useReadings";
import { FullSizeSpinner } from "@features/ui/spinner/Spinner";

export function ReadingList() {
  const { readings } = useReadings()!;

  return (
    <Await value={readings} loading={
      <div className="min-vh-100 w-100 d-flex justify-content-center align-items-center">
        <FullSizeSpinner />
      </div>
    }>
      {(data) => (
        <>
          {!data.length && (
            <div className="d-flex justify-content-center align-items-center w-100">
              <p className="text-muted text-center fs-2">
                No se encontraron textos que coincidan con la búsqueda.
              </p>
            </div>
          )}
          {data.length > 0 &&
            data.map((reading) => (
              <ReadingListItem key={reading.id} reading={reading} />
            ))}
        </>
      )}
    </Await>
  );
}
