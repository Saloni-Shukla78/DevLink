import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket";
import { Base_url } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [targetUser, setTargetUser] = useState(null);

  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const firstName = user?.firstName;
  const photoUrl = user?.photoUrl;
  const socket = createSocketConnection();

  useEffect(() => {
    const fetchTargetUser = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(Base_url + "/profile/" + targetUserId, {
          withCredentials: true,
        });
        setTargetUser(res.data);
      } catch (err) {
        setError(err?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchTargetUser();
  }, [targetUserId]);

  useEffect(() => {
    if (!user) {
      return;
    }
    socket.emit("joinChat", {
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ text, userId }) => {
      // console.log(firstName + " : "+ text);
      setMessages((messages) => [...messages, { text, userId }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    // const socket=createSocketConnection();
    socket.emit("sendMessage", {
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };
  // Loading UI
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading chat...
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-base-200 max-h-full my-12 mx-25 rounded-xl p-7 min-h-96">
      <div className="navbar bg-base-200 border-b">
        <div className="avatar mr-3">
          <div className="w-10 rounded-full">
            <img src={targetUser?.photoUrl} alt="profile" />
          </div>
        </div>
        <div>
          <p className="font-semibold">{targetUser?.firstName} </p>
          {/* <p className="text-xs text-success">Online</p> */}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-400 text-xl font-semibold">
            Start chatting...
          </div>
        ) : (
          messages.map((msg, index) => {
            const isLoggedInUser = msg.userId == userId;
            return (
              <div
                key={index}
                className={`chat ${isLoggedInUser ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="profile"
                      src={
                        isLoggedInUser ? user?.photoUrl : targetUser?.photoUrl
                      }
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {isLoggedInUser ? user?.firstName : targetUser?.firstName}
                  {/* <time className="text-xs opacity-50">12:45</time> */}
                </div>
                <div className="chat-bubble">{msg.text}</div>
                {/* <div className="chat-footer opacity-50">Delivered</div> */}
              </div>
            );
          })
        )}
      </div>

      <div className="p-3 border-t flex gap-2 bg-base-100">
        <input
          type="text"
          value={newMessage}
          placeholder="Type a message..."
          onChange={(e) => setNewMessage(e.target.value)}
          className="input input-bordered flex-1 focus:outline-none focus:ring-0"
        />
        <button onClick={sendMessage} className="btn btn-primary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
