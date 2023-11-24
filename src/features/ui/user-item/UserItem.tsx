import defaultProfile from "../../../../public/assets/profileDefault.jpg"
import { IUser } from "@interfaces/user";
import './user-item.css';

export function UserItem(
    { userInfo: { name, description, ocupation, preferences, problem, image }, showUser }:
        {
            userInfo: IUser,
            showUser: (user: IUser) => void
        }
) {

    return (
        <button className="user-item d-flex align-items-center my-2 userbtn" onClick={() => showUser({ name, email: "", description, preferences, ocupation, problem, image })}>
            <div className="icon-container">
                <img className="image-icon" src={defaultProfile} />
            </div>
            <div className=" w-100 text-center">
                <p className='fw-bolder'>{name}</p>
                <div className='d-flex justify-content-around flex-wrap container '>
                    <p className='descripciones'>{ocupation}</p>
                    <p className='descripciones'>{problem}</p>
                </div>
            </div>
        </button>
    )
}