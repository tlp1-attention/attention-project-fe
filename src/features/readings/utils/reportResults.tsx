import { Alert } from "@features/ui/alert/Alert";
import { ResultTable } from "../quiz/ResultTable";

type ReportResultParams = {
  total: number;
  right: number;
  onRetry: () => void;
  onBack: () => void;
};

export function reportResultTable({
    total,
    right,
    onRetry,
    onBack
  }: ReportResultParams) {
    Alert.fire({
      title: <h1>Puntajes</h1>,
      html: <ResultTable total={total} right={right} />,
      confirmButtonText: "Volver a intentar",
      cancelButtonText: "Volver a la lectura",
      showCancelButton: true
    }).then(result => {
      if (result.isConfirmed) onRetry();
      else onBack();
    });
}