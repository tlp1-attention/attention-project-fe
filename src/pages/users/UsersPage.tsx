import { UserItem } from '@features/ui/user-item/UserItem';
import './users.css';
import { useState, useEffect } from 'react';
import { IUser } from '@interfaces/user';

export function UsersPage() {

    const [usersList, setUsersList] = useState([]);

    const defautltImg = "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png";

    useEffect(() => {
        fetch('http://localhost:4000/api/users/list')
            .then(res => res.json())
            .then(res => {
                console.log(res);

                setUsersList(res)
            })
            .catch(err => console.error(err))
    }, [])

    const [user, setUser] = useState<IUser>();

    const showUser = (user: IUser): void => {
        setUser(user);
    }

    return (
        <div className="users-container border flex-column flex-sm-row flex-lg-row">
            <div className='user-list shadow px-3' data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" tabIndex={0}>
                {
                    usersList.map((userItem, i) => {
                        const user: IUser = Object.assign({}, userItem);
                        return <UserItem userInfo={{ ...user, image: defautltImg }} showUser={showUser} key={i} />
                    })
                }
            </div>
            <div className='user w-100 d-flex align-items-center p-3'>
                {
                    user !== undefined && user.image !== undefined ? (
                        <div className='col-3 col-sm-3 col-lg-3 align-self-start'>
                            <img src={user.image} className='img-fluid w-75 m-3' />
                        </div>
                    ) : null
                }
                {
                    user !== undefined && user.name !== undefined ? (
                        <div className='col-6 col-sm-6 col-lg-6 d-flex align-items-center flex-column'>
                            <h3 className='text-capitalize'>{user.name}</h3>
                            <p>{user.ocupation}</p>
                            <p>{user.problem}</p>
                            <div className="text-color border p-4 border-3 rounded-2 bg-grey w-100">
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
                    ) : null
                }
            </div>
        </div>
    )
}