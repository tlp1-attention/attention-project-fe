import { useReadings } from "@features/readings/hooks/useReadings";
import { ErrorScreen } from "@features/ui/error-screen/ErrorScreen";
import { Spinner } from "@features/ui/spinner/Spinner";
import { Link, Navigate, useParams } from "react-router-dom";

export function IndividualReading() {
  const { readings } = useReadings()!;
  const { readingId = 1 } = useParams();

  if (readings.loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner />
      </div>
    );
  if (readings.error)
    return <ErrorScreen error={readings.error as Error} />;

  const reading = readings.data.find(reading => reading.id == +readingId);

  if (!reading) return <Navigate to="/not-found" />;

  return (
    <main className="px-1 pe-lg-5 my-4">
      <article className="flex-grow-1 reading-info-container">
        <div className="presentation-header">
          <img src="/assets/bg-placeholder-login.png" alt="" />
        </div>
        <section className="reading d-flex flex-column flex-lg-row align-items-center align-items-lg-start justify-content-center justify-content-lg-start">
          <div className="reading-cover shadow-lg">
            <img
              src={`${reading.readCoverPath ??
                "/assets/bg-placeholder-login.png"}`}
              alt=""
            />
            <div className="d-none d-lg-block img-read-btn p-2">
              <a
                className="btn btn-primary-brand-outline d-block fs-3 my-3 w-100"
                href="#read"
              >
                <i className="bi bi-book"></i>
                Leer
              </a>
            </div>
          </div>
          <div className="reading-info text-center text-lg-start">
            <hgroup>
              <h1 className="reading-title">{reading.readTitle}</h1>
            </hgroup>
            <p>{reading.readSummary ?? ""}</p>
            <div className="d-block d-lg-none px-1">
              <button className="btn btn-primary-brand-outline fs-3 my-4 w-100">
                <i className="bi bi-book"></i>
                Leer
              </button>
            </div>
          </div>
        </section>
      </article>
      <div className="divider"></div>
      <article className="complete-reading fs-4 mt-5">
        <section
          className="accordion accordion-flush g-5"
          id="accordionFlushExample"
        >
          <div className="accordion-item min-h-md border border-1">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed shadow-lg"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                <h3 className="text-brand fs-2">Lectura completa</h3>
              </button>
            </h2>
            <div id="flush-collapseOne" className="accordion-collapse collapse">
              <div className="accordion-body">
                {reading.read.split("\n").map(paragraph => (
                  <p>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="accordion-item min-h-md border border-1">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                <h3 className="text-brand fs-2">Preguntas de interpretación</h3>
              </button>
            </h2>
            <div id="flush-collapseTwo" className="accordion-collapse collapse">
              <div className="accordion-body d-flex flex-column">
                <p>
                  Responde un pequeño cuestionario sobre el texto que acabas de
                  leer para practicar comprensión y formar un hábito.
                </p>
                <p>
                  Asegúrate de leerlo detenidamente puesto que volver hacia
                  atrás hará perder tu progreso. Trata de recordar la
                  información que leíste para formar un hábito. ¡Buena suerte!
                </p>
                <Link
                  className="btn btn-primary-brand align-self-end fs-3 mt-3"
                  to={`/workspace/readings/${reading.id}/quiz`}
                >
                  <i className="bi bi-question-mark"></i>
                  Contestar
                </Link>
              </div>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
