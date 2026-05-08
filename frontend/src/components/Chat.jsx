import React from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
    const {targetUserId}=useParams();
    console.log(targetUserId);
  return (
    <div className="flex flex-col bg-base-200 max-h-full my-12 mx-25 rounded-xl p-7">
      <div className="navbar bg-base-200 border-b">
        <div className="avatar mr-3">
          <div className="w-10 rounded-full">
            <img src="https://i.pravatar.cc/100?img=12" alt="Priya" />
          </div>
        </div>
        <div>
          <p className="font-semibold">Priya Rao</p>
          <p className="text-xs text-success">Online</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="chat-bubble">You were the Chosen One!</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            Anakin
            <time className="text-xs opacity-50">12:46</time>
          </div>
          <div className="chat-bubble">I hate you!</div>
          <div className="chat-footer opacity-50">Seen at 12:46</div>
        </div>
      </div>
      <div className="p-3 border-t flex gap-2 bg-base-100">
        <input
          type="text"
          placeholder="Type a message..."
          className="input input-bordered flex-1 focus:outline-none focus:ring-0"
        />
        <button className="btn btn-primary">Send</button>
      </div>
    </div>
  );
};

export default Chat;
