import { useSearchParams } from "react-router-dom";

export function EventFilters() {

  return (
    <form
      id="preference-criteria"
      className="d-flex gap-4 p-2 align-items-center"
    >
      <select
        className="btn btn-primary-brand-outline fs-2 form-control"
        id="filter-criteria"
      >
        <option value="-" selected>
          Filtrar
        </option>
        <option value="future-dates">Fechas futuras</option>
        <option value="important">Importantes</option>
        <option value="non-important">No importantes</option>
      </select>
      <select
        className="btn btn-primary-brand-outline fs-2 form-control"
        id="sort-criteria"
      >
        <option value="-" selected>
          Ordenar por
        </option>
        <option value="by-date" selected>
          Por fecha
        </option>
        <option value="by-relevance-imp">Importantes primero</option>
        <option value="by-relevance-no-imp">No importantes primero</option>
      </select>
    </form>
  );
}
