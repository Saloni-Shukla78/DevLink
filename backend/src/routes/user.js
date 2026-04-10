const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const { connection } = require("mongoose");
const userRouter = express.Router();

const User_Safe_Data = [
  "firstName",
  "lastName",
  "gender",
  "age",
  "headline",
  "about",
  "skills",
  "photoUrl",
];

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const receivedRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", User_Safe_Data);

    if (connections.length === 0) {
      return res.status(404).json({
        message: "No connections found",
      });
    }
    res.status(200).json({
      message: "Request fetch successfully.",
      data: receivedRequests,
    });
  } catch (err) {
    res.status(400).json({
      message: "Errorv: " + err.message,
    });
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connections = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      status: "accepted",
    })
      .populate("toUserId", User_Safe_Data)
      .populate("fromUserId", User_Safe_Data);

    if (connections.length === 0) {
      return res.status(404).json({
        message: "No connections found",
      });
    }
    const data = connections.map((row) => {
        if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
            return row.toUserId;
        }else{
            return row.fromUserId;
        }
    });

    res.status(200).json({
      message: "Connections fetch successfully.",
      data,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error : " + err.message,
    });
  }
});

module.exports = userRouter;
