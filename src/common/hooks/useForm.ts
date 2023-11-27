import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "@interfaces/user.ts";
import toast from "react-hot-toast";
import { useAuth } from "@features/auth/hooks/useAuth";
import { updateUserInfo } from "@services/auth/users";
import { ValidationError } from "@interfaces/validation.error";

export const useForm = () => {
  const { token, user } = useAuth()!;
  const navigate = useNavigate();

  const [userData, setUserData] = useState<IUser | undefined>(user);

  // Sync form data with user fetched data
  useEffect(() => {
    setUserData(user);
  }, [user]);

  const [errorsActive, setErrorsActive] = useState(false);

  const regExp = {
    email: /^(([^<>()[\]\\.,;:\s@”]+(\.[^<>()[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
  };

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    if (!userData) return;
    const newData = {
      ...userData,
      [e.target.name]: e.target.value
    };
    setUserData(newData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!errorsActive) setErrorsActive(true);

    if (!validateErrors) {
      /*
      fetch("http://localhost:4000/user/info", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: token ?? ""
        },
        body: JSON.stringify(userData)
      })
        .then(res => res.json())
        .then(() => {
          toast.success("Datos actualizado correctamente!");
          setTimeout(() => {
            navigate("/user/profile");
          }, 2000);
        }); */
      try {
        if (!token || !userData) return;
        await updateUserInfo({ token, userData });
        navigate('/workspace/user/profile');
      } catch(err) {
        if (err instanceof ValidationError) {
          return toast.error(err.message);
        }
        return toast.error('Error desconocido al actualizar datos de usuario');
      }
    }
  };

  const errors = useMemo(() => {
    const formErrors = {
      name: "",
      ocupation: "",
      email: "",
      description: ""
    };
    if (!userData) return formErrors;
    if (!userData.name.length)
      formErrors.name = "El nombre de usuario no debe estár vacío!";
    else if (userData.name.length < 8)
      formErrors.name = "El nombre de usuario es demasiado corto!";
    else if (userData.name.length > 40)
      formErrors.name = "El nombre de usuario es demasiado largo!";
    if (!userData.ocupation.length)
      formErrors.ocupation = "Debes agregar tu ocupación!";
    if (!userData.email.length)
      formErrors.email = "Tu email no puede estár vacío!";
    else if (!regExp.email.test(userData.email))
      formErrors.email = "Debe ser un email valido!";

    return formErrors;
  }, [userData, regExp.email]);

  const validateErrors = useMemo(() => {
    return Object.values(errors).some(error => error.length > 0);
  }, [errors]);

  return {
    handleChange,
    handleSubmit,
    errors,
    errorsActive,
    userData
  };
};
