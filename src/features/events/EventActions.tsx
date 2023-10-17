import { IEvent } from "@interfaces/event";
import { EventFilters } from "./EventFilters";
import { Modal } from "react-bootstrap";
import { ActionButton } from "@features/ui/action-button/ActionButton";
import { useState } from "react";

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
  const [show, setShow] = useState(false);

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <AddEventForm show={show} close={handleClose}/>
      <ActionButton outline={true} id="new-event" onClick={handleOpen}>
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

function AddEventForm({ show, close }: { show: boolean, close: (() => void) }) {
  return (
    <Modal as="form" show={show}  className="p-1 p-md-3 p-lg-5 fs-1 event-form">
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
              className="form-small-text border-top-0 border-left-0 border-right-0 outline-none"
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
    </Modal>
  );
}
