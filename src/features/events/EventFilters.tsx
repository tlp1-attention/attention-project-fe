import { useSearchParams } from 'react-router-dom';
import qs from 'qs';
import { useEffect, useState } from 'react';

export function EventFilters() {
  const [params, setSearchParams] = useSearchParams();
  const initialFilter = /filter(\[(\w+)\].+)/.exec(decodeURIComponent(params.toString()))?.[0] ?? '';

  const parsed = qs.parse(params.toString());
  const [formValues, setFormValues] = useState({
    filter: initialFilter.replace('+', '%2b'),
    order: qs.stringify(parsed.order, { encode: false })
  });

  useEffect(() => {
    const { filter, order } = formValues;
    if (!filter && !order) return setSearchParams(new URLSearchParams(''));
    console.log("Filter: ", filter);
    const urlSearchParams = new URLSearchParams(`${filter}`);

    setSearchParams(
      urlSearchParams
    );

  }, [formValues, setSearchParams])

  console.log(params.toString());
  return (
    <form
      id="preference-criteria"
      className="d-flex gap-4 p-2 align-items-center"
      
    >
      <select
        className="btn btn-primary-brand-outline fs-2 form-control"
        name='filter'
        id="filter"
        value={formValues.filter}
        onChange={(e) => setFormValues({
          ...formValues,
          [e.target.name]: e.target.value
        })}
      >
        <option value="" selected>
          Filtrar
        </option>
        <option value="filter[startDate]=%2bnow">Fechas futuras</option>
        <option value="filter[typeId]=1">Importantes</option>
        <option value="filter[typeId]=2">No importantes</option>
      </select>
      <select
        className="btn btn-primary-brand-outline fs-2 form-control"
        id="sort-criteria"
        name="order"
        value={formValues.order}
        onChange={(e) => setFormValues({
          ...formValues,
          [e.target.name]: e.target.value
        })}
      >
        <option value="">
          Ordenar por
        </option>
        <option value="by-date">
          Por fecha
        </option>
        <option value="by-relevance-imp">Importantes primero</option>
        <option value="by-relevance-no-imp">No importantes primero</option>
      </select>
    </form>
  );
}
