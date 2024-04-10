import { Field, Form, Formik } from "formik";
import './ReadingCreationForm.css'

const CREATION_FORM_DEFAULT_VALUES = {
    title: '',
    contents: '',
    questions: {}
};

export function ReadingCreationForm() {

    return <Formik
        initialValues={CREATION_FORM_DEFAULT_VALUES}
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