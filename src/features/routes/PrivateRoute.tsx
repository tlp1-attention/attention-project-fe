import { useAuth } from "@features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import toast from "react-hot-toast";

type PrivateRouteProps = React.PropsWithChildren<{
    redirectPath?: string;
}>

export function PrivateRoute({ children, redirectPath = "/" }: PrivateRouteProps) {
    const { isAuthenticated } = useAuth()!;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            toast.error('No se encuentra autenticado. Por favor inicie sesión e intente ingresar nuevamente.')
            navigate(redirectPath);
        }
    }, [isAuthenticated, navigate, redirectPath]);

    return children;
}