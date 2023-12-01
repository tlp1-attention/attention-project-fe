import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactNode } from "react";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export function FederatedAuthProvider({ children }: { children: ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>{children}</GoogleOAuthProvider>
  );
}
