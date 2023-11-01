
import './user-item.css';

export function UserItem({ userInfo:{ name, description }, showUser }: { userInfo: {name: string, description: string}, showUser: ( user: {name: string, description: string}) => void }) {


    return (
        <button className="user-item d-flex align-items-center my-2 userbtn" onClick={ () => showUser( {name, description} ) }>
            <div className="icon-container">
                <img className="image-icon" src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png" />
            </div>
            <div className=" w-100 text-center">
                <p className='fw-bolder'>{name}</p>
            </div>
        </button>
    )
}