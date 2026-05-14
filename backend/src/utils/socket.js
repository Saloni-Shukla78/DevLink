const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat");
const connectionRequest = require("../models/connectionRequest");

const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("_"))
    .digest("hex");
};

const intializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });
  io.on("connection", (socket) => {
    socket.on("joinChat", ({ userId, targetUserId }) => {
      const roomId = getSecretRoomId(userId, targetUserId);
      // console.log(firstName + " joined room "+ roomId);
      socket.join(roomId);
    });
    socket.on("sendMessage", async ({ userId, targetUserId, text }) => {
      try {
        if (!text?.trim()) return;
        const roomId = getSecretRoomId(userId, targetUserId);
        
        // check accepted connection...
        const alreadyExistConnection = await connectionRequest.findOne({
          $or: [
              { toUserId:targetUserId, fromUserId:userId ,status:"accepted"},
              { toUserId: userId, fromUserId: targetUserId ,status:"accepted"},
              ],
          });
          if (!alreadyExistConnection) {
            throw new Error("Connection does not exist!");
          }

        let chat = await Chat.findOne({
          participants: { $all: [userId, targetUserId] },
        });
        if (!chat) {
          chat = new Chat({
            participants: [userId, targetUserId],
            messages: [],
          });
        }
        if (!chat.messages) {
          chat.messages = [];
        }
        chat.messages.push({
          senderId: userId,
          text,
        });
        await chat.save();

        // console.log(firstName + " :" + text);
        io.to(roomId).emit("messageReceived", { text, userId,createdAt: new Date(), });
      } catch (err) {
        console.log(err.message);
      }
    });
    socket.on("disconnect", () => {});
  });
};
module.exports = intializeSocket;
