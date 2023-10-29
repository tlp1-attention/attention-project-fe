import { useAuth } from "@features/auth/hooks/useAuth";
import { ResourceResult, usePromise } from "@hooks/usePromise";
import { IReading } from "@interfaces/reading";
import { ValidationError } from "@interfaces/validation.error";
import { getAllReadings } from "@services/readings";
import React, { createContext, useCallback } from "react";
import toast from "react-hot-toast";

export type ReadingContextValue = {
  readings: ResourceResult<IReading[]>;
};

export const ReadingContext = createContext<ReadingContextValue | null>(null);

export function ReadingContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const { token } = useAuth()!;

  const getReadings = useCallback(async () => {
    if (!token) return;
    try {
      const { readings } = await getAllReadings({ token });
      console.log('Readings: ', readings);
      return readings;
    } catch (err) {
      if (err instanceof ValidationError) {
        toast.error(err.message);
      }
    }
  }, [token]);

  const readings = usePromise(getReadings);

  return (
    <ReadingContext.Provider
      value={{
        readings
      }}
    >
      {children}
    </ReadingContext.Provider>
  );
}
