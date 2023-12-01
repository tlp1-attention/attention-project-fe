import { RegisterForm } from "@features/auth/RegisterForm";
import { GoogleSignIn } from "@features/federated/GoogleSignIn";

export function Register() {
  return (
    <>
      <main className="min-vh-100 fs-5 d-flex justify-content-center align-items-center">
        <article className="border border-3 mx-lg-5 my-lg-2 d-flex flex-column flex-md-row rounded-2">
          <img
            src="./assets/bg-placeholder-login.png"
            alt=""
            className="form-img"
          />
          <section className="py-3 px-3 px-md-5 w-100 d-flex flex-column">
            <h1 className="login-text display-1 fw-bold pe-auto align-self-baseline">
              Registro de usuario
            </h1>
            <RegisterForm />
            <hr />
            <GoogleSignIn />
          </section>
        </article>
      </main>
    </>
  );
}
