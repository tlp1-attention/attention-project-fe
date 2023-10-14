import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import toast from "react-hot-toast";
import { ValidationError } from "@interfaces/validation.error";
import { useEffect } from "react";

export function LoginForm() {
  const { login, isAuthenticated } = useAuth()!;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) return;
    navigate('/workspace/timer');
  })


  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={async values => {
        try {
          await login(values.username, values.password);
          toast.success('¡Sesión iniciada correctamente!')
          navigate('/workspace/timer');
        } catch (err) {
          if (
            err instanceof ValidationError
          ) {
            toast.error(err?.message);
          } 
          console.error(err);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="m-2 form w-100">
          <label htmlFor="username" className="label">
            Usuario:{" "}
          </label>
          <Field type="text" name="username" className="form-control" />
          <label htmlFor="password" className="label">
            Contraseña:{" "}
          </label>
          <Field type="password" name="password" className="form-control" />
          <div className="form-small-text d-flex flex-wrap gap-1">
            <a href="/reset-password.html">¿Olvidó su contraseña?</a>
            <Link to="/register">¿Aún no tiene una cuenta? Regístrese.</Link>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="form-button w-100"
          >
            Enviar
          </button>
        </Form>
      )}
    </Formik>
  );
}
