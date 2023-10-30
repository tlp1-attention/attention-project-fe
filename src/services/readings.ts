import { AxiosError } from "axios";
import { request } from "./setup";
import { ValidationError } from "@interfaces/validation.error";
import { IReading } from "@interfaces/reading";
import { IQuestion } from "@interfaces/question";

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
};

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

type GetQuestionForReadingParams = {
  token: string;
  readingId: string;
};

export async function getQuestionsByReading({
  token,
  readingId
}: GetQuestionForReadingParams): Promise<{ questions: IQuestion[] }> {
  try {
    const response = await request.get(
      `/api/exercises/readings/${readingId}/questions`,
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
      } else if (response?.status == 404) {
        return {
          questions: []
        };
      }
      throw new ValidationError(err.response?.data.message);
    }
    console.error(err);
    return { questions: [] };
  }
}
