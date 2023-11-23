import { UserItem } from '@features/ui/user-item/UserItem';
import './users.css';
import { useState, useEffect } from 'react';

export function UsersPage() {

    const [usersList, setUsersList] = useState([]);

    const usersExample = [
        { name: 'User 1', description: 'desc1', image: 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png' },
        { name: 'User 2', description: 'desc2', image: 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png' },
        { name: 'User 3', description: 'desc3', image: 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png' },
        { name: 'User 4', description: 'desc4', image: 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png' },
        { name: 'User 5', description: 'desc5', image: 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png' }
    ];

    useEffect(() => {

    }, [usersList])

    const [user, setUser] = useState({
        name: '',
        description: '',
        image: ''
    });

    const showUser = (user: { name: string, description: string, image: string }): any => {
        setUser(user);
    }

    return (
        <div className="users-container border flex-column flex-sm-row flex-lg-row">
            <div className='user-list shadow px-3' data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" tabIndex={0}>
                {
                    usersExample.map((userExample, i) => <UserItem userInfo={userExample} showUser={showUser} key={i} />)
                }
            </div>
            <div className='user w-100 d-flex p-3'>
                <div className='col-3 col-sm-6 col-lg-6'>
                    <img src={user.image} className='img-fluid w-50 m-3' />
                </div>
                <div className='col-9 col-sm-6 col-lg-6 d-flex align-items-center flex-column'>
                    <h3 className='text-capitalize'>{user.name}</h3>
                    <p>{user.description}</p>
                </div>
            </div>
        </div>
    )
}