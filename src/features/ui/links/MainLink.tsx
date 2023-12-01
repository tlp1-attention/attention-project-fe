import { Link } from "react-router-dom";

export function MainLink() {
  return (
    <Link
      to="/index.html"
      className="logo-with-text w-100 border-3 border-top mt-4 d-flex justify-content-center gap-3 align-items-center"
    >
      <img src="/assets/logo-2.png" className="my-auto" alt="Logo Attention" />
    </Link>
  );
}
