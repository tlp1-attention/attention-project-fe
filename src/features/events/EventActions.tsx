import { ActionButton } from "@features/ui/action-button/ActionButton";
import dayjs from "dayjs";
import { Modal } from "react-bootstrap";
import { EventFilters } from "./EventFilters";

export function EventActions({
  onAddClick
}: {
  onAddClick: React.MouseEventHandler;
}) {
  return (
    <div className="d-flex color-brand gap-3 align-items-stretch mx-2">
      <AddEventButton onClick={onAddClick} />
      <NotifyButton />
      <EventFilters />
    </div>
  );
}

function AddEventButton({ onClick }: { onClick: React.MouseEventHandler }) {
  return (
    <>
      <ActionButton outline={true} id="new-event" onClick={onClick}>
        <i className="bi bi-plus-circle fs-2"></i>
        <span className="visually-hidden">Nuevo evento</span>
      </ActionButton>
    </>
  );
}

function NotifyButton() {
  return (
    <ActionButton outline={true}>
      <i className="bi bi-bell bi-bell-fill fs-2"></i>
      <span className="visually-hidden">Notíficame</span>
    </ActionButton>
  );
}

export type FormDefaultValues = {
  title: string;
  description: string;
  startDate: string | Date;
  endDate: string | Date;
  typeId: number;
};

type EventFormProps = {
  show: boolean;
  close: () => void;
  defaultValues?: FormDefaultValues;
  handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
  values?: FormDefaultValues;
  onSubmit: () => void;
};

export const EVENT_DEFAULT = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  typeId: 1
};

export function EventForm({
  show,
  close,
  handleChange,
  onSubmit,
  values = EVENT_DEFAULT
}: EventFormProps) {
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
            onChange={handleChange}
            value={values.title}
          />

          <label htmlFor="description">Descripcion</label>
          <textarea
            name="description"
            id="description"
            cols={30}
            rows={5}
            className="form-small-text border-top-0 border-left-0 border-right-0 outline-none"
            maxLength={200}
            required
            onChange={handleChange}
            value={values.description}
          ></textarea>

          <label htmlFor="startDate">Fecha de inicio: </label>
          <input
            type="datetime-local"
            name="startDate"
            className="form-control"
            required
            onChange={handleChange}
            value={dayjs(values.startDate).format("YYYY-MM-DDTHH:mm")}
          />

          <label htmlFor="endDate">Fecha final: </label>
          <input
            type="datetime-local"
            name="endDate"
            className="form-control"
            onChange={handleChange}
            value={dayjs(values.endDate).format("YYYY-MM-DDTHH:mm")}
          />

          <label htmlFor="importance" className="form-label">
            Elija la importancia del evento:{" "}
          </label>
          <select
            name="importance"
            className="form-select w-100 m-2"
            required
            onChange={handleChange}
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
