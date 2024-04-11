import { Field } from "formik";
import './QuestionCreationInput.css';
import { OptionInput } from "./OptionInput";

const OPTION_QUANTITY_FOR_QUESTION = 4;

export function QuestionCreationForm() {
    return (
        <div className="question-creation-form mt-5">
            <h4 className="display-6 ps-3 ps-md-0 py-2 fw-semibold text-brand text-start">
                Añadir una pregunta
            </h4>
            <div className="py-4 d-flex flex-column gap-2">
                <label htmlFor="title" className="fs-4 pt-4">
                    Ingrese el texto de la pregunta:{" "}
                </label>
                <Field type="text" name="question" className="form-control fs-4" placeholder="¿En qué año nació Einstein?" />
                <div className="question-options-container">
                    {
                        Array.from({ length: OPTION_QUANTITY_FOR_QUESTION }).map((_, i) => {
                            return <OptionInput checkboxIndex={i} />
                        })
                    }
                </div>
            </div>
        </div>
    );
}