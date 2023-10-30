import { IReading } from "@interfaces/reading";
import { Link } from "react-router-dom";

type ReadingListItemProps = {
  reading: IReading;
};

export function ReadingListItem({ reading }: ReadingListItemProps) {
  return (
    <>
      <section className="reading-card mt-5 shadow-lg">
        <div className="position-relative overflow-hidden reading-img flex-shrink-0">
          <img src={reading.readCoverPath} alt={`Portada de ${reading.readTitle}`} />
          <Link
            className="overlay text-decoration-none"
            to={`/workspace/readings/${reading.id}`}
          >
            <span className="d-flex fs-3 gap-3 text-white fw-bold">
              <i className="bi bi-book"></i>
              Leer
            </span>
          </Link>
        </div>
        <div className="px-3 px-md-2 py-3">
          <hgroup className="">
            <span className="reading-category"></span>
            <h3 className="reading-card-title">{reading.readTitle}</h3>
          </hgroup>
          <p className="reading-card-text">{reading.readSummary}</p>
        </div>
      </section>
      `
    </>
  );
}
