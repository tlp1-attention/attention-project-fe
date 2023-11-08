
import './user-item.css';

export function UserItem({ userInfo:{ name, description, image }, showUser }: { userInfo: {name: string, description: string, image: string}, showUser: ( user: {name: string, description: string, image:string}) => void }) {


    return (
        <button className="user-item d-flex align-items-center my-2 userbtn" onClick={ () => showUser( {name, description, image} ) }>
            <div className="icon-container">
                <img className="image-icon" src={image} />
            </div>
            <div className=" w-100 text-center">
                <p className='fw-bolder'>{name}</p>
            </div>
        </button>
    )
}