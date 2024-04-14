import { ReadingCreationForm } from "./ReadingCreationForm";
import { ReadingCreationContextProvider } from "./context/ReadingCreationContext";

export function ReadingCreationPanel() {
    return (
        <ReadingCreationContextProvider>
            <h1 className="display-4 ps-3 ps-md-0 py-2 fw-semibold text-brand text-start">
                Añadir una lectura.
            </h1>
            <div className="w-100 p-0 px-md-3 px-lg-5">
                <ReadingCreationForm />
            </div>
        </ReadingCreationContextProvider>
    );
}