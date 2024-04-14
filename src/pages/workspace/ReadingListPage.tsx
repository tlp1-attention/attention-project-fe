import "@features/readings/Reading.css";
import "@features/readings/ReadingList.css";
import { SearchInput } from '@features/readings/SearchInput';
import { ReadingContextProvider } from "@features/readings/context/ReadingContextProvider";
import { ReadingList } from "@features/readings/ReadingList";
import { Link } from "react-router-dom";

export function ReadingListPage() {
  return (
    <ReadingContextProvider>
      <main className="py-3">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="display-3 ps-3 ps-md-0 fw-semibold text-brand text-start">
            Lista de textos
          </h1>
          <div className="d-flex h-50 justify-content-between pe-3">
            <Link to="/admin/readings/create" className="btn btn-primary-brand-outline shadow d-flex align-items-center gap-1 h-50 flex-shrink-1 ">
                <i className="bi bi-plus-circle fs-4"></i>
                <span className="fs-4">Agregar lectura</span>
            </Link>
          </div>
        </div>
        <SearchInput />
        <article className="m-3" id="reading-container">
          <ReadingList />
        </article>
      </main>
    </ReadingContextProvider>
  );
}
