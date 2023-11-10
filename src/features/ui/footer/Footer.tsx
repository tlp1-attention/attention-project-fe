export function Footer() {
    return (
        <footer className="py-2 py-md-2 mt-5 bg-body-tertiary ab">
            <div className="container py-2 py-md-5 px-4 px-md-3 text-body-secondary">
                <div className="row">
                    <div className="col-lg-3 mb-3">
                        <a
                            className="d-inline-flex align-items-center mb-2 text-body-emphasis text-decoration-none"
                            href="/"
                            aria-label="Bootstrap"
                        >
                            <img
                                src="/assets/logo-1.png"
                                alt="logo pequeño"
                                className="logo-f"
                            />
                            <span className="fs-5">Attention</span>
                        </a>
                        <ul className="list-unstyled small">
                            <li className="mb-2">
                                Diseñado y construido con todo el amor del mundo
                                por el{' '}
                                <a
                                    className="text-decoration-none af"
                                    href="/docs/5.3/about/team/"
                                >
                                    Attention team.
                                </a>
                            </li>
                            <li className="mb-2">© Copyright 2023</li>
                        </ul>
                    </div>
                    <div className="col-6 col-lg-2 offset-lg-1 mb-3">
                        <h5>Links</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a className="text-decoration-none af" href="/">
                                    Inicio
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-6 col-lg-2 mb-3">
                        <h5>Contacto</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a
                                    className="text-decoration-none af"
                                    href="/docs/5.3/getting-started/"
                                >
                                    e-mail
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-6 col-lg-2 mb-3">
                        <h5>Ejercicios</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a
                                    className="text-decoration-none af"
                                    href="https://github.com/twbs/bootstrap"
                                >
                                    Lectura 5
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-6 col-lg-2 mb-3">
                        <h5>Juegos</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a
                                    className="text-decoration-none af"
                                    href="https://github.com/twbs/bootstrap/issues"
                                >
                                    Mentales
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
