import { UsePromiseResult, usePromise } from "@common/hooks/usePromise";
import { useAuth } from "@features/auth/hooks/useAuth";
import { IEvent } from "@interfaces/event";
import { ValidationError } from "@interfaces/validation.error";
import {
  createEventForUser,
  deleteEventForUser,
  getEventsForUser,
  updateEventForUser,
} from "@services/events";
import { PropsWithChildren, createContext, useCallback } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

type EventResult = {
  events: IEvent[];
  count: number;
};

type EventContextValue = {
  events: EventResult["events"] | undefined;
  count: EventResult["count"] | undefined;
  error: UsePromiseResult<EventResult, Error>["error"];
  loading: UsePromiseResult<EventResult, Error>["loading"];
  addEvent: (event: IEvent) => Promise<void>;
  deleteEvent: (eventId: number) => Promise<void>;
  updateEvent: (eventId: number, event: IEvent) => Promise<void>;
  getEvents: () => void;
};

export const EventContext = createContext<EventContextValue | null>(null);

export function EventContextProvider({ children }: PropsWithChildren<unknown>) {
  const { token } = useAuth()!;
  const [params] = useSearchParams();

  const getEvents = useCallback(async () => {
    if (!token) return;
    try {
      const result = await getEventsForUser({
        token,
        params,
      });

      const { events, count } = result;

      return {
        events: events.map((event: IEvent) => {
          return {
            ...event,
            startDate: new Date(event.startDate),
            endDate: new Date(event.endDate),
          };
        }),
        count,
      };
    } catch (err) {
      console.error(err);
      if (err instanceof ValidationError) {
        toast.error(err.message);
      }
    }
  }, [token, params]);

  const { data: events, error, loading, revalidate } = usePromise(getEvents);

  const addEvent = async (event: IEvent) => {
    if (!token) return;
    try {
      const result = await createEventForUser({
        token,
        event,
      });

      if (result.message) {
        toast.success("¡Evento creado exitosamente!");
      }

      revalidate();
    } catch (err) {
      console.error(err);
      if (err instanceof ValidationError) {
        toast.error(err.message);
      }
    }
  };

  const deleteEvent = async (eventId: number) => {
    if (!token) return;
    try {
      const result = await deleteEventForUser({
        token,
        eventId,
      });

      if (result.message) {
        toast.success("¡Evento eliminado exitosamente!");
      }

      revalidate();
    } catch (err) {
      console.error(err);
      if (err instanceof ValidationError) {
        toast.error(err.message);
      }
    }
  };

  const updateEvent = async (eventId: number, event: IEvent) => {
    if (!token) return;
    try {
      const result = await updateEventForUser({
        token,
        eventId,
        event,
      });

      if (result.message) {
        toast.success("¡Evento actualizado exitosamente!");
      }

      revalidate();
    } catch (err) {
      console.error(err);
      if (err instanceof ValidationError) {
        toast.error(err.message);
      }
    }
  };

  return (
    <EventContext.Provider
      value={{
        events: events?.events,
        count: events?.count,
        error,
        loading,
        getEvents,
        addEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
