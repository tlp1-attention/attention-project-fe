import { useReducer, useEffect } from "react";
import "./PageSelect.css";
import {
  PAGE_ACTIONS,
  init,
  paginationReducer,
} from "./reducers/paginationReducer";
import { useSearchParams } from "react-router-dom";
import { useEvents } from "./hooks/useEvents";

export function PageSelect() {
  const { count } = useEvents()!;
  const [params, setParams] = useSearchParams();
  const [pageState, dispatch] = useReducer(paginationReducer, params, init);
  const pages = Array.from(
    { length: Math.ceil((count ?? 0) / 10) },
    (_, i) => i + 1
  );

  useEffect(() => {
    dispatch({ type: PAGE_ACTIONS.SET_PAGE, payload: +(params.get('page') ?? 1) });
    dispatch({ type: PAGE_ACTIONS.SET_PAGE_SIZE, payload: +(params.get('pageSize') ?? 10) });
  }, [params]);

  const handlePageChange = (page: number) => {
    dispatch({ type: PAGE_ACTIONS.SET_PAGE, payload: page });
    setParams({ page: page.toString(), pageSize: pageState.pageSize.toString() });
  };

  return (
    <div className="d-flex justify-content-center page-select">
      <div className="d-flex">
        <button
          className="btn page-change-btn"
          onClick={() => handlePageChange(pageState.page - 1)}
          disabled={pageState.page === pages[0]}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        {pages.map((page) => (
          <PageButton
            key={page}
            active={pageState.page === page}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </PageButton>
        ))}
        <button
          className="btn page-change-btn"
          onClick={() => handlePageChange(pageState.page + 1)}
          disabled={pageState.page === pages.at(-1)}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}

function PageButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: React.MouseEventHandler;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`page-button ${active ? "active shadow-sm" : ""}`}
    >
      {children}
    </button>
  );
}
