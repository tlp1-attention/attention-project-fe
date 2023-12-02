import { useSearchParams } from "react-router-dom";
import { useEffect, useReducer, } from "react";
import { QUERY_ACTIONS, filterReducer, init } from "./reducers/filterReducer";

export function EventFilters() {
  const [params, setSearchParams] = useSearchParams();
  const [criteria, dispatch] = useReducer(filterReducer, params, init);

  // Modifies the URL to match the current
  // select inputs
  useEffect(() => {
    const { filter, order } = criteria;
    if (!filter && !order) { 
      const newParams = new URLSearchParams(params);
      newParams.delete("filter");
      newParams.delete("order");
      return setSearchParams(newParams);
    }
    const urlSearchParams = new URLSearchParams(`${filter}&${order}`);
    // Append all the other params
    for (const [key, value] of params) {
      if (key !== "filter" && key !== "order") {
        urlSearchParams.set(key, value);
      }
    }
    setSearchParams(urlSearchParams);
  }, [criteria, setSearchParams, params]);


  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: e.target.value as typeof QUERY_ACTIONS[keyof typeof QUERY_ACTIONS]
    });
  }

  return (
    <form
      id="preference-criteria"
      className="d-flex gap-4 p-2 align-items-center"
    >
      <select
        className="btn btn-primary-brand-outline fs-2 form-control"
        name="filter"
        id="filter"
        value={criteria.currentFilter}
        onChange={handleSelectChange}
      >
        <option value="" selected>
          Filtrar
        </option>
        <option value={QUERY_ACTIONS.FILTER_FUTURE}>Fechas futuras</option>
        <option value={QUERY_ACTIONS.FILTER_IMPORTANT}>Importantes</option>
        <option value={QUERY_ACTIONS.FILTER_UNIMPORTANT}>No importantes</option>
      </select>
      <select
        className="btn btn-primary-brand-outline fs-2 form-control"
        id="sort-criteria"
        name="order"
        value={criteria.currentOrder}
        onChange={handleSelectChange}
      >
        <option value="">Ordenar por</option>
        <option value={QUERY_ACTIONS.SORT_DATE}>Por fecha</option>
        <option value={QUERY_ACTIONS.SORT_IMP_FIRST}>
          Importantes primero
        </option>
        <option value={QUERY_ACTIONS.SORT_UNIMP_FIRST}>
          No importantes primero
        </option>
      </select>
    </form>
  );
}
