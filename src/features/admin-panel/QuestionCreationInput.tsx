import React, { useState } from "react";
import { OptionInput } from "./OptionInput";
import './QuestionCreationInput.css';
import { useReadingCreationContext } from "./context/ReadingCreationContext";

const OPTION_QUANTITY_FOR_QUESTION = 4;

type QuestionCreationFormProps = {
    // The index of the question in the whole form. 
    questionIndex: number;
};

export function QuestionCreationForm({ questionIndex }: QuestionCreationFormProps) {
    const readingContext = useReadingCreationContext();
    const [markedIndex, setMarkedIndex] = useState<number>(0);

    const handleCheck = (i: number) => {
        readingContext?.editQuestion(questionIndex, {
            questionText: readingContext.questions[questionIndex].questionText,
            options: readingContext.questions[questionIndex].options.map((option, index) => {
                return {
                    ...option,
                    isCorrect: index === i 
                }
            })
        });
        setMarkedIndex(i);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        readingContext?.editQuestion(questionIndex, {
            questionText: e.target.value,
            options: readingContext.questions[questionIndex].options
        });
    };

    return (
        <div className="question-creation-form mt-1">
            <div className="py-4 d-flex flex-column gap-2">
                <label htmlFor="title" className="fs-4 pt-4">
                    Ingrese el texto de la pregunta:{" "}
                </label>
                <input type="text" name="question" className="form-control fs-4" placeholder="¿En qué año nació Einstein?" onChange={handleChange} />
                <div className="question-options-container">
                    {
                        Array.from({ length: OPTION_QUANTITY_FOR_QUESTION }).map((_, i) => {
                            return <OptionInput questionIndex={questionIndex} checkboxIndex={i} onOptionCheck={handleCheck} marked={markedIndex == i} key={`${questionIndex}-${i}`} />
                        })
                    }
                </div>
            </div>
        </div>
    );
}