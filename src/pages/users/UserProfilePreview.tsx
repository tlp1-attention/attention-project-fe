import { IUser } from "@interfaces/user";
import { ContactItem } from "./ContactItem";
import profile from '../../../public/assets/profileDefault.jpg';

export function UserProfilePreview({ user }: { user?: IUser }) {
  return (
    <div className="user w-100 d-flex align-items-center justify-content-center p-3">
      {user !== undefined && user.profileImage !== undefined ? (
        <div className="col-3 col-sm-3 col-lg-3 align-self-start">
          <img src={user.profileImage || profile} className="img-fluid w-75 m-3" />
        </div>
      ) : null}
      {user !== undefined && user.name !== undefined ? (
        <div className="col-6 col-sm-6 col-lg-6 d-flex align-items-center flex-column">
          <h3 className="text-capitalize">{user.name}</h3>
          <p>{user.ocupation}</p>
          <p>{user.problem}</p>
          <div className="text-color border p-4 border-3 rounded-2 bg-grey w-100">
            <legend>Se le dificulta: </legend>
            <p id="subject">
              {user.preferences?.length
                ? user.preferences[0].subject
                : "No especificado!"}
            </p>
            <hr />
            <legend>Puede estudiar:</legend>
            <p id="time_day">
              {user.preferences?.length
                ? user.preferences[0].time_day
                : "No especificado!"}
            </p>
            <hr />
            <legend>Busca</legend>
            <p id="people">
              {user.preferences?.length
                ? user.preferences[0].people
                : "No especificado!"}
            </p>
            <hr />
            <legend>Puede contactarse a traves de:</legend>
            {user.preferences?.length ? (
              <ContactItem
                contact={user.preferences[0].contact}
                contact_type={user.preferences[0].contact_type}
                userId={user.id}
              />
            ) : (
              "No especificado!"
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
