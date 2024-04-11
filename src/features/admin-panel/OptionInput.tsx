import { Field } from "formik";
import './OptionInput.css';

type OptionInputProps = {
    checkboxIndex: number;
    // Event handler for when the user toggles the checkbox.
    // Receives its `checkboxIndex`
    onOptionCheck: (i: number) => void
    // Whether or not the checkbox is marked
    marked: boolean
};

export function OptionInput({ checkboxIndex, onOptionCheck, marked }: OptionInputProps) {
    const handleClick = () => {
        onOptionCheck(checkboxIndex);
    };

    return <div className="d-flex">
        <label htmlFor="option" className="visually-hidden ">
            Ingrese el texto de la opción:
        </label>
        <div className="d-flex align-items-center gap-2 flex-grow-1">
            <Field type="text" name="option" className="form-control" />
            <Field type="checkbox" name={`isCorrect${checkboxIndex}`} className="form-check-input visually-hidden-focusable" onChange={handleClick} />
            <div className="d-flex justify-content-center align-items-center">
                <div className="p-2 flex-grow-1 option-correct-checkbox-container">
                    <div className={`option-correct-checkbox d-flex align-items-center ${marked ? 'marked' : ''}`} onClick={handleClick}>
                        {/* {marked ? <i className="bi bi-check-lg fs-3"></i> : null} */}
                    </div>
                </div>
            </div>
        </div>
    </div>
}