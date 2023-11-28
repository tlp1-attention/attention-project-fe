import { useNavigate } from 'react-router-dom'
import profile from "../../../public/assets/profileDefault.jpg"
import "./UserProfile.css"
import { useAuth } from '@features/auth/hooks/useAuth'
import { FullSizeSpinner } from '@features/ui/spinner/Spinner'
import { FormEvent } from 'react'
import { updateUserProfilePicture } from '@services/auth/users'

const UserProfile = () => {
    const { user, token, refetchUser } = useAuth()!;
    const navigate = useNavigate()

    const handleClick = (route: string) => {
        navigate("/workspace/user" + route)
    }

    const handlePictureSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!e.currentTarget || !token) return;
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        await updateUserProfilePicture({
            picture: formData,
            token
        });
        refetchUser();
    }

    return (
        <div className="container ps-5">
            {
                user ? (
                    <div className="d-flex flex-column">
                        <div className="d-flex align-items-center w-100">
                            <div>
                                <img src={user.profileImage || profile} className="profile rounded-circle mt-4 mb-4 ms-5" alt="foto" />
                                <form className="mb-3" onChange={handlePictureSubmit}>
                                    <label htmlFor="formFile" className="form-label visually-hidden">Modificar foto de perfil: </label>
                                    <input className="form-control" type="file" id="formFile" name="profileImage" accept="image/png, image/jpeg" />
                                </form>
                            </div>
                            <div className="ms-5 mt-5 text-color">
                                <h2 className="fw-bold purple mb-3" id="name">{user.name}</h2>
                                <h4 id="description">{user.ocupation}</h4>
                                <h4 className="lead lead-size" id="email">{user.email}</h4>
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
                            <p id="subject">{user.preferences?.length ? user.preferences[0].subject : "No especificado!"}</p>
                            <hr />
                            <legend>Puede estudiar:</legend>
                            <p id="time_day">{user.preferences?.length ? user.preferences[0].time_day : "No especificado!"}</p>
                            <hr />
                            <legend>Busca</legend>
                            <p id="people">{user.preferences?.length ? user.preferences[0].people : "No especificado!"}</p>
                            <hr />
                            <legend>Puede contactarse a traves de:</legend>
                            <p id="contact">{user.preferences?.length ? `${user.preferences[0].contact_type}: ${user.preferences[0].contact}` : "No especificado!"}</p>
                        </div>
                    </div>
                ) : <FullSizeSpinner />
            }

        </div>
    )
}

export default UserProfile