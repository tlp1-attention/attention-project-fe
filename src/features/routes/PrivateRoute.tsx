import { useAuth } from "@features/auth/hooks/useAuth";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = React.PropsWithChildren<{
    redirectPath?: string;
}>

export function PrivateRoute({ children, redirectPath = "/" }: PrivateRouteProps) {
    const { isAuthenticated } = useAuth()!;

    if (!isAuthenticated) {
        return <Navigate to={redirectPath} />
    }

    return children;
}