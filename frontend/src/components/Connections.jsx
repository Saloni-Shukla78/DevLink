import axios from "axios";
import React, { useEffect } from "react";
import { Base_url } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  console.log(connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(Base_url + "/user/connections", {
        withCredentials: true,
      });
      console.log(res?.data?.data);
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
          const {firstName ,photoUrl,headline}=connection;

          return (<li className="list-row px-10 py-4 ">
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
          <button className="btn btn-square btn-ghost">
            <svg
              className="size-[1.2em]"
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
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </g>
            </svg>
          </button>
        </li>
        );
        })}
      </ul>
    </div>
  );
};

export default Connections;
