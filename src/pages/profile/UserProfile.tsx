import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import profile from "../../../public/assets/profileDefault.jpg"
import "./UserProfile.css"
import { IUser } from '@interfaces/user'

const UserProfile = () => {

    const navigate = useNavigate()

    const [userData, setUserData] = useState<IUser>({
        name: '',
        ocupation: '',
        email: '',
        preferences: [],
    })

    useEffect(() => {
        const token = localStorage.getItem("token")

        fetch("http://localhost:4000/user/info", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": token ?? ''
            }
        })
            .then(res => res.json())
            .then(res => {
                setUserData(res)
            })
    }, [])


    const handleClick = (route: string) => {
        navigate("/user" + route)
    }

    return (
        <div className="container">
            {
                userData.hasOwnProperty("name") ? (
                    <div className="d-flex flex-column">
                        <div className="d-flex align-items-center w-100">
                            <img src={profile} className="profile rounded-circle mt-4 mb-4 ms-5" alt="foto" />
                            <div className="ms-5 mt-5 text-color">
                                <h2 className="fw-bold purple mb-3" id="name">{userData.name}</h2>
                                <h4 id="description">{userData.ocupation}</h4>
                                <h4 className="lead lead-size" id="email">{userData.email}</h4>
                            </div>
                            <div className='ms-5'>
                                <div className='dropdown btn-size ms-5'>
                                    <i
                                        className="bi bi-pencil w-75 edit"
                                        id='dropdownMenuButton1'
                                        data-bs-toggle='dropdown'
                                        aria-expanded='false'
                                    ></i>

                                    <ul className='dropdown-menu w-75 overflow-hidden' aria-labelledby='dropdownMenuButton1'>
                                        <li>
                                            <a
                                                className='dropdown-item'
                                                onClick={() => handleClick("/userData")}
                                            >Datos de usuario</a>
                                        </li>
                                        <li>
                                            <a
                                                className='dropdown-item'
                                                onClick={() => handleClick("/preferences")}
                                            >Preferencias</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="text-color border p-4 border-3 rounded-2 bg-grey">
                            <legend>Se le dificulta: </legend>
                            <p id="subject">{userData.preferences?.length ? userData.preferences[0].subject : "No especificado!"}</p>
                            <hr />
                            <legend>Puede estudiar:</legend>
                            <p id="time_day">{userData.preferences?.length ? userData.preferences[0].time_day : "No especificado!"}</p>
                            <hr />
                            <legend>Busca</legend>
                            <p id="people">{userData.preferences?.length ? userData.preferences[0].people : "No especificado!"}</p>
                            <hr />
                            <legend>Puede contactarse a traves de:</legend>
                            <p id="contact">{userData.preferences?.length ? `${userData.preferences[0].contact_type}: ${userData.preferences[0].contact}` : "No especificado!"}</p>
                        </div>
                    </div>
                ) : <div>Cargando...</div>
            }

        </div>
    )
}

export default UserProfile