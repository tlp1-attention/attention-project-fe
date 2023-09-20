import { IUser } from '@interfaces/user'
import { Navbar } from 'react-bootstrap'

export function Header({ user }: { user?: IUser }) {
    return (
        <>
            <header>
                <Navbar className="nav-custom sticky-top">
                    <input type="checkbox" id="check" />
                    <label htmlFor="check" className="check">
                        <i className="fas fa-bars"></i>
                    </label>
                    <a href="#" className="enlace me-auto">
                        <img
                            src="/assets/attention-logo.png"
                            alt="imagen logo"
                            className="logo"
                        />
                        <img
                            src="./assets/logo-1.png"
                            alt="logo pequeño"
                            className="logo-1"
                        />
                    </a>
                    <ul className="">
                        <li>
                            <a href="#" className="text-decoration-none">
                                Contacto
                            </a>
                        </li>
                        <SignButton signedIn={!!user} />
                    </ul>
                </Navbar>
            </header>
        </>
    )
}

function SignButton({ signedIn }: { signedIn: boolean }) {
    if (signedIn) {
        return (
            <>
                <li>
                    <a
                        href=""
                        className="bi bi-door-oopen text-decoration-none"
                    >
                        Cerrar sesión
                    </a>
                </li>
            </>
        )
    }
    return (
        <>
            <li>
                <a href="./login.html" className="text-decoration-none">
                    Iniciar sesión
                </a>
            </li>
            <li>
                <a
                    href="./register.html"
                    className="active text-decoration-none"
                >
                    Registrate
                </a>
            </li>
        </>
    )
}
