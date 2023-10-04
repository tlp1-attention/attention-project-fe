import { IEvent } from "@interfaces/event";
import { EventFilters } from "./EventFilters";
import { Modal } from "react-bootstrap";
import { ActionButton } from "@features/ui/action-button/ActionButton";

export function EventActions() {
  return (
    <div className="d-flex color-brand gap-3 align-items-stretch mx-2">
      <AddEventButton />
      <NotifyButton />
      <EventFilters />
    </div>
  );
}

type AddEventButton = {
  onAdd: (event: IEvent) => void;
};

function AddEventButton() {
  return (
    <>
      <AddEventForm show={false} />
      <ActionButton outline={true} id="new-event">
        <i className="bi bi-plus-circle fs-2 color-brand"></i>
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

function AddEventForm({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <Modal as="form" className="p-1 p-md-3 p-lg-5 fs-1 event-form">
      <Modal.Dialog>
        <Modal.Body className="modal-content w-100">
          <div className="modal-header bg-primary-brand d-flex justify-content-between align-items-center">
            <h1 className="text-white modal-title p-4">Crear Evento</h1>
            <button
              className="btn text-white p-4"
              data-bs-dismiss="modal"
              aria-label="close"
            >
              <i className="bi bi-x-lg fs-2"></i>
            </button>
          </div>
          <form
            className="bg-white shadow modal-body fs-1 event-form"
            id="new-event-form"
          >
            <label htmlFor="title">Título: </label>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control"
              required
            />

            <label htmlFor="description">Descripcion</label>
            <textarea
              name="description"
              id="description"
              cols={30}
              rows={5}
              className="form-small-text"
              maxLength={200}
              required
            ></textarea>

            <label htmlFor="startDate">Fecha de inicio: </label>
            <input
              type="datetime-local"
              name="startDate"
              className="form-control"
              required
            />

            <label htmlFor="endDate">Fecha final: </label>
            <input
              type="datetime-local"
              name="endDate"
              className="form-control"
            />

            <label htmlFor="importance" className="form-label">
              Elija la importancia del evento:{" "}
            </label>
            <select
              name="importance"
              className="form-select w-100 m-2"
              required
            >
              <option value="1">Importante</option>
              <option value="2">No importante</option>
            </select>
            <button
              type="submit"
              className="btn bg-primary-brand fs-2 mx-5 my-3"
            >
              Enviar
            </button>
          </form>
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
  );
}
