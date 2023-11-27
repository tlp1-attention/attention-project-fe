import { createContext, useState, useMemo, useEffect } from "react";
import { getUserInfo, loginUser, registerUser } from "@services/auth/users";
import { ValidationError } from "@interfaces/validation.error";
import { IUser } from "@interfaces/user";
import toast from "react-hot-toast";

type AuthContextValue = {
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, password: string, email: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean,
    user?: IUser;
    token: string | null;
}

export const AuthContext = createContext<
    AuthContextValue | null
>(null);

export function AuthContextProvider({ children }: { children: React.ReactElement }) {
    const [token, setToken] = useState<string | null>(
        () => localStorage.getItem('token')
    );
    const [user, setUser] = useState<IUser | undefined>(undefined);

    const login = async (username: string, password: string) => {
        const loginData = await loginUser({ username, password });
        const { token } = loginData;
        if (!token) {
            throw new ValidationError("¡Token no encontrado!");
        }
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

    useEffect(() => {
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
    }, [token])

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(undefined);
    }

    const isAuthenticated = useMemo(() => {
        return token != null;
    }, [token]);

    return (
        <AuthContext.Provider value={{
            login,
            register,
            isAuthenticated,
            logout,
            user,
            token
        }}>
            {children}
        </AuthContext.Provider>
    )
}