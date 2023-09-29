import { IUser } from '@interfaces/user'
import { BrandLogo } from '@features/ui/logo/BrandLogo';
import './Header.css'
import Navbar from 'react-bootstrap/Navbar'
import { Nav } from 'react-bootstrap'

export function Header({ user }: { user?: IUser }) {
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
                            <SignButton signedIn={!!user} />
                        </ul>
                    </Nav>
                </Navbar>
            </header>
        </>
    )
}

function ToggleIcon() {
    return (
        <>
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="check">
                <i className="toggle-icon bi bi-list"></i>
            </label>
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
                <a href="/login" className="text-decoration-none">
                    Iniciar sesión
                </a>
            </li>
            <li>
                <a
                    href="/register"
                    className="active text-decoration-none"
                >
                    Registrate
                </a>
            </li>
        </>
    )
}
