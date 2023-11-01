import { UserItem } from '@features/ui/user-item/UserItem';
import './users.css';
import { useState } from 'react';

export function UsersPage() {

    const [user, setUser] = useState({
        name: '',
        description: ''
    });
    
    const showUser = (user: {name: string, description: string} ): any => {
        setUser(user);
    }

    return (
        <div className="users-container border flex-column flex-sm-row flex-lg-row ">
            <div className='user-list shadow px-3'>
                <UserItem userInfo={{name:'leo1', description:'desc1'}} showUser={ showUser } />
                <UserItem userInfo={{name:'leo2', description:'desc2'}} showUser={ showUser } />
                <UserItem userInfo={{name:'leo3', description:'desc3'}} showUser={ showUser } />
                <UserItem userInfo={{name:'leo4', description:'desc4'}} showUser={ showUser } />
                <UserItem userInfo={{name:'leo5', description:'desc5'}} showUser={ showUser } />
              
            </div>
            <div className='user w-100'>
                <h5>{user.name}</h5>
                <p>{user.description}</p>
            </div>
        </div>
    )
}