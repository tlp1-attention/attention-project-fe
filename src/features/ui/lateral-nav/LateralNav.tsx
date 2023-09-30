import { ComponentProps, useReducer } from 'react'
import { BrandLogoSmall } from '../logo/BrandLogoSmall'
import './LateralNav.css'

const ROUTES = [
    {
        text: 'Inicio',
        icon: 'home',
        url: '/'
    },
    {
        text: 'Lectura',
        icon: 'book',
        url: '/readings'
    },
    {
        text: 'Aprender Jugando',
        icon: 'calendar',
        url: '/calendar'
    },
    {
        text: 'Temporizador',
        icon: 'clock',
        url: '/timer'
    },
    {
        text: 'Espacio colaborativo',
        icon: 'columns',
        url: '/colaboration'
    }
];

export function LateralNav() {
    const [isOpen, toggle] = useReducer(opened => !opened, false);

    return (
        <>
            <header className="lateral-bar">
                <button className="bg-transparent border-0 position-relative mb-5 mb-sm-0 d-sm-none slide-button">
                    <BrandLogoSmall className="m-4" onClick={toggle} />
                </button>
                <nav
                    className={`position-fixed left-0 min-vh-100 z-3 ${isOpen ? 'open' : ''}`}
                    onClick={toggle}
                >
                    <ul className="list-unstyled slide-button">
                        <li className="d-flex justify-content-between align-items-center">
                            <button className="bg-transparent border-0">
                                <a
                                    href="#"
                                    className="logo text-decoration-none"
                                >
                                    <img
                                        src="/assets/logo-1.png"
                                        alt="logo pequeño"
                                        id="logo-sw"
                                    />
                                    <span className="nav-item text-normal-case">
                                        Nombre de usuario
                                    </span>
                                </a>
                            </button>
                        </li>
                        {
                            ROUTES.map(route => {
                                return <SlideButton {...route} />
                            })
                        }
                        <li>
                            <a
                                href="/log-out"
                                id="a-1"
                                className="logout text-decoration-none"
                            >
                                <i className="fas fa-user" />
                                <span className="nav-item">CERRAR SESIÓN</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

type SlideButtonProps = {
    text: string;
    icon: string;
    url: string;
} & Exclude<ComponentProps<"a">, "className">;

function SlideButton({
    text,
    icon,
    url,
    ...rest
}: SlideButtonProps) {
    return (
        <li>
            <a href={url} id="a-1" className="text-decoration-none" {...rest}>
                <i className={`fas fa-${icon}`} />
                <span className="nav-item">{ text.toUpperCase() }</span>
            </a>
        </li>
    )
}
