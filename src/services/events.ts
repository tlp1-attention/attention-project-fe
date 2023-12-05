import { AxiosError } from "axios";
import { request } from "./setup";
import { ValidationError } from "@interfaces/validation.error";
import { IEvent, IEventByWeek } from "@interfaces/event";

type GetEventParams = {
  token: string;
  params: URLSearchParams;
};

export async function getEventsForUser({
  token,
  params
}: GetEventParams): Promise<{ events: IEvent[], count: number }> {
  try {
    const response = await request.get(`/api/events?${params.toString()}`, {
      headers: {
        Authorization: token
      }
    });
    console.log("Response: ", response.status);

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const { response } = err;
      if (response?.status == 400) {
        const { errors } = response.data;
        throw errors.map(
          ({ msg }: { msg: string }) => new ValidationError(msg)
        )[0];
      } else if (response?.status == 404) {
        return {
          events: [],
          count: 0
        };
      }
      throw new ValidationError(err.response?.data.message);
    }
    console.error(err);
    return { events: [], count: 0 };
  }
}

type CreateEventParams = {
  event: IEvent;
  token: string;
};

export async function createEventForUser({ token, event }: CreateEventParams) {
  try {
    const response = await request.post("/api/events", event, {
      headers: {
        Authorization: token
      }
    });

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const { response } = err;
      if (response?.status == 400) {
        const { errors } = response.data;
        throw errors.map(
          ({ msg }: { msg: string }) => new ValidationError(msg)
        )[0];
      }
      throw new ValidationError(err.response?.data.message);
    }
  }
}

type UpdateEventParams = {
  eventId: number;
  event: IEvent;
  token: string;
};

export async function updateEventForUser({
  token,
  event,
  eventId
}: UpdateEventParams) {
  try {
    const response = await request.put(`/api/events/${eventId}`, event, {
      headers: {
        Authorization: token
      }
    });

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const { response } = err;
      if (response?.status == 400) {
        const { errors } = response.data;
        throw errors.map(
          ({ msg }: { msg: string }) => new ValidationError(msg)
        )[0];
      }
      throw new ValidationError(err.response?.data.message);
    }
  }
}

type DeleteEventParams = {
  token: string;
  eventId: number;
};

export async function deleteEventForUser({
  token,
  eventId
}: DeleteEventParams) {
  try {
    const response = await request.delete(`/api/events/${eventId}`, {
      headers: {
        Authorization: token
      }
    });

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const { response } = err;
      if (response?.status == 400) {
        const { errors } = response.data;
        throw errors.map(
          ({ msg }: { msg: string }) => new ValidationError(msg)
        )[0];
      }
      throw new ValidationError(err.response?.data.message);
    }
  }
}

type GetPublicKeyParams = {
  token: string;
};

export async function getPublicKey({ token }: GetPublicKeyParams) {
  try {
    const response = await request.get(`/api/notifications/vapid-key`, {
      headers: {
        Authorization: token
      }
    });

    const { publicKey: key } = response.data;
    console.log("Llega: ", key);
    return key;
  } catch (err) {
    if (err instanceof AxiosError) {
      const { response } = err;
      if (response?.status == 400) {
        const { errors } = response.data;
        throw errors.map(
          ({ msg }: { msg: string }) => new ValidationError(msg)
        )[0];
      }
      throw new ValidationError(err.response?.data.message);
    }
  }
}

type SubscribeNotificationParams = {
  subscription: PushSubscription;
  token: string;
};

export async function subscribeToNotifications({
  subscription,
  token
}: SubscribeNotificationParams) {
  try {
    const response = await request.post(
      `/api/notifications/subscription`,
      subscription,
      {
        headers: {
          Authorization: token
        }
      }
    );

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const { response } = err;
      if (response?.status == 400) {
        const { errors } = response.data;
        throw errors.map(
          ({ msg }: { msg: string }) => new ValidationError(msg)
        )[0];
      }
      throw new ValidationError(err.response?.data.message);
    }
  }
}

type DeleteSubscriptionParams = {
  token: string;
};

export async function unsubscribeToNotifications({
  token
}: DeleteSubscriptionParams) {
  try {
    const response = await request.delete(`/api/notifications/subscription`, {
      headers: {
        Authorization: token
      }
    });

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const { response } = err;
      if (response?.status == 400) {
        const { errors } = response.data;
        throw errors.map(
          ({ msg }: { msg: string }) => new ValidationError(msg)
        )[0];
      }
      throw new ValidationError(err.response?.data.message);
    }
  }
}

type GetEventsByWeekParams = {
  token: string;
};

export async function getEventsByWeek({
  token
}: GetEventsByWeekParams): Promise<IEventByWeek[]> {
   
  try {
    const response = await request.get(`/api/events/by-week`, {
      headers: {
        Authorization: token
      }
    });
    const { events } = response.data

    return events;

  } catch (err) {
    if (err instanceof AxiosError) {
      const { response } = err;
      if (response?.status == 400) {
        const { errors } = response.data;
        throw errors.map(
          ({ msg }: { msg: string }) => new ValidationError(msg)
        )[0];
      }
      throw new ValidationError(err.response?.data.message);
    }
    return [];
  }
}
