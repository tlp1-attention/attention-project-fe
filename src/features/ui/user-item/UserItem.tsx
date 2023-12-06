import { IUser } from "@interfaces/user";
import './user-item.css';

export function UserItem(
    { userInfo: { id, name, description, ocupation, preferences, problem, profileImage }, showUser }:
        {
            userInfo: IUser,
            showUser: (user: IUser) => void
        }
) {

    return (
        <button className="user-item d-flex align-items-center my-2 userbtn" onClick={() => showUser({ id, name, email: "", description, preferences, ocupation, problem, profileImage })}>
            <div className="icon-container">
                <img className="image-icon" src={profileImage} />
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