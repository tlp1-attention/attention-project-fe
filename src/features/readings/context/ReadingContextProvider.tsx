import { UsePromiseResult, usePromise } from "@common/hooks/usePromise";
import { useAuth } from "@features/auth/hooks/useAuth";
import { IQuestion } from "@interfaces/question";
import { IReading } from "@interfaces/reading";
import { UnauthorizedError } from "@interfaces/unauthorized.error";
import { ValidationError } from "@interfaces/validation.error";
import {
  getAllReadings,
  getQuestionsByReading,
  updateCompletedExercise
} from "@services/readings";
import React, { createContext, useCallback } from "react";
import toast from "react-hot-toast";

export type ReadingContextValue = {
  readings: UsePromiseResult<IReading[], ValidationError>;
  getQuestionsForReading: (readingId: string) => Promise<IQuestion[]>;
  updateExerciseCompleted: (readingId: string, won: boolean) => Promise<void>;
};

export const ReadingContext = createContext<ReadingContextValue | null>(null);

export function ReadingContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const { token } = useAuth()!;

  const getReadings = useCallback(async () => {
    if (!token) return [];
    try {
      const { readings } = await getAllReadings({ token });
      return readings;
    } catch (err) {
      if (err instanceof ValidationError) {
        toast.error(err.message);
        return [];
      } else {
        throw err;
      }
    }
  }, [token]);

  const readings = usePromise<IReading[], ValidationError>(getReadings);

  const getQuestionsForReading = async (readingId: string) => {
    if (!token) throw new UnauthorizedError("Token no encontrado.");
    try {
      const { questions } = await getQuestionsByReading({
        token,
        readingId
      });
      return questions;
    } catch (err) {
      if (err instanceof ValidationError) {
        toast.error(err.message);
      } else {
        throw err;
      }
      return [];
    }
  };

  const updateExerciseCompleted = async (readingId: string, won: boolean) => {
    if (!token) throw new UnauthorizedError();
    try {
      await updateCompletedExercise({
        readingId: +readingId,
        token,
        won
      });
    } catch (err) {
      console.error(err);
      toast.error("Algo salió mal. Contacte a los desarrolladores del sitio");
    }
  };

  return (
    <ReadingContext.Provider
      value={{
        readings,
        getQuestionsForReading,
        updateExerciseCompleted
      }}
    >
      {children}
    </ReadingContext.Provider>
  );
}
