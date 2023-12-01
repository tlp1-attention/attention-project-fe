import { LoginForm } from "@features/auth/LoginForm";
import "./Login.css";
import "../Register.css";
import { GoogleSignIn } from "@features/federated/GoogleSignIn";

export default function LoginPage() {

  return (
    <main className="min-vh-100 fs-5 login-form-container d-flex justify-content-center align-items-center">
      <article className="border border-3 mx-lg-5 my-lg-2 d-flex flex-column flex-md-row rounded-2">
        <img
          src="./assets/bg-placeholder-login.png"
          alt=""
          className="img-fluid form-img"
        />
        <section className="mx-3 my-3 w-100 d-flex justify-content-center align-items-center flex-column">
          <h1 className="login-text display-1 fw-bold align-self-baseline">
            Inicio de sesión
          </h1>
          <LoginForm />
          <hr className="p-1 border border-1" />
          <GoogleSignIn />
        </section>
      </article>
    </main>
  );
}
