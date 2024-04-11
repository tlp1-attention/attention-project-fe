import { Field } from "formik";
import './OptionInput.css';
import { useState } from "react";

export function OptionInput({ checkboxIndex }: { checkboxIndex: number }) {
    const [marked, setMarked] = useState(true);

    return <div className="d-flex">
        <label htmlFor="option" className="visually-hidden ">
            Ingrese el texto de la opción:
        </label>
        <div className="d-flex align-items-center gap-2 flex-grow-1">
            <Field type="text" name="option" className="form-control" />
            <Field type="checkbox" name={`isCorrect${checkboxIndex}`} className="form-check-input visually-hidden" />
            <div className="option-correct-checkbox d-flex align-items-center">
                {marked ? <i className="bi bi-check-lg fs-3"></i> : null}
            </div>
        </div>
    </div>
}