import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import toast from "react-hot-toast";
import { ValidationError } from "@interfaces/validation.error";

export function RegisterForm() {
  const { register } = useAuth()!;
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ email: "", username: "", password: "" }}
      onSubmit={async values => {
        try {
          await register(values.username, values.password, values.email);
          toast.success("¡Sesión iniciada correctamente!");
          navigate("/workspace/timer");
        } catch (err) {
          if (err instanceof ValidationError) {
            return toast.error(err?.message);
          }
          toast.error('Error desconocido. Contáctese con los desarrolladores del sitio');
          console.error(err);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="m-2">
          <label htmlFor="username">Usuario: </label>
          <Field
            type="text"
            name="username"
            className="form-control"
            required={true}
          />
          <label htmlFor="email">Correo electrónico </label>
          <Field
            type="email"
            name="email"
            className="form-control"
            required={true}
          />
          <label htmlFor="password">Contraseña: </label>
          <Field
            type="password"
            name="password"
            className="form-control"
            required={true}
          />
          <div className="form-small-text my-3 d-flex flex-wrap gap-1">
            <Link to="/login">¿Ya tiene una cuenta? Inicie sesión.</Link>
          </div>
          <button type="submit" disabled={isSubmitting} className="form-button w-100">
            Enviar
          </button>
        </Form>
      )}
    </Formik>
  );
}
