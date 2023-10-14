import { RegisterForm } from "@features/auth/RegisterForm";
import { Link } from "react-router-dom";

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
                    <section className="py-3 px-3 px-md-5 w-100 d-flex flex-column">
                        <h1 className="login-text display-1 fw-bold pe-auto align-self-baseline">Registro de usuario</h1>
                        <RegisterForm />
                        <Link
                            to="/index.html"
                            className="logo-with-text w-100 border-3 border-top mt-4 d-flex justify-content-center gap-3 align-items-center"
                        >
                            <img
                                src="/assets/logo-2.png"
                                className="my-auto"
                                alt="Logo Attention"
                            />
                        </Link>
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
