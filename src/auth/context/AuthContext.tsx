import { createContext, useState, useMemo } from "react";
import { loginUser, registerUser } from "src/services/auth/users";

type AuthContextValue = {
    login: (username: string, password: string) => void;
    register: (username: string, password: string, email: string) => void;
    logout: () => void;
    isAuthenticated: () => boolean
}

export const AuthContext = createContext<
    AuthContextValue | null
>(null);

export function AuthContextProvider({ children }: { children: React.ReactElement }) {
    const [token, setToken] = useState<string | null>(
        () => localStorage.getItem('token') ?? null
    );

    const login = async (username: string, password: string) => {
        const loginResponse = await loginUser({ username, password });
        if (loginResponse.status === 200) {
            const { errors } = loginResponse.data;
            throw errors;
        } 
        const { token } = loginResponse.data;
        setToken(token);
    }


    const register = async (username: string, password: string, email: string) => {
        const registerResponse = await registerUser({
            username,
            password,
            email
        });
        if (registerResponse.status === 200) {
            const { errors } = registerResponse.data;
            throw errors;
        } 
        const { token } = registerResponse.data;
        setToken(token);
    }

    const logout = async () => {
        localStorage.removeItem('token');
    }

    const isAuthenticated = useMemo(() => {
        return token == null;
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