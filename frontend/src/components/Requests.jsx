import axios from "axios";
import React, { useEffect } from "react";
import { Base_url } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  console.log(requests);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(Base_url + "/user/request/received", {
        withCredentials: true,
      });
      // console.log(res);
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="mx-10 my-7 space-y-3">
      <h1 className="p-4 pb-2 opacity-60 tracking-wide text-primary font-bold text-2xl text-center">
        Connection Requests
      </h1>
      {requests &&
        requests.map((request) => {
          const { _id, fromUserId } = request;
          return (
            <div
              key={request._id}
              className="card card-side bg-base-200 w-2/3 mx-auto shadow-md"
            >
              <figure className="p-4">
                <img
                  className="w-16 h-16 rounded-full object-cover"
                  src={fromUserId?.photoUrl}
                  alt="user"
                />
              </figure>
              <div className="flex justify-between items-center w-full px-4">
                <div className="space-y-1">
                  <div className="text-sm">{fromUserId?.firstName}</div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {fromUserId?.headline}
                  </div>
                </div>
                {/* <p className="">{fromUserId.firstName} sends connection request.</p> */}
                <div className="card-actions justify-end">
                  <button className="btn btn-secondary">Accept</button>
                  <button className="btn btn-primary">Rejected</button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Requests;
