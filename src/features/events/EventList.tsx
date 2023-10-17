import { IEvent } from "@interfaces/event";
import './EventList.css';
import { useEvents } from "./hooks/useEvents";

export function EventList() {
  const { events } = useEvents()!;

  return (
    <article className="px-3 py-0 w-100">
      {events.map(evt => (
        <EventElement event={evt} key={evt.id} />
      ))}
    </article>
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
  "Diciembre"
];

function EventElement({ event }: { event: IEvent }) {
  const { title, description, startDate, endDate, typeId } = event;

  return (
    <section className="d-flex position-relative flex-column flex-md-row border border-3 shadow event-container align-content-center">
      <EventDate startDate={startDate} endDate={endDate} typeId={typeId} />
      <div className="event-btns">
        <ActionIcon className="event-delete-btn" icon="trash" text="Eliminar" />
        <ActionIcon
          className="event-update-btn"
          icon="pencil"
          text="Actualizar"
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

function ActionIcon({ icon, text, className }: ActionIconProps) {
  return (
    <button className={`btn ${className}`}>
      <i className={`bi bi-${icon}`}></i>
      <span className="visually-hidden">{text}</span>
    </button>
  );
}

const EVENT_COLORS = {
  1: "var(--clr-green-400)",
  2: "var(--clr-red-600)"
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
        backgroundColor: EVENT_COLORS[typeId]
      }}
    >
      <span className="event-month">
        {MONTHS[startDate.getMonth()].slice(0, 3)}
      </span>
      <span className="event-day">{startDate.getDate()}</span>
    </div>
  );
}
