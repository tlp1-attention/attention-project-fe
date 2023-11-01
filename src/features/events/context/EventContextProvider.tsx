import { useAuth } from "@features/auth/hooks/useAuth";
import { IEvent } from "@interfaces/event";
import { useCallback } from "react";
import { ValidationError } from "@interfaces/validation.error";
import { createEventForUser, deleteEventForUser, getEventsForUser, updateEventForUser } from "@services/events";
import { PropsWithChildren, createContext } from "react";
import toast from "react-hot-toast";
import { UsePromiseResult, usePromise } from "@hooks/usePromise";
import { useSearchParams } from "react-router-dom";

type EventContextValue = {
    events?: UsePromiseResult<IEvent[], Error>["data"];
    error: UsePromiseResult<IEvent[], Error>["error"];
    loading: UsePromiseResult<IEvent[], Error>["loading"];
    addEvent: (event: IEvent) => Promise<void>;
    deleteEvent: (eventId: number) => Promise<void>;
    updateEvent: (eventId: number, event: IEvent) => Promise<void>;
    getEvents: () => void;
}

export const EventContext = createContext<EventContextValue | null>(null);

export function EventContextProvider({ children }: PropsWithChildren<unknown>) {
    const { token } = useAuth()!;
    const [params] = useSearchParams();

    const getEvents = useCallback(async () => {
        if (!token) return;
        try {
            const result = await getEventsForUser({
                token,
                params
            });

            const { events } = result;

            return events.map((event: IEvent) => {
                return {
                    ...event,
                    startDate: new Date(event.startDate),
                    endDate: new Date(event.endDate),
                }
            });
        } catch(err) {
            console.error(err);
            if (err instanceof ValidationError) {
                toast.error(err.message);
            }
            
        }
    }, [token]);

    const { data: events, error, loading, revalidate } = usePromise(getEvents);

    const addEvent = async (event: IEvent) => {
        if (!token) return;
        try {
            const result = await createEventForUser({
                token,
                event
            });

            if (result.message) {
                toast.success('¡Evento creado exitosamente!');
            }

            revalidate();

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

            revalidate();

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

            revalidate();

        } catch(err) {
            console.error(err);
            if (err instanceof ValidationError) {
                toast.error(err.message);
            }
        }
    }




    return <EventContext.Provider value={{
        events,
        error,
        loading,
        getEvents,
        addEvent,
        updateEvent,
        deleteEvent,
    }}>
        {children}
    </EventContext.Provider>
}