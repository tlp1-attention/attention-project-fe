import { Await } from "@common/components/Await";
import { IUser } from "@interfaces/user";
import { useNavigate, useParams } from "react-router-dom";
import { UserLateralList } from "./UserLateralList";
import { UserContextProvider, useUsers } from "./UsersContext";
import "./users.css";
import { UserProfilePreview } from "./UserProfilePreview";
import { FullSizeSpinner } from "@features/ui/spinner/Spinner";

export function UsersList() {
  const { userResource } = useUsers()!;
  const { userId } = useParams();
  const navigate = useNavigate();

  const showUser = (user: IUser): void => {
    navigate(`/workspace/colaboration/${user.id}`);
  };

  return (
    <Await value={userResource} loading={
      <div className="vh-100">
        <FullSizeSpinner />
      </div>
    }>
      {usersList => {
        const currentId = userId ?? null;
        const currentUser = usersList.find(
          user => currentId && user.id === +currentId
        );

        return (
          <div className="users-container border flex-column flex-sm-row flex-lg-row">
            <UserLateralList users={usersList} showUser={showUser} />
            <UserProfilePreview user={currentUser} />
          </div>
        );
      }}
    </Await>
  );
}

export function UsersPage() {
  return (
    <UserContextProvider>
      <UsersList />
    </UserContextProvider>
  );
}
