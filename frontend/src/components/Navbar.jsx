import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Base_url } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [loading, setLoading] = useState(false);
  const user=useSelector((store)=>store.user);

  const handleLogout=async()=>{
    try{
      setLoading(true);
        await axios.post(Base_url + "/logout",{},{
          withCredentials:true,
        });
        dispatch(removeUser());
        navigate("/login");
    }catch(err){
      alert(
      err?.response?.data || "Logout failed"
    );
    }finally {
    setLoading(false);
  }
  };
  
  return (
    <div className="navbar sticky top-0 z-50 bg-base-100 shadow-md border-b border-base-300 px-4 md:px-8">
      <div className="flex-1">
        <Link
          to="/"
          
          className="flex items-center gap-2 group"
        >
         
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-sm">
            
            <svg
              width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="white" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M16 18l2-2-6-6-6 6 2 2" />
              <path d="M8 6l4-4 4 4" />
            </svg>
          </div>
 
          <span className="text-xl font-bold tracking-tight text-base-content group-hover:text-primary transition-colors">
            Dev<span className="text-primary">Link</span>
          </span>
        </Link>
      </div>
      {user && (
        <div className="flex items-center gap-3">
           <span className="hidden md:flex text-sm text-base-content/60 font-medium">
            Hey,{" "}
            <span className="text-primary font-semibold ml-1">
              {user.firstName} 👋
            </span>
          </span>
        {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar ring-2 ring-primary ring-offset-base-100 ring-offset-2"
          >
            <div className="w-10 rounded-full overflow-hidden">
              <img
                alt="profile"
                src={user.photoUrl}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-2xl w-56 border border-base-200"
          >
            
            <li>
              <Link to="/profile" className="flex justify-between items-center rounded-xl">
                <span>Profile</span>
                <span className="badge badge-primary badge-sm">New</span>
              </Link>
            </li>
            <li>
               <Link to="/connections" className="rounded-xl">
                  Connections
                </Link>
            </li>
             <li>
              <Link to="/requests" className="rounded-xl">
                  Requests
                </Link>
            </li>
            <li>
              <a onClick={handleLogout}  className="text-error rounded-xl font-medium"> {loading ? (
                    // DaisyUI spinner inline
                    <span className="flex items-center gap-2">
                      <span className="loading loading-spinner loading-xs" />
                      Logging out...
                    </span>
                  ) : (
                    "Logout"
                  )}</a>
            </li>
          </ul>
        </div>
        
      </div>
      )}
    </div>
  );
};

export default Navbar;
