import { useState, useContext, createContext } from "react"

export const UserContext = createContext(null)

export const useUsers = () => useContext(UserContext)

export const UserContextProvider = ({ children }: any) => {

    const [users, setUsers] = useState([])

    const loadUsers = async () => {
        const allUsers = await fetch("", {

        })
            .then(res => res.json())
            .catch(err => console.error(err))
    }

    return (
        <UserContext.Provider value={{
            loadUsers
        }}>
            {children}
        </UserContext.Provider>
    )
}