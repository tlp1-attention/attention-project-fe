import { useReducer } from "react";
import { BrandLogoSmall } from "../logo/BrandLogoSmall";
import "./LateralNav.css";
import { Link, type LinkProps } from "react-router-dom";
import { useAuth } from "@features/auth/hooks/useAuth";

const ROUTES = [
  {
    text: "Inicio",
    icon: "home",
    url: "/",
  },
  {
    text: "Lectura",
    icon: "book",
    url: "./readings",
  },
  {
    text: "Temporizador",
    icon: "clock",
    url: "./timer",
  },
  {
    text: 'Eventos',
    icon: 'calendar',
    url: './events'
  },
  {
    text: "Espacio colaborativo",
    icon: "columns",
    url: "/colaboration",
  },
  {
    text: 'Reportes',
    icon: "columns",
    url: "./report"
  }
];

export function LateralNav() {
  const [isOpen, toggle] = useReducer((opened) => !opened, false);
  const { user, logout } = useAuth()!;

  return (
    <>
      <header className="lateral-bar">
        <button className="bg-transparent border-0 position-relative mb-5 mb-sm-0 d-sm-none slide-button">
          <BrandLogoSmall className="m-4 d-block" onClick={toggle} />
        </button>
        <nav
          className={`position-fixed left-0 min-vh-100 z-3 ${
            isOpen ? "open" : ""
          }`}
          onClick={toggle}
        >
          <ul className="list-unstyled slide-button">
            <li className="d-flex justify-content-between align-items-center">
              <button className="bg-transparent border-0">
                <a href="#" className="logo text-decoration-none">
                  <BrandLogoSmall className="d-block" />
                  <span className="nav-item text-normal-case">
                    {user?.name}
                  </span>
                </a>
              </button>
            </li>
            {ROUTES.map(({ text, icon, url }) => {
              return <SlideButton text={text} icon={icon} to={url} key={url}/>;
            })}
            <li>
              <LogOut logout={logout} />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

type SlideButtonProps = {
  text: string;
  icon: string;
} & Exclude<LinkProps, "className">;

function SlideButton({ text, icon, to, ...rest }: SlideButtonProps) {
  return (
    <li>
      <Link to={to} id="a-1" className="text-decoration-none" {...rest}>
        <i className={`fas fa-${icon}`} />
        <span className="nav-item">{text.toUpperCase()}</span>
      </Link>
    </li>
  );
}

function LogOut({ logout }: { logout: () => void }) {
  return (
    <a id="a-1" onClick={logout} className="logout text-decoration-none cursor-pointer">
      <i className="fas fa-user" />
      <span className="nav-item">CERRAR SESIÓN</span>
    </a>
  );
}
