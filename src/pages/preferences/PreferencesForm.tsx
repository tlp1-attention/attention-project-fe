import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import logo from "../../../public/assets/logo-2.png"
import "./PreferencesForm.css"
import { PreferencesAttributes } from '@interfaces/preferences'
import { useAuth } from '@features/auth/hooks/useAuth'
import { updateUserPreferences } from '@services/auth/users'
import toast from 'react-hot-toast'

const PreferencesForm = () => {
    const { token, refetchUser, user } = useAuth()!;
    const navigate = useNavigate()

    const [preferences, setPreferences] = useState<PreferencesAttributes>({
        subject: "",
        time_day: "",
        people: "",
        contact_type: "",
        contact: ""
    })

    useEffect(() => {
        if (!user?.preferences?.length) return;
        setPreferences(user?.preferences[0]);
    }, [user?.preferences]);

    const [errorsActive, setErrorsActive] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        setPreferences((pref) => ({
            ...pref,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!token) return;
        if (!errorsActive) setErrorsActive(true)

        if (!validateErrors) {
            try {
                await updateUserPreferences({
                    token,
                    preferences
                });
                await refetchUser();
                toast.success('Datos actualizados correctamente');
                setTimeout(() => {
                    navigate('/workspace/user/profile');
                }, 2000);
            } catch(err) {
                toast.error('Ocurrió un error al actualizar las preferencias.');
            }
        }

    }

    const errors = useMemo(() => {
        const formErrors: PreferencesAttributes = {
            subject: "",
            time_day: "",
            people: "",
            contact_type: "",
            contact: ""
        }
        if (!errorsActive) return formErrors;
        if (!preferences.subject.length) formErrors.subject = "Debes elegír una materia!"
        if (!preferences.time_day.length) formErrors.time_day = "Debes elegír un momento del día!"
        if (!preferences.people.length) formErrors.people = "Debes elegír que estas buscando!"
        if (!preferences.contact_type.length) formErrors.contact_type = "Debes elegír el tipo de contacto!"
        if (!preferences.contact.length) formErrors.contact = "Debes ingresar tus datos de contacto!"
        if (preferences.contact_type === "Numero Telefónico" && preferences.contact.length < 11) {
            formErrors.contact = "Debes agregar un numero telefonico valido"
        }
        if (preferences.contact_type === "Discord" && !preferences.contact.length) {
            formErrors.contact = "Debes agregar tu usuario de Discord!"
        }
        if (preferences.contact_type === "Slack" && !preferences.contact.length) {
            formErrors.contact = "Debes agregar tu usuario de Slack!"
        }

        return formErrors;
    }, [errorsActive, preferences])

    const validateErrors = useMemo(() => {
        return Object.values(errors).some(error => error.length > 0);
    }, [errors])

    const materias = [
        "Matemáticas",
        "Lenguaje",
        "Física",
        "Química",
        "Economía",
        "Geografía",
        "Estudios Sociales",
        "Informática"
    ]

    return (
        <form
            action=""
            className="d-flex flex-column border border-3 rounded-3 w-50 mt-5 mb-4 text-color bg-grey"
            id="formulario"
            onChange={handleChange}
            onSubmit={handleSubmit}
        >
            <h1 className="fs-1 m-3 purple align-self-center">Preferencias de Usuario</h1>
            <div className='d-flex justify-content-center w-100'>

                <div className="m-3 d-flex flex-column w-50">
                    <label className="form-label">¿Qué se le dificulta?</label>
                    <div>
                        <input type="radio" className="form-check-input" name="subject" value="" />
                        <span> Ninguna</span>
                    </div>
                    {
                        materias.map(subject => {
                            return (
                                <div>
                                    <input type="radio" className="form-check-input" name="subject" value={subject} />
                                    <span> {subject}</span>
                                </div>
                            )
                        })
                    }
                    <div>
                        {
                            errorsActive && errors.subject.length ?
                                (<p className='bg-danger text-white mt-4 ms-2 me-2 rounded p-1'>{errors.subject}</p>) : null
                        }
                    </div>
                </div>
                <div>
                    <div className="m-3">
                        <label className="form-label">
                            ¿En qué momento del día puede estudiar?
                        </label>
                        <select name="time_day" id="" className="form-select">
                            <option value="">Seleccione una opción</option>
                            <option>Día</option>
                            <option>Tarde</option>
                            <option>Noche</option>
                        </select>
                    </div>
                    <div>
                        {
                            errorsActive && errors.time_day.length ?
                                (<p className='bg-danger text-white ms-2 me-2 rounded p-1'>{errors.time_day}</p>) : null
                        }
                    </div>
                    <div className="m-3">
                        <label className="form-label"> ¿Qué le gustaría encontrar? </label>
                        <select name="people" className="form-select">
                            <option value="">Seleccione una opción</option>
                            <option>alguien que me acompañe al estudiar</option>
                            <option>despejar dudas</option>
                            <option>tutoría</option>
                        </select>
                    </div>
                    <div>
                        {
                            errorsActive && errors.people.length ?
                                (<p className='bg-danger text-white ms-2 me-2 rounded p-1'>{errors.people}</p>) : null
                        }
                    </div>
                    <div className="m-3 d-flex flex-column" id="contacts">
                        <label className="form-label"> ¿Qué forma de contacto utiliza? </label>
                        <div>
                            <input
                                type="radio"
                                className="form-check-input"
                                name="contact_type"
                                id="cel"
                                value="Numero Telefónico"
                                autoComplete='off'
                            />
                            <span> Numero Telefónico</span>
                        </div>
                        <div>
                            <input
                                type="radio"
                                className="form-check-input"
                                name="contact_type"
                                id="discord"
                                value="Discord"
                                autoComplete='off'
                            />
                            <span> Discord</span>
                        </div>
                        <div>
                            <input
                                type="radio"
                                className="form-check-input"
                                name="contact_type"
                                id="slack"
                                value="Slack"
                                autoComplete='off'
                            />
                            <span> Slack</span>
                        </div>
                        <div id="contact-input">
                            {
                                preferences.contact_type === "Numero Telefónico" ? (
                                    <input
                                        type="number"
                                        placeholder='000-0000-0000'
                                        className='w-100 form-control'
                                        name='contact'
                                        autoComplete='off'
                                    />
                                ) :
                                    preferences.contact_type === "Discord" || preferences.contact_type === "Slack" ? (
                                        <input
                                            placeholder={`@usuario de ${preferences.contact_type}`}
                                            className='w-100 form-control'
                                            name='contact'
                                            autoComplete='off'
                                        />
                                    ) : null
                            }
                        </div>
                    </div>
                    <div>
                        {
                            errorsActive && errors.contact.length ?
                                (<p className='bg-danger text-white ms-2 me-2 rounded p-1'>{errors.contact}</p>) : null
                        }
                    </div>
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

export default PreferencesForm