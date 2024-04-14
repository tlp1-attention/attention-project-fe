import { createContext, useContext, useReducer } from "react";
import { READING_CREATION_DEFAULT, readingCreationReducer } from "../reducers/reading-creation.reducer";
import { QuestionWithOptions } from "../interfaces/reading-with-questions";

type ReadingCreationContext = {
    title: string;
    contents: string;
    questions: QuestionWithOptions[];
    setTitle: (title: string) => void;
    setContents: (contents: string) => void;
    setSummary: (summary: string) => void;
    addQuestion: (questions: QuestionWithOptions) => void;
    deleteQuestion: (index: number) => void;
}

export const ReadingCreationContext = createContext<ReadingCreationContext | null>(null);

export const useReadingCreationContext = () => useContext(ReadingCreationContext);

type ReadingCreationContextProviderProps = {
    children: React.ReactNode;
};

export function ReadingCreationContextProvider(
    { children }: ReadingCreationContextProviderProps
) {
    const [state, dispatch] = useReducer(readingCreationReducer, READING_CREATION_DEFAULT);

    const setTitle = (title: string) => { 
        dispatch({ type: 'SET_TITLE', payload: title });
    }

    const setContents = (contents: string) => {
        dispatch({ type: 'SET_CONTENTS', payload: contents });
    }

    const setSummary = (summary: string) => {
        dispatch({ type: 'SET_SUMMARY', payload: summary });
    }

    const addQuestion = (question: QuestionWithOptions) => {
        dispatch({ type: 'ADD_QUESTION', payload: question });
    }

    const deleteQuestion = (index: number) => {
        dispatch({ type: 'DELETE_QUESTION', payload: index });
    }

    return <ReadingCreationContext.Provider value={{
        title: state.title,
        contents: state.contents,
        questions: state.questions,
        setTitle,
        setContents,
        setSummary,
        addQuestion,
        deleteQuestion
    }}>
        {children}
    </ReadingCreationContext.Provider>
}
