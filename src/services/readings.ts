import { AxiosError } from "axios";
import { request } from "./setup";
import { ValidationError } from "@interfaces/validation.error";
import { IReading } from "@interfaces/reading";

type GetAllReadingsParams = {
  token: string;
};

export async function getAllReadings({
  token
}: GetAllReadingsParams): Promise<{ readings: IReading[] }> {
  try {
    const response = await request.get("/api/exercises/readings", {
      headers: {
        Authorization: token
      }
    });
    const { exercises } = response.data;

    return {
      readings: exercises
    };

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
          readings: []
        };
      }
      throw new ValidationError(err.response?.data.message);
    }
    console.error(err);
    return { readings: [] };
  }
}

type GetReadingParams = {
    token: string;
    readingId: string;
}

export async function getReading({
  readingId,
  token
}: GetReadingParams): Promise<{ readings: IReading[] }> {
  try {
    const response = await request.get(`/api/exercises/readings/${readingId}`, {
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
      } else if (response?.status == 404) {
        return {
          readings: []
        };
      }
      throw new ValidationError(err.response?.data.message);
    }
    console.error(err);
    return { readings: [] };
  }
}
