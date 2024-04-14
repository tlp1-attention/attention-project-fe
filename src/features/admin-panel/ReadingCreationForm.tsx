import { Field, Form, Formik } from "formik";
import './ReadingCreationForm.css'
import { QuestionCreationForm } from "./QuestionCreationInput";
import { READING_CREATION_DEFAULT } from "./reducers/reading-creation.reducer";
import { useReadingCreationContext } from "./context/ReadingCreationContext";


export function ReadingCreationForm() {
    const readingContext = useReadingCreationContext();

    const numberOfQuestions = readingContext?.questions.length || 0;

    const addDefaultQuestion = () => {
        readingContext?.addQuestion({
            questionText: '',
            options: []
        })
    };

    const deleteLastQuestion = () => {
        readingContext?.deleteQuestion(numberOfQuestions - 1);
    };

    return <Formik
        initialValues={READING_CREATION_DEFAULT}
        onSubmit={() => { }}
    >
        {({ isSubmitting }) => (
            <Form className="form d-flex flex-column justify-content-start p-0 pe-md-5 m">
                <fieldset className="form-creation-grid">
                    <div className="text-inputs-container">
                        <label htmlFor="title" className="fs-4">
                            Título de la lectura:{" "}
                        </label>
                        <Field type="text" name="title" className="form-control fs-4" placeholder="Una lectura maravillosa" />
                        <label htmlFor="summary" className="fs-4">
                            Resumen de la lectura:{" "}
                        </label>
                        <Field type="text" name="summary" className="form-control fs-4" placeholder="Pequeño resumen de la lectura" />
                        <label htmlFor="contents" className="fs-4">
                            Text completo:{" "}
                        </label>
                        <Field type="text" name="contents" className="form-control fs-4 flex-fill" as="textarea" placeholder="Aquí va el texto completo" />
                    </div>
                    <div className="flex-grow-1 d-flex gap-2 flex-column image-input-container">
                        <label htmlFor="username" className="display-6 fs-4">
                            Imagen de portada:{" "}
                        </label>

                        <img src="https://placehold.co/600x400/EEE/31343C" />
                        <Field type="file" name="cover" className="form-control fs-4" />
                    </div>
                </fieldset>
                {Array.from({ length: numberOfQuestions }).map(_ => <QuestionCreationForm />)}
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
                    disabled={isSubmitting}
                    className="form-button w-100"
                >
                    Enviar
                </button>
            </Form>
        )}
    </Formik>
}