import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { IUser } from '@interfaces/user'
import Swt from "sweetalert2"


export const useForm = () => {

    const navigate = useNavigate()

    const [userData, setUserData] = useState<Omit<IUser, "id">>({
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
                .then(() => {
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
        const formErrors = {
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
    }, [userData, regExp.email])

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