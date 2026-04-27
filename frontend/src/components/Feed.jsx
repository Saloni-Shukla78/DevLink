import axios from "axios";
import React, { useEffect, useState } from "react";
import { Base_url } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const [error, setError] = useState("");
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(Base_url + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      setError(err?.res?.data || "Something went wrong..");
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  return <div>Hello,</div>;
};

export default Feed;
