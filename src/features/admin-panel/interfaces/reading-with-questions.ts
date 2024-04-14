export type ReadingWithQuestion = {
    title: string;
    summary: string;
    cover: File;
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