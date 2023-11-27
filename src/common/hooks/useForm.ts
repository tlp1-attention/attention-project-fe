<<<<<<< HEAD:src/hooks/useForm.ts
import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { IUser } from '../interfaces/user.ts'
import Swt from "sweetalert2"


export const useForm = () => {

    const navigate = useNavigate()

    const [userData, setUserData] = useState<IUser>({
        name: "",
        ocupation: "",
        email: "",
        description: "",
    })

    const [errorsActive, setErrorsActive] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")

        fetch("http://localhost:4000/user/info", {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "authorization": token ?? ''
            }
        })
            .then(res => res.json())
            .then(res => {
                setUserData({
                    name: res.name ?? "",
                    ocupation: res.ocupation ?? "",
                    email: res.email ?? "",
                    description: res.description ?? "",
                })
            })
            .catch(err => console.error(err))
    }, [])

    const regExp = {
        email: /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    }

    const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        const newData = {
            ...userData,
            [e.target.name]: e.target.value
        }
        setUserData(newData)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!errorsActive) setErrorsActive(true)

        if (!validateErrors) {
            const token = localStorage.getItem("token")

            fetch("http://localhost:4000/user/info", {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "authorization": token ?? ''
                },
                body: JSON.stringify(userData),
            })
                .then(res => res.json())
                .then((_res) => {
                    Swt.fire({
                        icon: "success",
                        title: "Datos actualizado correctamente!"
                    }),
                        setTimeout(() => {
                            navigate("/user/profile")
                        }, 2000);
                })
        }

    }

    const errors = useMemo(() => {
        let formErrors = {
            name: "",
            ocupation: "",
            email: "",
            description: "",
        }
        if (!userData.name.length) formErrors.name = "El nombre de usuario no debe estár vacío!"
        else if (userData.name.length < 8) formErrors.name = "El nombre de usuario es demasiado corto!"
        else if (userData.name.length > 40) formErrors.name = "El nombre de usuario es demasiado largo!"
        if (!userData.ocupation.length) formErrors.ocupation = "Debes agregar tu ocupación!"
        if (!userData.email.length) formErrors.email = "Tu email no puede estár vacío!"
        else if (!regExp.email.test(userData.email)) formErrors.email = "Debe ser un email valido!"

        return formErrors;
    }, [userData, errorsActive])

    const validateErrors = useMemo(() => {
        return Object.values(errors).some(error => error.length > 0);
    }, [errors])

    return {
        handleChange,
        handleSubmit,
        errors,
        errorsActive,
        userData,
    }
}
=======
import { ChangeEventHandler, useState } from "react";

type UseFormValue = [
    inputData: Record<string, FormDataEntryValue>,
    { 
        handleChange: React.ChangeEventHandler,
        resetInputs: () => void
    }
];

export function useForm<T extends Record<string, FormDataEntryValue>>(initialValue: T): UseFormValue {
  const [inputData, setInputData] = useState<
    T
  >(initialValue);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setInputData({
      ...inputData,
      [evt.target.name]: evt.target.value
    })
  };

  const resetInputs = () => setInputData(previousValues => {
    const newValue: T = {} as T;
    for (const key of Object.keys(previousValues)) {
      (newValue[key as keyof typeof newValue] as FormDataEntryValue) = '';
    }
    return newValue;
  });

  return [
    inputData,
    {
      handleChange,
      resetInputs
    }
  ];
}
>>>>>>> develop-dante-benitez-refactor:src/common/hooks/useForm.ts
