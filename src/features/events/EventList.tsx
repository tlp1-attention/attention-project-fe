import { IEvent } from "@interfaces/event";
import "./EventList.css";
import { useEvents } from "./hooks/useEvents";
import { Spinner } from "@features/ui/spinner/Spinner";
import { ErrorScreen } from "@features/ui/error-screen/ErrorScreen";
import { PageSelect } from "./PageSelect";

export function EventList({
  onUpdate,
  onDelete,
}: {
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  const { loading, error, events } = useEvents()!;

  if (loading)
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <Spinner className="text-center d-flex justify-content-center align-items-center mt-3" />
      </div>
    );
  if (!events || error) return <ErrorScreen error={error as Error} />;

  return (
    <>
      <PageSelect />
      <article className="px-3 py-0 w-100 min-vh-100">
        {events.length == 0 ? (
          <p className="display-5 text-center mt-5">
            No se han encontrado eventos para el usuario
          </p>
        ) : (
          events.map((evt) => (
            <EventElement
              event={evt}
              key={evt.id}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))
        )}
      </article>
      <PageSelect />
    </>
  );
}

const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

function EventElement({
  event,
  onUpdate,
  onDelete,
}: {
  event: IEvent;
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  const { title, description, startDate, endDate, typeId } = event;

  return (
    <section className="d-flex position-relative flex-column flex-md-row border border-3 shadow event-container align-content-center">
      <EventDate startDate={startDate} endDate={endDate} typeId={typeId} />
      <div className="event-btns">
        <ActionIcon
          className="event-delete-btn"
          icon="trash"
          text="Eliminar"
          onClick={() => onDelete(event.id!)}
        />
        <ActionIcon
          className="event-update-btn"
          icon="pencil"
          text="Actualizar"
          onClick={() => onUpdate(event.id!)}
        />
      </div>
      <div className="p-2 my-2 mx-3 event-text flex-shrink-1">
        <h3 className="display-5">{title}</h3>
        <p className="fs-3">{description}</p>
      </div>
    </section>
  );
}

type ActionIconProps = {
  icon: string;
  text: string;
  onClick?: React.MouseEventHandler;
  className: string;
};

function ActionIcon({ icon, text, className, onClick }: ActionIconProps) {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      <i className={`bi bi-${icon}`}></i>
      <span className="visually-hidden">{text}</span>
    </button>
  );
}

const EVENT_COLORS = {
  1: "var(--clr-green-400)",
  2: "var(--clr-red-600)",
};

type EventDateProps = {
  startDate: Date;
  endDate: Date;
  typeId: IEvent["typeId"];
};

function EventDate({ startDate, typeId }: EventDateProps) {
  return (
    <div
      className="event-date flex-shrink-0"
      style={{
        backgroundColor: EVENT_COLORS[typeId],
      }}
    >
      <span className="event-month">
        {MONTHS[startDate.getMonth()].slice(0, 3)}
      </span>
      <span className="event-day">{startDate.getDate()}</span>
    </div>
  );
}
