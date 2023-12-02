import "@pages/css/Form.css";
import "./TimerForm.css";
import { Modal } from "react-bootstrap";
import { Formik } from "formik";

type TimerFormProps = {
  show: boolean;
  close: () => void;
  onSubmit: (minutes: number) => void;
};

export function TimerForm({ show, close, onSubmit }: TimerFormProps) {
  return (
    <>
      <Modal show={show} onHide={close} backdrop="static">
        <div>
          <Modal.Header className="bg-primary-brand d-flex justify-content-center align-items-center">
            <h1 className="text-white modal-title p-4">Crear temporizador</h1>
            <button
              className="btn text-white p-4"
              data-bs-dismiss="modal"
              aria-label="close"
              onClick={() => close()}
            >
              <i className="bi bi-x-lg fs-2" />
            </button>
          </Modal.Header>
        </div>
        <Formik
          initialValues={{ minutes: 30 }}
          onSubmit={(values) => {
            onSubmit(values.minutes) 
          }}
        >
          {({ handleChange, values, handleSubmit }) => (
            <Modal.Body
              as="form"
              className="bg-white shadow modal-body p-3 fs-2"
              // @ts-expect-error The element is a form because of the "as" attribute.
              onSubmit={handleSubmit}
            >
              <label htmlFor="total-time" className="form-label">
                Elija el tiempo del temporizador:{" "}
              </label>
              <select
                name="minutes"
                className="form-select w-100 fs-2 m-2"
                value={values.minutes}
                onChange={handleChange}
              >
                <option value={30}>30 minutos</option>
                <option value={45}>45 minutos</option>
                <option value={60}>1 hora</option>
                <option value={90}>1 hora y 30 minutos</option>
                <option value={120}>2 horas</option>
              </select>
              <button className="btn bg-primary-brand fs-2 mx-5 my-3" type="submit">
                Iniciar temporizador
              </button>
            </Modal.Body>
          )}
        </Formik>
      </Modal>
    </>
  );
}
