import { BrandLogo } from "@features/ui/logo/BrandLogo";
import "./Header.css";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";

export function Header({
  isAuthenticated,
  logout
}: {
  isAuthenticated: boolean;
  logout: () => void;
}) {
  return (
    <>
      <header className="d-flex align-items-center">
        <Navbar expand="lg" className="custom-navbar sticky-top">
          <BrandLogo />
          <Nav>
            <ToggleIcon />
            <ul className="pt-3">
              <li>
                <a href="#" className="text-decoration-none">
                  Contacto
                </a>
              </li>
              <SignButton signedIn={isAuthenticated} logout={logout} />
            </ul>
          </Nav>
        </Navbar>
      </header>
    </>
  );
}

function ToggleIcon() {
  return (
    <>
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="check">
        <i className="toggle-icon bi bi-list"></i>
      </label>
    </>
  );
}

function SignButton({
  signedIn,
  logout
}: {
  signedIn: boolean;
  logout: () => void;
}) {
  if (signedIn) {
    return (
      <li>
        <a
          onClick={() => logout()}
          className="bi bi-door-open text-decoration-none cursor-pointer"
        >
          Cerrar sesión
        </a>
      </li>
    );
  }
  return (
    <>
      <li>
        <a href="/login" className="text-decoration-none">
          Iniciar sesión
        </a>
      </li>
      <li>
        <a href="/register" className="active text-decoration-none">
          Registrate
        </a>
      </li>
    </>
  );
}
