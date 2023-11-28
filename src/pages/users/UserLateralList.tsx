import { UserItem } from "@features/ui/user-item/UserItem";
import { IUser } from "@interfaces/user";
import profileImage from "../../../public/assets/profileDefault.jpg";

type UserLateralListProps = {
  users: IUser[];
  showUser: (user: IUser) => void;
};
export function UserLateralList({ users, showUser }: UserLateralListProps) {
  const defautltImg = profileImage;
  return (
    <div
      className="user-list shadow px-3"
      data-bs-spy="scroll"
      data-bs-target="#list-example"
      data-bs-smooth-scroll="true"
      tabIndex={0}
    >
      {users.map((userItem, i) => {
        const user: IUser = Object.assign({}, userItem);
        return (
          <UserItem
            userInfo={{ ...user, profileImage: user.profileImage ?? defautltImg }}
            showUser={showUser}
            key={i}
          />
        );
      })}
    </div>
  );
}
