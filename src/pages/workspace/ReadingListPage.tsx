import "@features/readings/Reading.css";
import "@features/readings/ReadingList.css";
import { SearchInput } from '@features/readings/SearchInput';
import { ReadingContextProvider } from "@features/readings/context/ReadingContextProvider";
import { ReadingList } from "@features/readings/ReadingList";

export function ReadingListPage() {
  return (
    <ReadingContextProvider>
      <main className="py-3">
        <h1 className="display-3 ps-3 ps-md-0 fw-semibold text-brand text-start">
          Lista de textos
        </h1>
        <SearchInput />
        <article className="m-3" id="reading-container">
          <ReadingList />
        </article>
      </main>
    </ReadingContextProvider>
  );
}
