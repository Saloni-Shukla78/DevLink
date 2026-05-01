import React from "react";
import { Base_url } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch=useDispatch();
  const { _id,firstName, lastName, headline, about, photoUrl, gender, age } = user;
  const handleSendRequest = async (status, id) => {
    try {
      const res = await axios.post(
        Base_url + "/request/" + status + "/" + id,
        {},{
          withCredentials: true,
        },
      );
      dispatch(removeUserFromFeed(user._id))
    } catch (err) {
      console.log(err.message);
    }
  };
  // console.log(user);
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
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", user._id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", user._id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
      {/* {users &&
        users.map((user) => {
          return (            
          )
        })} */}
    </div>
  );
};

export default UserCard;
