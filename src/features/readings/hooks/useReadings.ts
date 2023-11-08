import { useContext } from "react";
import { ReadingContext } from "../context/ReadingContextProvider";

export const useReadings = () => useContext(ReadingContext);