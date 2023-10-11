import './user-item.css';

export function UserItem({ name }: { name: string }) {
    return (
        <div className="user-item d-flex align-items-center">
            <div className="icon-container">
                <img className="img-fluid" src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" />
            </div>
            <div className=" w-100 text-center">
                <p>{name}</p>
            </div>
        </div>
    )
}