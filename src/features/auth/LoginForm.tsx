import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useAuth } from "./hooks/useAuth";
import toast from "react-hot-toast";
import { ValidationError } from "@interfaces/validation.error";
import { useSocketContext } from "@features/real-time/context/useSocketContext";

export function LoginForm() {
  const { connect } = useSocketContext()!;
  const { token, user, hasFetchedUserInfo } = useAuth()!;
  const { login, isAuthenticated, isAdmin } = useAuth()!;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user || !hasFetchedUserInfo) return;
    navigate(isAdmin ? '/admin/readings' : '/workspace/timer');
  }, [isAdmin, isAuthenticated, navigate]);

  useEffect(() => {
    if (!token) return;
    connect({
      'Authorization': token
    });
  }, [token, connect]);

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={async values => {
        try {
          await login(values.username, values.password);
          toast.success('¡Sesión iniciada correctamente!');
        } catch (err) {
          if (
            err instanceof ValidationError
          ) {
            return toast.error(err?.message);
          } 
          toast.error('Error desconocido. Contacte a los desarrolladores del sitio.');
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
