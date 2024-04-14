import { useAuth } from "@features/auth/hooks/useAuth";
import { Spinner } from "@features/ui/spinner/Spinner";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type AdminRouteProps = {
    children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
    const { isAdmin, hasFetchedUserInfo } = useAuth()!;
    const navigate = useNavigate();

    useEffect(() => {
       if (!isAdmin)  {
            toast.error('No se encuentra autorizado. Por favor inicie sesión e intente ingresar nuevamente.')
            navigate('/');
       }
    });

    return hasFetchedUserInfo ? children : <Spinner />;
}