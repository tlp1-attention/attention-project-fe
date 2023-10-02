import { useState } from "react";
import { EventList } from "@features/events/EventList";
import { IEvent } from "@interfaces/event";
import { EventActions } from "@features/events/EventActions";

const EVENTS: IEvent[] = [
  {
    id: 1,
    title: "Evento de prueba",
    description: "Descripción de evento",
    startDate: new Date("2023-10-1"),
    endDate: new Date("2023-10-1"),
    typeId: 1
  }
];

export function EventPage() {
  const [events] = useState(EVENTS);

  return (
    <>
      <EventActions />
      <EventList events={events} />;
    </>
  );
}
