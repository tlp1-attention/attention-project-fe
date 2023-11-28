import { useSocketContext } from "@features/real-time/context/useSocketContext";
import { useReducer } from "react";

type ContactItemProps = {
  userId: number;
  contact_type?: string;
  contact?: string;
};
export function ContactItem({
  contact_type,
  contact,
  userId
}: ContactItemProps) {
  const { socket } = useSocketContext()!;
  const [showContact, toggleShowContact] = useReducer(show => !show, false);

  const handleClick = () => {
    socket?.emit("colaboration-contact", userId);
    toggleShowContact();
  };

  return (
    <>
      {showContact && <p id="contact">{`${contact_type}: ${contact}`}</p>}
      {!showContact && (
        <button className="btn btn-primary-brand" onClick={handleClick}>
          Contactar
        </button>
      )}
    </>
  );
}
