import { useContext } from "react";
import { SocketContext } from "./SocketProvider";

export const useSocketContext = () => useContext(SocketContext);