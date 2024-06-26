import { useAuth } from "@features/auth/hooks/useAuth";
import { UsePromiseResult, usePromise } from "@common/hooks/usePromise";
import { UnauthorizedError } from "@interfaces/unauthorized.error";
import { IUser } from "@interfaces/user";
import { getUserList } from "@services/auth/users";
import { useContext, createContext, ReactNode, useCallback } from "react"

type UserContextValue = {
    userResource: UsePromiseResult<IUser[]>;
}

export const UserContext = createContext<UserContextValue | null>(null)
/* eslint-disable */
export const useUsers = () => useContext(UserContext);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const { token } = useAuth()!;
    const userResource = usePromise(useCallback(async () => {
        if (!token) throw new UnauthorizedError('Sesión expirada');
        const users = await getUserList({ token });
        console.log(users);
        return users;
    }, [token]));

    return (
        <UserContext.Provider value={{
            userResource
        }}>
            {children}
        </UserContext.Provider>
    )
}