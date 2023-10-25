import dayjs from "dayjs";
import { Modal } from "react-bootstrap";
import { FormDefaultValues } from "./constants";
import "react-datepicker/dist/react-datepicker.min.css";

type EventFormProps = {
  show: boolean;
  close: () => void;
  defaultValues?: FormDefaultValues;
  handleChange: <T>(name: string, value: T) => void;
  values: FormDefaultValues;
  onSubmit: () => void;
};

type FormFieldChangeEvent =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

export function EventForm({
  show,
  close,
  handleChange,
  onSubmit,
  values
}: EventFormProps) {
  const handleValueChange: React.ChangeEventHandler<FormFieldChangeEvent> = e => {
    handleChange(e.target.name, e.target.value);
  };

  return (
    <Modal show={show} className="p-1 p-md-3 p-lg-5 fs-1 event-form">
      <Modal.Body className="w-100 p-0">
        <div className="modal-header bg-primary-brand d-flex justify-content-between align-items-center">
          <h1 className="text-white modal-title p-4">Crear Evento</h1>
          <button
            className="btn text-white p-4"
            data-bs-dismiss="modal"
            aria-label="close"
            onClick={close}
          >
            <i className="bi bi-x-lg fs-2"></i>
          </button>
        </div>
        <form
          className="bg-white shadow modal-body fs-1 event-form"
          id="new-event-form"
          onSubmitCapture={e => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <label htmlFor="title">Título: </label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            required
            onChange={handleValueChange}
            value={values.title}
          />

          <label htmlFor="description">Descripcion</label>
          <textarea
            name="description"
            id="description"
            cols={30}
            rows={5}
            className="form-small-text event-textarea"
            maxLength={200}
            required
            onChange={handleValueChange}
            value={values.description}
          ></textarea>
          <label htmlFor="startDate">Fecha de inicio: </label>
          <input
            type="datetime-local"
            name="startDate"
            className="form-control"
            required
            onChange={handleValueChange}
            value={dayjs(values.startDate).format("YYYY-MM-DDTHH:mm")}
          />
          <label htmlFor="endDate">Fecha final: </label>
          <input
            type="datetime-local"
            name="endDate"
            className="form-control"
            onChange={handleValueChange}
            value={dayjs(values.endDate).format("YYYY-MM-DDTHH:mm")}
          />

          <label htmlFor="importance" className="form-label">
            Elija la importancia del evento:{" "}
          </label>
          <select
            name="importance"
            className="form-select w-100 m-2"
            required
            onChange={handleValueChange}
            value={values.typeId}
          >
            <option value="1">Importante</option>
            <option value="2">No importante</option>
          </select>
          <button type="submit" className="btn bg-primary-brand fs-2 mx-5 my-3">
            Enviar
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
