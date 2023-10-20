import { EventList } from "@features/events/EventList";
import { EventsHeader } from "@features/events/EventHeader";
import { EventContextProvider } from "@features/events/context/EventContextProvider";
import { useState, useReducer } from 'react';
import { EventForm } from "@features/events/EventActions";

export function EventPage() {

  const [formOpen, setFormOpen] = useState(false);

  const handleOpen = () => { 
    setFormOpen(true); 
  }
  const handleClose = () => setFormOpen(false);

  return (
    <EventContextProvider>
      <main className="color-brand-light px-3 me-3 py-0">
        <EventsHeader onAddClick={handleOpen} />
        <EventList onUpdate={() => {}} />
        <EventForm show={formOpen} close={handleClose} defaultValues={() => {}} onSubmit={() => {}} />
      </main>
    </EventContextProvider>
  );
}
