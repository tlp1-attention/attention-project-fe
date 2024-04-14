import { BackLink } from "@features/ui/links/BackLink";
import { ReadingCreationForm } from "./ReadingCreationForm";
import { ReadingCreationContextProvider } from "./context/ReadingCreationContext";

export function ReadingCreationPanel() {
    return (
        <ReadingCreationContextProvider>
            <div className="d-flex w-100 justify-content-between align-items-center">
                <h1 className="display-4 ps-3 ps-md-0 py-2 fw-semibold text-brand text-start flex-grow-1">
                    Añadir una lectura.
                </h1>
                <div className="d-flex w-25 flex-shrink-1">
                    <BackLink link="/admin/readings" />
                </div>
            </div>
            <div className="w-100 p-0 px-md-3 px-lg-5">
                <ReadingCreationForm />
            </div>
        </ReadingCreationContextProvider>
    );
}