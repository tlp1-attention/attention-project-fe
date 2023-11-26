import logo from "../../../public/assets/logo-2.png"
import { useForm } from "./hook/useForm"
import "./UserDataForm.css"

const UserDataForm = () => {

    const {
        userData,
        handleChange,
        handleSubmit,
        errorsActive,
        errors
    } = useForm()

    return (
        <form
            action=""
            className="d-flex flex-column border border-3 rounded-3 width-form mt-5 mb-4 text-color bg-grey"
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
                    <input autoComplete="off" name="name" className="form-control" value={userData.hasOwnProperty("name") ? userData.name : ""} />
                </div>
                <div>
                    {
                        errorsActive && errors.name.length ?
                            (<p className="bg-danger text-white ms-2 me-2 rounded p-1">{errors.name}</p>) : null
                    }
                </div>
                <div className="m-3">
                    <label className="form-label">Ocupación</label>
                    <input autoComplete="off" name="ocupation" className="form-control" value={userData.hasOwnProperty("ocupation") ? userData.ocupation : ""} />
                </div>
                <div>
                    {
                        errorsActive && errors.ocupation.length ?
                            (<p className="bg-danger text-white ms-2 me-2 rounded p-1">{errors.ocupation}</p>) : null
                    }
                </div>
                <div className="m-3">
                    <label className="form-label">Breve descripción de su problema</label>
                    <input autoComplete="off" type="text" name="problem" className='form-control' value={userData.hasOwnProperty("problem") ? userData.problem : ""} />
                </div>
                <div>
                    {
                        errorsActive && errors.description.length ?
                            (<p className="bg-danger text-white ms-2 me-2 rounded p-1">{errors.description}</p>) : null
                    }
                </div>
                <div className="m-3">
                    <label className="form-label">Email</label>
                    <input autoComplete="off" type="text" name="email" className='form-control' value={userData.hasOwnProperty("email") ? userData.email : ""} />
                </div>
                <div>
                    {
                        errorsActive && errors.email.length ?
                            (<p className="bg-danger text-white ms-2 me-2 rounded p-1">{errors.email}</p>) : null
                    }
                </div>
            </div>
            <input autoComplete="off"
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