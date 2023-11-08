import { useContext } from "react";
import { EventContext } from "../context/EventContextProvider";

export const useEvents = () => useContext(EventContext);