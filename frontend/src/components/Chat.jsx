import React from "react";
import { useEffect, useRef, useState } from "react";
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
  const socketRef = useRef(null);

  const user = useSelector((store) => store.user);
  const userId = user?._id;
  // const firstName = user?.firstName;
  // const photoUrl = user?.photoUrl;
  // const socket = createSocketConnection();

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
    fetchChatMessages();
  }, [targetUserId]);

  const fetchChatMessages = async () => {
    const chat = await axios.get(Base_url + "/chat/" + targetUserId, {
      withCredentials: true,
    });
    console.log(chat.data.data.messages);
    const chatMessages = chat?.data?.data?.messages.map((msg) => {
      return {
        senderId: msg?.senderId?._id,
        firstName: msg?.senderId?.firstName,
        lastname: msg?.senderId?.lastName,
        text: msg?.text,
        time: new Date(msg?.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    socketRef.current = createSocketConnection();
    if (!user) {
      return;
    }
    socketRef.current.emit("joinChat", {
      userId,
      targetUserId,
    });

    socketRef.current.on("messageReceived", ({ text, userId }) => {
      // console.log(firstName + " : "+ text);
      setMessages((messages) => [...messages, {
        senderId: userId,
        // firstName,
        text,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    // const socket=createSocketConnection();
    socketRef.current.emit("sendMessage", {
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };
  // Loading UI
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-3">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-base-content/50">Loading chat...</p>
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="alert alert-error max-w-sm">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-4 py-6">
    <div className="flex flex-col w-full max-w-2xl h-[85vh] bg-base-100 rounded-2xl shadow-xl overflow-hidden border border-base-300">
      {/* header */}
      <div className="navbar flex items-center gap-3 px-5 py-3 bg-base-100 border-b border-base-300">
        <div className="avatar mr-3">
          <div className="w-11 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            {targetUser?.photoUrl ? (<img src={targetUser?.photoUrl} alt="profile" />):(<img src="" alt="profile" />)}
          </div>
        </div>
        <div>
          <p className="font-semibold text-base-content">{targetUser?.firstName} </p>
          {/* <p className="text-xs text-success">Online</p> */}
        </div>
      </div>
{/* Message Area */}
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3 bg-base-200">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-base-content/40">
             <p className="text-sm font-medium">Say hi to start the conversation!</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isLoggedInUser = msg.senderId == userId;
            return (
              <div
                key={index}
                className={`chat ${isLoggedInUser ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-image avatar">
                  <div className="w-9 rounded-full">
                    <img
                      alt="profile"
                      src={
                        isLoggedInUser ? user?.photoUrl : targetUser?.photoUrl
                      }
                    />
                  </div>
                </div>
                <div className="chat-header text-xs text-base-content/50 mb-0.5">
                  {isLoggedInUser ? user?.firstName : targetUser?.firstName}
                </div>
                <div className={`chat-bubble flex items-end gap-2 max-w-[70%] text-sm leading-relaxed ${isLoggedInUser ? "chat-bubble-primary" : "bg-base-100 text-base-content border border-base-300"}`}>
                  <p className="wrap-break-word">{msg.text}</p>
                  <time className="chat-footer text-[10px] self-end ml-3 opacity-60  shrink-0">
                    {msg.time}
                  </time>
                </div>

                {/* <div className="chat-footer opacity-50">Delivered</div> */}
              </div>
            );
          })
        )}
      </div>
{/* input bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-base-100 border-t border-base-300">
        <input
          type="text"
          value={newMessage}
          placeholder="Type a message..."
          onChange={(e) => setNewMessage(e.target.value)}
          className="input input-bordered flex-1 rounded-full bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        />
        <button onClick={sendMessage} disabled={!newMessage.trim()} className="btn btn-primary btn-circle disabled:opacity-40">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="w-5 h-5">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
        </button>
      </div>
    </div>
    </div>
  );
};

export default Chat;
