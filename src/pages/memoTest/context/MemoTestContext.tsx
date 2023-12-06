import React, { createContext, useState, useContext, ReactNode } from "react";
import { MemoTestContextProps } from "../Types";

export const MemoTestContext = createContext<MemoTestContextProps | null>(null)
// eslint-disable-next-line react-refresh/only-export-components
export const useMemoTestContext = (): MemoTestContextProps | null => useContext(MemoTestContext)

interface MemoTestProviderProps {
    children: ReactNode
}

export const MemoTestProvider: React.FC<MemoTestProviderProps> = ({ children }) => {

    const [ score, setScore ] = useState<number>(0)
    const [ memoComplete, setMemoComplete ] = useState<boolean>(false);
    const [ runTime, setRunTime ] = useState<boolean>(true)

    return (
        <MemoTestContext.Provider value={{
            score,
            setScore,
            runTime,
            setRunTime,
            memoComplete,
            setMemoComplete
        }}>
            {children}
        </MemoTestContext.Provider>
    )
}