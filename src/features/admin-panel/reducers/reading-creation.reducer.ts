import { QuestionWithOptions, ReadingWithQuestion } from "../interfaces/reading-with-questions";

type ReadingCreationState = ReadingWithQuestion;

const READING_ACTIONS = {
    SET_TITLE: 'SET_TITLE',
    SET_CONTENTS: 'SET_CONTENTS',
    SET_SUMMARY: 'SET_SUMMARY',
    ADD_QUESTION: 'ADD_QUESTION',
    DELETE_QUESTION: 'DELETE_QUESTION',
} as const;

export const READING_CREATION_DEFAULT = {
    title: '',
    summary: '',
    contents: '',
    questions: [{
        questionText: '',
        options: []
    }]
};

type ReadingCreationAction =
    | { type: typeof READING_ACTIONS.SET_TITLE, payload: string }
    | { type: typeof READING_ACTIONS.SET_CONTENTS, payload: string }
    | { type: typeof READING_ACTIONS.SET_SUMMARY, payload: string }
    | { type: typeof READING_ACTIONS.ADD_QUESTION, payload: QuestionWithOptions }
    | { type: typeof READING_ACTIONS.DELETE_QUESTION, payload: number };

export function readingCreationReducer(
    state: ReadingCreationState,
    action: ReadingCreationAction
): ReadingCreationState { 

    switch (action.type) {
        case READING_ACTIONS.SET_TITLE:
            return {
                ...state,
                title: action.payload
            }
        case READING_ACTIONS.SET_CONTENTS:
            return {
                ...state,
                contents: action.payload
            }
        case READING_ACTIONS.ADD_QUESTION:
            return {
                ...state,
                questions: [
                    ...state.questions,
                    action.payload
                ]
            }
        case READING_ACTIONS.DELETE_QUESTION:
            const newQuestions = state.questions.filter((_, index) => index !== action.payload);
            return {
                ...state,
                questions: newQuestions
            }
        default:
            return state;
    }
}
