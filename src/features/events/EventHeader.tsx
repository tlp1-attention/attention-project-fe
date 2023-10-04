import { EventActions } from "./EventActions";

export function EventsHeader() {
  return (
    <hgroup className="d-flex color-brand justify-content-center flex-column flex-sm-row justify-content-md-between align-items-stretch align-items-sm-center">
      <h1 className="m-3 fs-1">Lista de eventos</h1>
      <div className="d-flex gap-3 align-items-stretch m-2">
        <EventActions />
      </div>
    </hgroup>
  );
}
