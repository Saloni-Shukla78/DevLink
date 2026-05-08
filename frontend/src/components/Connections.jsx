import axios from "axios";
import React, { useEffect } from "react";
import { Base_url } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(Base_url + "/user/connections", {
        withCredentials: true,
      });
      
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;
  if (connections.length === 0){
    return(
      <h2 className="p-20 opacity-60 tracking-wide text-secondary font-semibold text-2xl text-center">No Request Found</h2>
    )
  }

  return (
    <div className="mx-10 my-7 space-y-3">
      <h2 className="p-4 pb-2 opacity-60 tracking-wide text-primary font-bold text-2xl text-center">
          Connections
        </h2>
      <ul className="list bg-base-100 rounded-box shadow-md my-7 mx-auto w-2/3">

        {connections.map((connection)=>{
          const {_id,firstName ,photoUrl,headline}=connection;

          return (<li key={_id} className="list-row px-10 py-4 ">
          <div>
            <img
              className="size-14 rounded"
              src={connection.photoUrl}
            />
          </div>
          <div className="space-y-2">
            <div className="text-lg">{connection.firstName}</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              {connection.headline}
            </div>
          </div>
          <Link to={"/chat/"+ connection._id}>
          <button className="btn btn-ghost flex flex-col items-center justify-center gap-1 h-16 w-16 rounded-xl">
            <svg
              className="size-[1.4em]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                 <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />

   
              </g>
            </svg>
                 <span className="text-xs font-medium">Chat</span>

          </button></Link>
        </li>
        );
        })}
      </ul>
    </div>
  );
};

export default Connections;
