import './ReadingCreationForm.css'
import { QuestionCreationForm } from "./QuestionCreationInput";
import { READING_CREATION_DEFAULT } from "./reducers/reading-creation.reducer";
import { useReadingCreationContext } from "./context/ReadingCreationContext";
import React, { useState } from "react";
import { ReadingWithQuestion } from "./interfaces/reading-with-questions";
import { createReading } from "@services/readings";
import toast from "react-hot-toast";
import { ValidationError } from "@interfaces/validation.error";
import { useAuth } from "@features/auth/hooks/useAuth";

const submitReadingCreation = async (token: string, reading: ReadingWithQuestion) => {
    try {
        await createReading({ reading, token });
        toast.success("Lectura creada exitosamente");
    } catch(err) {
        console.error(err);
        if (err instanceof  Error) {
            toast.error(`${err.message}`);
        }
    }
}

function getDataUrl(file?: File) {
    if (!file) return "";
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const url = reader.result;
    console.log(url);
    return url;
}

const DEFAULT_IMG = "https://placehold.co/600x400/EEE/31343C";

export function ReadingCreationForm() {
    const { token } = useAuth()!;
    const readingContext = useReadingCreationContext();
    const [fileUrl, setFileUrl] = useState(DEFAULT_IMG);
    const numberOfQuestions = readingContext?.questions.length || 0;

    const addDefaultQuestion = () => {
        readingContext?.addQuestion({
            questionText: '',
            options: Array.from({ length: 4 }).map((_, i) => ({
                optionText: '',
                isCorrect: i == 0
            }))
        })
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.name == "title") {
            readingContext?.setTitle(e.target.value);
        } else if (e.target.name == "summary") {
            readingContext?.setSummary(e.target.value);
        } else if (e.target.name == "contents") {
            readingContext?.setContents(e.target.value);
        } else if (e.target.name == "cover") {
            const target = e.target as { files: FileList };
            const file = target.files![0];
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setFileUrl(reader.result as string);
            });
            reader.readAsDataURL(file);
            readingContext?.setCover(file);
        }
    }

    const deleteLastQuestion = () => {
        readingContext?.deleteQuestion(numberOfQuestions - 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return;
        submitReadingCreation(token, {
            title: readingContext?.title || READING_CREATION_DEFAULT.title,
            cover: readingContext?.cover || READING_CREATION_DEFAULT.cover,
            summary: readingContext?.summary || READING_CREATION_DEFAULT.summary,
            contents: readingContext?.contents || READING_CREATION_DEFAULT.contents,
            questions: readingContext?.questions || READING_CREATION_DEFAULT.questions
        });
    }


    return <form className="form d-flex flex-column justify-content-start p-0 pe-md-5 m" onSubmit={handleSubmit}>
        <fieldset className="form-creation-grid">
            <div className="text-inputs-container">
                <label htmlFor="title" className="fs-4">
                    Título de la lectura:{" "}
                </label>
                <input type="text" name="title" className="form-control fs-4" placeholder="Una lectura maravillosa" onChange={handleChange} />
                <label htmlFor="summary" className="fs-4">
                    Resumen de la lectura:{" "}
                </label>
                <input type="text" name="summary" className="form-control fs-4" placeholder="Pequeño resumen de la lectura" onChange={handleChange} />
                <label htmlFor="contents" className="fs-4">
                    Text completo:{" "}
                </label>
                <textarea name="contents" className="form-control fs-4 flex-fill" placeholder="Aquí va el texto completo" onChange={handleChange} />
            </div>
            <div className="flex-grow-1 d-flex gap-2 flex-column image-input-container">
                <label htmlFor="username" className="display-6 fs-4">
                    Imagen de portada:{" "}
                </label>

                <img src={fileUrl} />
                <input type="file" name="cover" className="form-control fs-4" onChange={handleChange}/>
            </div>
        </fieldset>
        <div>
            <h4 className="display-6 ps-3 ps-md-0 py-2 fw-semibold text-brand text-start">
                Añadir preguntas de comprensión
            </h4>
            {Array.from({ length: numberOfQuestions }).map((_, i) => <QuestionCreationForm key={i} />)}
        </div>
        <div className="mb-4 d-flex justify-content-center justify-content-md-start gap-3">
            <button type="button" className="btn add-question-btn shadow d-flex align-items-center gap-2" onClick={() => addDefaultQuestion()}>
                <i className="bi bi-plus-circle fs-4"></i>
                <span className="fs-4">Agregar pregunta</span>
            </button>
            <div>
                <button type="button" className="btn add-question-btn shadow d-flex align-items-center gap-2" onClick={() => deleteLastQuestion()}>
                    <i className="bi bi-dash-circle fs-4"></i>
                    <span className="fs-4">Quitar pregunta</span>
                </button>
            </div>
        </div>
        <button
            type="submit"
            className="form-button w-100"
        >
            Enviar
        </button>
    </form>
}
