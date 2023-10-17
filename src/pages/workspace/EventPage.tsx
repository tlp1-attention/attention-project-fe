import { EventList } from "@features/events/EventList";
import { EventsHeader } from "@features/events/EventHeader";
import { EventContextProvider } from "@features/events/context/EventContextProvider";

export function EventPage() {

  return (
    <EventContextProvider>
      <main className="color-brand-light px-3 me-3 py-0">
        <EventsHeader />
        <EventList />
      </main>
    </EventContextProvider>
  );
}
