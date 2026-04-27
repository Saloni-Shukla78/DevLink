import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Base_url } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const user=useSelector((store)=>store.user);
  const handleLogout=async()=>{
    try{
        await axios.post(Base_url + "/logout",{},{
          withCredentials:true,
        });
        dispatch(removeUser());
        navigate("/");
    }catch(err){
      console.error(err);
    }

  }
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">DevLink</Link>
      </div>
      {user && (
        <div className="flex gap-2">
          <div className="text-blue-600 text-sm py-2">Welcome ,{user.firstName}</div>
        {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
        <div className="dropdown dropdown-end mx-6">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="profile"
                src={user.photoUrl}
              />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link>Settings</Link>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
        
      </div>
      )}
    </div>
  );
};

export default Navbar;
