import { EventForm } from "@features/events/EventForm";
import { EventsHeader } from "@features/events/EventHeader";
import { EventList } from "@features/events/EventList";
import { EVENT_DEFAULT, FormDefaultValues } from "@features/events/constants";
import { EventContextProvider } from "@features/events/context/EventContextProvider";
import { NotificationContextProvider } from "@features/events/context/NotificationContext";
import { useEvents } from "@features/events/hooks/useEvents";
import { IEvent } from "@interfaces/event";
import { useState } from "react";
import toast from "react-hot-toast";

export function Agenda() {
  const { addEvent, updateEvent, events, deleteEvent } = useEvents()!;
  const [formOpen, setFormOpen] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<FormDefaultValues>(
    EVENT_DEFAULT
  );

  const handleOpen = () => {
    setUpdatingId(null);
    setFormValues(EVENT_DEFAULT);
    setFormOpen(true);
  };

  const handleClose = () => setFormOpen(false);

  const handleUpdate = (id: number) => {
    setUpdatingId(id);
    const event = events?.find(e => e.id == id);
    if (!event) {
      toast.error("Evento no encontrado.");
      return;
    }
    setFormValues({
      ...event
    });
    setFormOpen(true);
  };

  return (
    <main className="color-brand-light px-3 me-3 py-0">
      <EventsHeader onAddClick={handleOpen} />
      <EventList onUpdate={handleUpdate} onDelete={id => deleteEvent(id)} />
      <EventForm
        show={formOpen}
        close={handleClose}
        values={formValues}
        handleChange={(name, value) =>
          setFormValues({
            ...formValues,
            [name]: value
          })
        }
        onSubmit={async () => {
          const event: IEvent = {
            ...formValues,
            startDate: new Date(formValues.startDate),
            endDate: new Date(formValues.endDate),
            typeId: formValues.typeId as 1 | 2
          };

          if (!updatingId) {
            await addEvent(event);
          } else {
            await updateEvent(updatingId, event);
          }
          setFormOpen(false);
        }}
      />
    </main>
  );
}

export function EventPage() {
  return (
    <NotificationContextProvider>
      <EventContextProvider>
        <Agenda />
      </EventContextProvider>
    </NotificationContextProvider>
  );
}
