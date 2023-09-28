import '../css/Form.css';
import './TimerForm.css';

type TimerFormProps = {
  show: boolean;
}


export default function TimerForm({ show }: TimerFormProps) {
  if (!show) return null;

  return (
    <article className="p-5 modal-static">
      <section className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-primary-brand d-flex justify-content-center align-items-center">
            <h1 className="text-white modal-title p-4">Crear temporizador</h1>
            <button
              className="btn text-white p-4"
              data-bs-dismiss="modal"
              aria-label="close"
            >
              <i className="bi bi-x-lg fs-2" />
            </button>
          </div>
          <form className="bg-white shadow modal-body p-3">
            <label htmlFor="total-time" className="form-label">
              Elija el tiempo del temporizador:{" "}
            </label>
            <select name="total-time" className="form-select w-100 fs-2 m-2">
              <option value={30}>30 minutos</option>
              <option value={45}>45 minutos</option>
              <option value={60}>1 hora</option>
              <option value={90}>1 hora y 30 minutos</option>
              <option value={120}>2 horas</option>
            </select>
            <button
              type="submit"
              className="btn bg-primary-brand fs-2 mx-5 my-3"
            >
              Iniciar temporizador
            </button>
          </form>
        </div>
      </section>
    </article>
  );
}


