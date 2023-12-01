import { LoginForm } from "@features/auth/LoginForm";
import "./Login.css";
import "../Register.css";
import { GoogleSignIn } from "@features/federated/GoogleSignIn";
import { BackLink } from "@features/ui/links/BackLink";

export default function LoginPage() {

  return (
    <main className="min-vh-100 fs-5 login-form-container d-flex justify-content-center align-items-center">
      <article className="border border-3 mx-lg-5 my-lg-2 d-flex flex-column flex-md-row rounded-2">
        <img
          src="./assets/bg-placeholder-login.png"
          alt=""
          className="img-fluid form-img"
        />
        <section className="py-3 px-3 px-md-5 w-100 d-flex flex-column">
            <div className="d-flex align-items-center justify-content-between">
              <h1 className="login-text display-1 fw-bold pe-auto align-self-baseline">
                Inicio de sesión
              </h1>
              <BackLink />
            </div> 
            <LoginForm />
            <hr />
            <GoogleSignIn />
          </section>
      </article>
    </main>
  );
}
