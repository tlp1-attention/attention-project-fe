import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AppRouter } from "@features/routes/AppRouter";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppRouter />
);
