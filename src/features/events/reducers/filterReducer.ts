import qs from "qs";

export const QUERY_ACTIONS = {
  FILTER_FUTURE: "query:filter-future",
  FILTER_IMPORTANT: "query:filter-important",
  FILTER_UNIMPORTANT: "query:filter-unimportant",
  SORT_DATE: "query:sort-date",
  SORT_IMP_FIRST: "query:sort-imp-first",
  SORT_UNIMP_FIRST: "query:sort-unimp-first"
} as const;

type FilterActions =
  | typeof QUERY_ACTIONS["FILTER_FUTURE"]
  | typeof QUERY_ACTIONS["FILTER_IMPORTANT"]
  | typeof QUERY_ACTIONS["FILTER_UNIMPORTANT"]
  | "";

type OrderActions =
  | typeof QUERY_ACTIONS["SORT_DATE"]
  | typeof QUERY_ACTIONS["SORT_IMP_FIRST"]
  | typeof QUERY_ACTIONS["SORT_UNIMP_FIRST"]
  | "";

type QueryAction = {
  type: typeof QUERY_ACTIONS[keyof typeof QUERY_ACTIONS];
};

/**
 * Maps an URL query to the action that
 * generates it.
 */
const urlToActions = {
    "filter[startDate]=%2Bnow": QUERY_ACTIONS.FILTER_FUTURE,
    "filter[typeId]=1": QUERY_ACTIONS.FILTER_IMPORTANT,
    "filter[typeId]=2": QUERY_ACTIONS.FILTER_UNIMPORTANT,
    "orderField=startDate&orderType=asc": QUERY_ACTIONS.SORT_DATE,
    "orderField=typeId&orderType=desc": QUERY_ACTIONS.SORT_IMP_FIRST,
    "orderField=typeId&orderType=asc": QUERY_ACTIONS.SORT_UNIMP_FIRST
}

type QueryParams = {
  /**
   * URL query params for filtering and ordering events
   */
  filter: string;
  order: string;
  /**
   * Filtering and ordering criteria currently applied
   */
  currentFilter: FilterActions,
  currentOrder: OrderActions
};

export const init = (params: URLSearchParams): QueryParams => {
  const parsed = qs.parse(params.toString());

  const initialFilter = qs.stringify(
    { filter: parsed.filter },
    { encodeValuesOnly: true }
  );
  const initialOrder = qs.stringify(
    { orderField: parsed.orderField, orderType: parsed.orderType },
    { encodeValuesOnly: true }
  );


  return {
    filter: initialFilter,
    order: initialOrder,
    currentFilter: urlToActions[initialFilter as keyof typeof urlToActions] as FilterActions,
    currentOrder: urlToActions[initialOrder as keyof typeof urlToActions] as OrderActions
  };
};

export function filterReducer(state: QueryParams, action: QueryAction): QueryParams {
  switch (action.type) {
    case QUERY_ACTIONS.FILTER_FUTURE:
      return {
        ...state,
        filter: "filter[startDate]=%2Bnow",
        currentFilter: action.type,
      };
    case QUERY_ACTIONS.FILTER_IMPORTANT:
      return {
        ...state,
        filter: "filter[typeId]=1",
        currentFilter: action.type,
      };

    case QUERY_ACTIONS.FILTER_UNIMPORTANT:
      return {
        ...state,
        filter: "filter[typeId]=2",
        currentFilter: action.type,
      };
    case QUERY_ACTIONS.SORT_DATE:
      return {
        ...state,
        order: "orderField=startDate&orderType=asc",
        currentOrder: action.type
      };
    case QUERY_ACTIONS.SORT_IMP_FIRST:
      return {
        ...state,
        order: "orderField=typeId&orderType=desc",
        currentOrder: action.type 
      };
    case QUERY_ACTIONS.SORT_UNIMP_FIRST:
      return {
        ...state,
        order: "orderField=typeId&orderType=asc",
        currentOrder: action.type
      };
    default:
      return state;
  }
}
