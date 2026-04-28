import React from "react";

const UserCard = ({user}) => {
  const { firstName, lastName, about, photoUrl, gender, age } = user;
  return (
    <div className="m-5">
      <div className="card bg-base-700 w-80 shadow-md">
        <figure>
          <img src={photoUrl} alt="profile" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{about}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
