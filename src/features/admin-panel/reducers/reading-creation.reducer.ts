import { QuestionWithOptions, ReadingWithQuestion } from "../interfaces/reading-with-questions";

type ReadingCreationState = ReadingWithQuestion;

export const READING_ACTIONS = {
    SET_TITLE: 'SET_TITLE',
    SET_CONTENTS: 'SET_CONTENTS',
    SET_SUMMARY: 'SET_SUMMARY',
    SET_COVER: 'SET_COVER',
    ADD_QUESTION: 'ADD_QUESTION',
    EDIT_QUESTION: 'EDIT_QUESTION',
    DELETE_QUESTION: 'DELETE_QUESTION',
} as const;

export const READING_CREATION_DEFAULT = {
    title: '',
    summary: '',
    cover: new File([], ''),
    contents: '',
    questions: [{
        questionText: '',
        options: Array.from({ length: 4 }).map((_, i) => {
            return {
                optionText: '',
                isCorrect: i === 0
            }
        })
    }]
};

type ReadingCreationAction =
    | { type: typeof READING_ACTIONS.SET_TITLE, payload: string }
    | { type: typeof READING_ACTIONS.SET_CONTENTS, payload: string }
    | { type: typeof READING_ACTIONS.SET_SUMMARY, payload: string }
    | { type: typeof READING_ACTIONS.SET_COVER, payload: File }
    | { type: typeof READING_ACTIONS.ADD_QUESTION, payload: QuestionWithOptions }
    | { type: typeof READING_ACTIONS.EDIT_QUESTION, payload: { index: number, question: QuestionWithOptions } }
    | { type: typeof READING_ACTIONS.DELETE_QUESTION, payload: number };

export function readingCreationReducer(
    state: ReadingCreationState,
    action: ReadingCreationAction
): ReadingCreationState { 
    console.log(state);
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
        case READING_ACTIONS.SET_SUMMARY:
            return {
                ...state,
                summary: action.payload
            }
        case READING_ACTIONS.SET_COVER:
            return {
                ...state,
                cover: action.payload
            }
        case READING_ACTIONS.ADD_QUESTION:
            return {
                ...state,
                questions: [
                    ...state.questions,
                    action.payload
                ]
            }
        case READING_ACTIONS.EDIT_QUESTION:
            const questionsAfterEdit = state.questions.map((question, index) => {
                if (index === action.payload.index) {
                    return action.payload.question;
                }
                return question;
            });
            return {
                ...state,
                questions: questionsAfterEdit 
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
