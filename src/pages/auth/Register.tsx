export function Register() {
    return (
        <>
            <main className="min-vh-100 fs-5 h-100 d-flex justify-content-center align-items-center">
                <article className="border border-3 mx-lg-5 my-lg-2 d-flex flex-column flex-md-row rounded-2">
                    <img
                        src="./assets/bg-placeholder-login.png"
                        alt=""
                        className="form-img"
                    />
                    <section className="py-3 px-3 px-md-5 w-100">
                        <h1 className="login-text display-1 fw-bold pe-auto text-center text-md-start">Registro de usuario</h1>
                        <form className="m-2">
                            <label htmlFor="username">Usuario: </label>
                            <input
                                type="text"
                                name="username"
                                className="form-control"
                                required={true}
                            />
                            <label htmlFor="email">Correo electrónico </label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                required={true}
                            />
                            <label htmlFor="password">Contraseña: </label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                required={true}
                            />
                            <div className="form-small-text my-3 d-flex flex-wrap gap-1">
                                <a href="./login.html">
                                    ¿Ya tiene una cuenta? Inicie sesión.
                                </a>
                            </div>
                            <button type="submit" className="form-button w-100">
                                Enviar
                            </button>
                        </form>
                        <a
                            href="/index.html"
                            className="logo-with-text w-100 border-3 border-top mt-4 d-flex justify-content-center gap-3 align-items-center"
                        >
                            <img
                                src="/assets/logo-2.png"
                                className="my-auto"
                                alt="Logo Attention"
                            />
                        </a>
                        <div className="toast-container position-fixed bottom-0 end-0 p-3 text-bg-warning-subtle">
                            <div className="toast fs-5">
                                <hgroup className="toast-header text-bg-info-subtle">
                                    <i className="m-2 bi bi-exclamation-circle text-danger" />
                                    <strong className="me-auto">
                                        Error al registrarte:
                                    </strong>
                                    <button
                                        className="btn-close"
                                        data-bs-dismiss="toast"
                                    >
                                        <i className="bi bi-close" />
                                    </button>
                                </hgroup>
                                <p
                                    className="toast-body"
                                    id="error-message"
                                ></p>
                            </div>
                        </div>
                    </section>
                </article>
            </main>
        </>
    )
}
