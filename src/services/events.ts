import { AxiosError } from "axios";
import { request } from "./setup";
import { ValidationError } from "@interfaces/validation.error";
import { IEvent } from "@interfaces/event";

type GetEventParams = {
    token: string;
}

export async function getEventsForUser({
    token
}: GetEventParams) {
  try {
    const response = await request.get("/api/events", {
        headers: {
            'Authorization': token
        }
    });

    return response.data;

  } catch (err) {
    if (err instanceof AxiosError) {
      const { response } = err;
      if (response?.status == 400) {
        const { errors } = response.data;
        throw errors.map(({ msg }: { msg: string }) => new ValidationError(msg))[0];
      }
      throw new ValidationError(err.response?.data.message);
    }
  }
}

type CreateEventParams = {
    event: IEvent;
    token: string;
}

export async function createEventForUser({
    token,
    event
}: CreateEventParams) {
  try {
    const response = await request.post("/api/events", {
        headers: {
            'Authorization': token
        },
        body: event
    });

    return response.data;

  } catch (err) {
    if (err instanceof AxiosError) {
      const { response } = err;
      if (response?.status == 400) {
        const { errors } = response.data;
        throw errors.map(({ msg }: { msg: string }) => new ValidationError(msg))[0];
      }
      throw new ValidationError(err.response?.data.message);
    }
  }
}


type UpdateEventParams = {
    eventId: number;
    event: IEvent;
    token: string;
}

export async function updateEventForUser({
    token,
    event,
    eventId
}: UpdateEventParams) {
  try {
    const response = await request.put(`/api/events/${eventId}`, {
        headers: {
            'Authorization': token
        },
        body: event
    });

    return response.data;

  } catch (err) {
    if (err instanceof AxiosError) {
      const { response } = err;
      if (response?.status == 400) {
        const { errors } = response.data;
        throw errors.map(({ msg }: { msg: string }) => new ValidationError(msg))[0];
      }
      throw new ValidationError(err.response?.data.message);
    }
  }
}

type DeleteEventParams = {
    token: string;
    eventId: number;
}

export async function deleteEventForUser({
    token,
    eventId,
}: DeleteEventParams) {
  try {
    const response = await request.delete(`/api/events/${eventId}`, {
        headers: {
            'Authorization': token
        },
    });

    return response.data;

  } catch (err) {
    if (err instanceof AxiosError) {
      const { response } = err;
      if (response?.status == 400) {
        const { errors } = response.data;
        throw errors.map(({ msg }: { msg: string }) => new ValidationError(msg))[0];
      }
      throw new ValidationError(err.response?.data.message);
    }
  }
}