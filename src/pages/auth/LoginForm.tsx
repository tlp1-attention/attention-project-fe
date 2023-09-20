import './Login.css'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginForm() {
    const navigate = useNavigate();

    return (
        <main className="min-vh-100 fs-5 login-form-container d-flex justify-content-center align-items-center">
            <article className="border border-3 mx-lg-5 my-lg-2 d-flex flex-column flex-md-row rounded-2">
                <img
                    src="./assets/bg-placeholder-login.png"
                    alt=""
                    className="img-fluid form-img"
                />
                <section className="mx-3 my-3 max-w-50 d-flex justify-content-center align-items-center flex-column ">
                    <h1 className="login-text display-1 fw-bold align-self-baseline">Inicio de sesión</h1>
                    <form
                        className="m-2 form w-100"
                        method="POST"
                        action="/login"
                    >
                        <label htmlFor="username" className="label">
                            Usuario:{' '}
                        </label>
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                        />
                        <label htmlFor="password" className="label">
                            Contraseña:{' '}
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                        />
                        <div className="form-small-text d-flex flex-wrap gap-1">
                            <a href="/reset-password.html">
                                ¿Olvidó su contraseña?
                            </a>
                            <Link to="/register">
                                ¿Aún no tiene una cuenta? Regístrese.
                            </Link>
                        </div>
                        <button type="submit" onClick={() => navigate('/workspace')} className="form-button w-100">
                            Enviar
                        </button>
                    </form>
                    <Link
                        to="/"
                        className="border-3 border-top mt-4 d-flex justify-content-center gap-3 align-items-center"
                    >
                        <img
                            src="/assets/logo-2.png"
                            className="max-w-50 my-auto"
                            alt="Logo Attention"
                        />
                    </Link>
                </section>
            </article>
        </main>
    )
}
