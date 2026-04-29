const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const { connection } = require("mongoose");
const User = require("../models/user");
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
    //find incoming requests..
    const receivedRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", User_Safe_Data);

    if (receivedRequests.length === 0) {
      return res.status(404).json({
        message: "No connections found.",
      });
    }
    res.status(200).json({
      message: "Request fetch successfully.",
      data: receivedRequests,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error: " + err.message,
    });
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    // find connections who's status is accepted..
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
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      } else {
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

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit > 20 ? 20 : limit;
    const skip = (page - 1)*limit;
    //find connection request..
    const requestConnection = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");
    const hideUsersFromFeed = new Set();
    //add all connection and request into set..
    requestConnection.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });
    ///find user who's profile show on feed..
    const showUsersOnFeed = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(User_Safe_Data)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      data: { showUsersOnFeed },
    });
  } catch (err) {
    res.status(400).json({
      message: "Error : " + err.message,
    });
  }
});

module.exports = userRouter;
