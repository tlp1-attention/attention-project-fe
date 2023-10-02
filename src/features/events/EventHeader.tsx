export function EventsHeader() {
  return (
    <hgroup className="d-flex justify-content-center flex-column flex-sm-row justify-content-md-between align-items-stretch align-items-sm-center">
      <h1 className="m-3 fs-1">Lista de eventos</h1>
      <div className="d-flex gap-3 align-items-stretch m-2">
        <button id="notify" className="btn btn-primary-brand-outline">
          <i className="bi notification-icon bi-bell bi-bell-fill fs-2"></i>
          <span className="visually-hidden">Notíficame</span>
        </button>
        <button className="btn btn-primary-brand-outline fs-2" id="new-event">
          <i className="bi bi-plus-circle fs"></i>
          <span className="visually-hidden">Nuevo evento</span>
        </button>
      </div>
    </hgroup>
  );
}
