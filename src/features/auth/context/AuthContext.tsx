import { createContext, useState, useMemo, useEffect, useCallback } from "react";
import { getUserInfo, loginUser, registerUser } from "@services/auth/users";
import { ValidationError } from "@interfaces/validation.error";
import { IUser } from "@interfaces/user";
import toast from "react-hot-toast";
import { loginWithGoogle } from "@services/auth/federated";

type AuthContextValue = {
    hasFetchedUserInfo: boolean;
    login: (username: string, password: string) => Promise<void>;
    googleLogin: (code: string) => Promise<void>;
    register: (username: string, password: string, email: string) => Promise<void>;
    logout: () => void;
    refetchUser: () => Promise<void>;
    isAuthenticated: boolean,
    isAdmin: boolean,
    user?: IUser;
    token: string | null;
}

export const AuthContext = createContext<
    AuthContextValue | null
>(null);

const ADMIN_ROLE_ID = 2;

export function AuthContextProvider({ children }: { children: React.ReactElement }) {
    const [token, setToken] = useState<string | null>(
        () => localStorage.getItem('token')
    );
    const [user, setUser] = useState<IUser | undefined>(undefined);
    const [hasFetchedUserInfo, setHasFetchedUserInfo] = useState(false);

    const login = async (username: string, password: string) => {
        const loginData = await loginUser({ username, password });
        const { token } = loginData;
        if (!token) {
            throw new ValidationError("¡Token no encontrado!");
        }
        setToken(token);
    }

    const googleLogin = async (code: string) => {
        const loginData = await loginWithGoogle({ code });
        const { token, message } = loginData;
        if (!token) {
            throw new ValidationError("¡Token no encontrado!");
        }
        toast.success(message);
        setToken(token);
    }

    useEffect(() => {
        if (token) localStorage.setItem('token', token);
    }, [token]);

    const register = async (username: string, password: string, email: string) => {
        const registerData = await registerUser({
            username,
            password,
            email
        });
        const { token } = registerData;
        setToken(token);
    }

    // A function to refetch the user info
    // after it has been updated
    const refetchUser = useCallback(async () => {
        if (!token) return;
        getUserInfo(token)
            .then(({ user }) => {
                if (!user) throw user;
                setUser({
                    ...user,
                    description: user.description ?? '',
                    ocupation: user.ocupation ?? '',
                    preferences: user.preferences ?? []
                });
            })
            .catch(() => toast.error('No se pudo conseguir la información del usuario'));
    }, [token]);

    useEffect(() => {
        refetchUser();
        setHasFetchedUserInfo(true);
    }, [token, refetchUser])

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(undefined);
    }
    

    const isAuthenticated = useMemo(() => {
        return token != null;
    }, [token]);

    const isAdmin = useMemo(() => {
        return user?.roleId == ADMIN_ROLE_ID;
    }, [user])

    return (
        <AuthContext.Provider value={{
            hasFetchedUserInfo,
            login,
            register,
            isAuthenticated,
            isAdmin,
            logout,
            user,
            googleLogin,
            token,
            refetchUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}