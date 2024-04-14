export type ReadingWithQuestion = {
    title: string;
    summary: string;
    contents: string;
    questions: QuestionWithOptions[];
}

export type QuestionWithOptions = {
    questionText: string;
    options: {
        optionText: string;
        isCorrect: boolean;
    }[]
}