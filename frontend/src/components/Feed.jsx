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
  // console.log(feed)
  return (
    feed && (
      <div>
        <UserCard user={feed[0]} />
      </div>
    )
  );
};
export default Feed;
