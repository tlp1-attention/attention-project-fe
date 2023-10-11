import { UserItem } from '@features/ui/user-item/UserItem';
import './users.css';

export function UsersPage() {
    return (
        <div className="users-container border flex-column flex-sm-row flex-lg-row ">
            <div className='user-list shadow '>
                <UserItem name="Leo" />
                <UserItem name="Leo" />
                <UserItem name="Leo" />

            </div>
            <div className='user'>
                <h5>User Info</h5>
            </div>
        </div>
    )
}