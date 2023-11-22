import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { IUser } from '../../interfaces/user'
import Swt from "sweetalert2"
import logo from "../../../public/assets/logo-2.png"

const UserDataForm = () => {

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
            .then(res => setUserData(res))
            .catch(err => console.error(err))
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        const newData = {
            ...userData,
            [e.target.name]: e.target.value
        }
        console.log(newData)
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
                .then((res) => {
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

    const regExp = {
        email: /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
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

    return (
        <form
            action=""
            className="d-flex flex-column border border-3 rounded-3 w-50 mt-5 mb-4 text-color bg-grey"
            id="formulario"
            onChange={handleChange}
            onSubmit={handleSubmit}
        >
            <h1 className="fs-1 m-3 purple align-self-center">Datos de Usuario</h1>
            <div className='d-flex justify-content-center align-self-center flex-column w-75'>
                <div className="m-3">
                    <label className="form-label">
                        Nombre de Usuario
                    </label>
                    <input name="name" className="form-control" value={userData.hasOwnProperty("name") ? userData.name : ""} />
                </div>
                <div>
                    {
                        errorsActive && errors.name.length ?
                            (<p className="bg-danger text-white ms-2 me-2 rounded p-1">{errors.name}</p>) : null
                    }
                </div>
                <div className="m-3">
                    <label className="form-label">Ocupación</label>
                    <input name="ocupation" className="form-control" value={userData.hasOwnProperty("ocupation") ? userData.ocupation : ""} />
                </div>
                <div>
                    {
                        errorsActive && errors.ocupation.length ?
                            (<p className="bg-danger text-white ms-2 me-2 rounded p-1">{errors.ocupation}</p>) : null
                    }
                </div>
                <div className="m-3">
                    <label className="form-label">Breve descripción de su problema</label>
                    <input type="text" name="problem" className='form-control' value={userData.hasOwnProperty("problem") ? userData.problem : ""} />
                </div>
                <div>
                    {
                        errorsActive && errors.description.length ?
                            (<p className="bg-danger text-white ms-2 me-2 rounded p-1">{errors.description}</p>) : null
                    }
                </div>
                <div className="m-3">
                    <label className="form-label">Email</label>
                    <input type="text" name="email" className='form-control' value={userData.hasOwnProperty("email") ? userData.email : ""} />
                </div>
                <div>
                    {
                        errorsActive && errors.email.length ?
                            (<p className="bg-danger text-white ms-2 me-2 rounded p-1">{errors.email}</p>) : null
                    }
                </div>
            </div>
            <input
                type="submit"
                className="btn bg-purple text-white m-3"
                value="Submit"
            />
            <div className="logo-with-text w-100 border-3 border-top mt-4 d-flex justify-content-center gap-3 align-items-center">
                <img src={logo} className="my-auto" alt="Logo Attention" />
            </div>
        </form>
    )
}

export default UserDataForm