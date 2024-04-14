import { AxiosError, AxiosResponse } from "axios";
import { request } from "./setup";
import { ValidationError } from "@interfaces/validation.error";
import { IReading, IReadingByWeek } from "@interfaces/reading";
import { IQuestion } from "@interfaces/question";
import { ReadingWithQuestion } from "@features/admin-panel/interfaces/reading-with-questions";

type GetAllReadingsParams = {
  token: string;
  query?: string;
};

export async function getAllReadings({
  token,
  query = ""
}: GetAllReadingsParams): Promise<{ readings: IReading[] }> {
  try {
    const searchParams = new URLSearchParams();
    searchParams.append("q", query);
    const response = await request.get(`/api/exercises/readings?${searchParams.toString()}`, {
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

type UpdateCompletedExerciseParams = {
  readingId: number;
  won: boolean;
  token: string;
};

export async function updateCompletedExercise({
  readingId,
  won,
  token
}: UpdateCompletedExerciseParams): Promise<void> {
  try {
    const response = await request.post(
      "/api/exercises/completed",
      {
        exerciseId: readingId,
        typeExerciseId: 1,
        complete: won
      },
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;
  } catch (err) {
    console.error(err);
    if (err instanceof AxiosError) {
      const { response } = err;
      if (response?.status == 400) {
        const { errors } = response.data;
        throw errors.map(
          ({ msg }: { msg: string }) => new ValidationError(msg)
        )[0];
      }
      console.error(err);
    }
  }
}

type CompletedReadingsParams = {
  token: string;
}

export async function getCompletedExercisesByWeek({
  token
}: CompletedReadingsParams): Promise<IReadingByWeek[]> {
  try {
    const response = await request.get('/api/exercises/completed/by-week', {
      headers: {
        'Authorization': token
      }
    });
    const { completedExercises } = response.data;

    return completedExercises;

  } catch (err) {
    console.error(err);
    if (err instanceof AxiosError) {
      const { response } = err;
      if (response?.status == 400) {
        const { errors } = response.data;
        throw errors.map(
          ({ msg }: { msg: string }) => new ValidationError(msg)
        )[0];
      }
      console.error(err);
    }
    return [];
  }
}

type CreateReadingParams = { token: string; reading: ReadingWithQuestion };

export async function createReading({
  token,
  reading
}: CreateReadingParams): Promise<AxiosResponse> {
  try {
    const response = await request.post('/api/exercises/readings',
      reading,
      {
        headers: {
          'Authorization': token
        }
      });
    return response;
  } catch (err) {
    console.error(err);
    if (err instanceof AxiosError) {
      const { response } = err;
      if (response?.status == 400) {
        const { errors } = response.data;
        throw errors.map(
          ({ msg }: { msg: string }) => new ValidationError(msg)
        )[0];
      }
      console.error(err);
    }
    throw err;
  }
}

type UpdateReadignCoverParams = { token: string; exerciseId: number; cover: File };

export async function updateReadingCover({
  token,
  exerciseId,
  cover
}: UpdateReadignCoverParams): Promise<any> {
  try {
    const formData = new FormData();
    formData.append('cover', cover);
    const response = await request.post(`/api/exercises/readings/${exerciseId}/cover`,
      formData,
      {
        headers: {
          'Authorization': token
        }
      }
    );
    return response;
  } catch (err) {
    console.error(err);
    if (err instanceof AxiosError) {
      const { response } = err;
      if (response?.status == 400) {
        const { errors } = response.data;
        throw errors.map(
          ({ msg }: { msg: string }) => new ValidationError(msg)
        )[0];
      }
      console.error(err);
      throw err;
    }
    return [];
  }
}