import { createContext, useState, useMemo, useEffect } from "react";
import { loginUser, registerUser } from "@services/auth/users";
import { ValidationError } from "@interfaces/validation.error";

type AuthContextValue = {
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, password: string, email: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean
}

export const AuthContext = createContext<
    AuthContextValue | null
>(null);

export function AuthContextProvider({ children }: { children: React.ReactElement }) {
    const [token, setToken] = useState<string | null>(
        () => localStorage.getItem('token')
    );

    const login = async (username: string, password: string) => {
        const loginData = await loginUser({ username, password });
        const { token } = loginData;
        if (!token) {
            throw new ValidationError("Token no encontrado!");
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

    const logout = async () => {
        localStorage.removeItem('token');
    }

    const isAuthenticated = useMemo(() => {
        return token != null;
    }, [token]);

    return (
        <AuthContext.Provider value={{
            login,
            register,
            isAuthenticated,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}