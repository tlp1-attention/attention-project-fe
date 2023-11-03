import { useSearchParams } from "react-router-dom";
import qs from "qs";
import { useEffect, useState } from "react";

export function EventFilters() {
  const [params, setSearchParams] = useSearchParams();
  const parsed = qs.parse(params.toString());
  console.log("Parsed: ", parsed);
  const initialFilter = qs.stringify(
    { filter: parsed.filter },
    { encodeValuesOnly: true }
  );
  const initialOrder = qs.stringify(
    { orderField: parsed.orderField, orderType: parsed.orderType },
    { encodeValuesOnly: true }
  );
  console.log("Initial order:", initialOrder);
  const [formValues, setFormValues] = useState({
    filter: initialFilter,
    order: initialOrder
  });

  useEffect(() => {
    const { filter, order } = formValues;
    if (!filter && !order) return setSearchParams(new URLSearchParams(""));
    const urlSearchParams = new URLSearchParams(`${filter}&${order}`);
    console.log(urlSearchParams);

    setSearchParams(urlSearchParams);
  }, [formValues, setSearchParams]);

  console.log(formValues.filter);

  return (
    <form
      id="preference-criteria"
      className="d-flex gap-4 p-2 align-items-center"
    >
      <select
        className="btn btn-primary-brand-outline fs-2 form-control"
        name="filter"
        id="filter"
        value={formValues.filter}
        onChange={e =>
          setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
          })
        }
      >
        <option value="" selected>
          Filtrar
        </option>
        <option value="filter[startDate]=%2Bnow">Fechas futuras</option>
        <option value="filter[typeId]=1">Importantes</option>
        <option value="filter[typeId]=2">No importantes</option>
      </select>
      <select
        className="btn btn-primary-brand-outline fs-2 form-control"
        id="sort-criteria"
        name="order"
        value={formValues.order}
        onChange={e =>
          setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
          })
        }
      >
        <option value="">Ordenar por</option>
        <option value="orderField=startDate&orderType=desc">Por fecha</option>
        <option value="orderField=typeId&orderType=asc">
          Importantes primero
        </option>
        <option value="orderField=typeId&orderType=desc">
          No importantes primero
        </option>
      </select>
    </form>
  );
}
