import { useSearchParams } from "react-router-dom";
import "./SearchBar.css";
import { debounce } from "@utils/debounce";

export function SearchInput() {
  const [, setParams] = useSearchParams();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setParams({ q: e.target.value });
  };

  const handleSearch = debounce<React.ChangeEvent<HTMLInputElement>>(
    handleChange,
    700
  );

  return (
    <div className="w-100 m-2 p-2 search-bar fs-2">
      <input
        type="text"
        placeholder="¡Busca algún texto que coincida con tus gustos!"
        className="form-control fs-4"
        onChange={handleSearch}
      />
    </div>
  );
}
