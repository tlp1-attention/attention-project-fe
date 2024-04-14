import { createContext, useContext, useReducer } from "react";
import { QuestionWithOptions } from "../interfaces/reading-with-questions";
import { READING_ACTIONS, READING_CREATION_DEFAULT, readingCreationReducer } from "../reducers/reading-creation.reducer";

type ReadingCreationContext = {
    title: string;
    summary: string;
    contents: string;
    questions: QuestionWithOptions[];
    setTitle: (title: string) => void;
    setContents: (contents: string) => void;
    setSummary: (summary: string) => void;
    addQuestion: (questions: QuestionWithOptions) => void;
    editQuestion: (index: number, question: QuestionWithOptions) => void;
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
        dispatch({ type: READING_ACTIONS.SET_TITLE, payload: title });
    }

    const setContents = (contents: string) => {
        dispatch({ type: READING_ACTIONS.SET_CONTENTS, payload: contents });
    }

    const setSummary = (summary: string) => {
        dispatch({ type: READING_ACTIONS.SET_SUMMARY, payload: summary });
    }

    const addQuestion = (question: QuestionWithOptions) => {
        dispatch({ type: READING_ACTIONS.ADD_QUESTION, payload: question });
    }

    const editQuestion = (index: number, question: QuestionWithOptions) => {
        dispatch({ type: READING_ACTIONS.EDIT_QUESTION, payload: { index, question } });
    }

    const deleteQuestion = (index: number) => {
        dispatch({ type: READING_ACTIONS.DELETE_QUESTION, payload: index });
    }

    return <ReadingCreationContext.Provider value={{
        title: state.title,
        summary: state.summary,
        contents: state.contents,
        questions: state.questions,
        setTitle,
        setContents,
        setSummary,
        addQuestion,
        editQuestion,
        deleteQuestion
    }}>
        {children}
    </ReadingCreationContext.Provider>
}
