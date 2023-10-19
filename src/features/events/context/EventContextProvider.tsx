import { useAuth } from "@features/auth/hooks/useAuth";
import { IEvent } from "@interfaces/event";
import { useCallback } from "react";
import { ValidationError } from "@interfaces/validation.error";
import { createEventForUser, deleteEventForUser, getEventsForUser, updateEventForUser } from "@services/events";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type EventContextValue = {
    events: IEvent[];
    addEvent: (event: IEvent) => Promise<void>;
    deleteEvent: (eventId: number) => Promise<void>;
    updateEvent: (eventId: number, event: IEvent) => Promise<void>;
    getEvents: () => void;
}

export const EventContext = createContext<EventContextValue | null>(null);

export function EventContextProvider({ children }: PropsWithChildren<unknown>) {
    const { token } = useAuth()!;
    const [events, setEvents] = useState<IEvent[]>([]);


    const getEvents = useCallback(async () => {
        if (!token) return;
        try {
            const result = await getEventsForUser({
                token
            });

            const { events } = result;

            setEvents(events.map((event: IEvent) => {
                return {
                    ...event,
                    startDate: new Date(event.startDate),
                    endDate: new Date(event.endDate),
                }
            }));

        } catch(err) {
            console.error(err);
            if (err instanceof ValidationError) {
                toast.error(err.message);
            }
        }
    }, [token]);

    useEffect(() => {
        getEvents()
    }, [getEvents]);

    const addEvent = async (event: IEvent) => {
        if (!token) return;
        console.log(token);
        try {
            const result = await createEventForUser({
                token,
                event
            });

            if (result.message) {
                toast.success('¡Evento creado exitosamente!');
            }

            await getEvents();

        } catch(err) {
            console.error(err);
            if (err instanceof ValidationError) {
                toast.error(err.message);
            }
        }
    }

    const deleteEvent = async (eventId: number) => {
        if (!token) return;
        try {
            const result = await deleteEventForUser({
                token,
                eventId
            });
            if (result.message) {
                toast.success('¡Evento eliminado exitosamente!');
            }

            await getEvents();
        } catch(err) {
            console.error(err);
            if (err instanceof ValidationError) {
                toast.error(err.message);
            }
        }
    }

    const updateEvent = async (eventId: number, event: IEvent) => {
        if (!token) return;
        try {
            const result = await updateEventForUser({
                token,
                eventId,
                event
            });
            if (result.message) {
                toast.success('¡Evento actualizado exitosamente!');
            }

            await getEvents();

        } catch(err) {
            console.error(err);
            if (err instanceof ValidationError) {
                toast.error(err.message);
            }
        }
    }


    return <EventContext.Provider value={{
        events,
        getEvents,
        addEvent,
        updateEvent,
        deleteEvent,

    }}>
        {children}
    </EventContext.Provider>
}