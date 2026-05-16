import axios from "axios";
import React, { useEffect, useState } from "react";
import { Base_url } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const [error, setError] = useState("");
  const feed = useSelector((store) => store.feed?.showUsersOnFeed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(Base_url + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      setError(err?.response?.data || "Something went wrong..");
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

      // Error state
  if (error) {
    return (
      <div className="flex justify-center items-start pt-20 min-h-[calc(100vh-60px)] bg-base-200 px-4">
        <div className="alert alert-error max-w-sm text-sm">
          <span>{error}</span>
        </div>
      </div>
    );
  }
   // Loading state — feed hasn't loaded yet
  if (!feed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-60px)] bg-base-200 gap-3">
        <span className="loading loading-spinner loading-lg text-primary" />
        <p className="text-sm text-base-content/50">Finding developers for you...</p>
      </div>
    );
  }
    // Empty state — no users left
  if (feed.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-60px)] bg-base-200 gap-4 px-4">
        <h2 className="text-xl font-bold text-base-content">You've seen everyone!</h2>
        <p className="text-sm text-base-content/50 text-center max-w-xs">
          No more developers to show right now. Check back later for new connections.
        </p>
      </div>
    );
  }
  return (
    feed && (
      <div  className="flex flex-col items-center justify-center min-h-[calc(100vh-60px)] bg-base-200 px-4 py-8 gap-4">
        {feed[0] && <UserCard key={feed[0]._id} user={feed[0]} />}        
      </div>
    )
  );
};
export default Feed;
