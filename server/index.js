const secrets = require("./config");
const User = require("./models/userModel");
const app = require("./server");
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const response = require("./utils/response");
const Notification = require("./models/notificationModel");

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_BASEURL,
    methods: ["GET", "POST"],
  },
});

server.listen(secrets.PORT, () =>
  console.log(`xBlog Server running on port ${secrets.PORT}`),
);

io.on("connection", async (socket) => {
  console.log(socket.id);
  let userId = socket.handshake.query["userId"];

  if (Boolean(userId)) {
    await User.findByIdAndUpdate(userId, {
      socket_id: socket.id,
    });
  }

  userId;

  socket.on("follow_user", async ({ currentUserId, userToFollowId }) => {
    try {
      console.log({ currentUserId, userToFollowId });
      const followingUserExist = await User.findOne({
        _id: userToFollowId,
      });

      if (!followingUserExist)
        // return response(
        //   req,
        //   res,
        //   404,
        //   true,
        //   false,
        //   "The user you are trying to follow does not exit",
        // );
        return;
      // Update follower profile
      const followerUser = await User.findOneAndUpdate(
        { _id: currentUserId },
        {
          $push: {
            following: userToFollowId,
          },
        },
        {
          new: true,
        },
      );

      // Update following profile
      const followingUser = await User.findOneAndUpdate(
        { _id: userToFollowId },
        {
          $push: {
            followers: currentUserId,
          },
        },
        {
          new: true,
        },
      );

      const newNotification = await Notification.create({
        user: userToFollowId,
        from_user: currentUserId,
        notification_type: "followers",
        content: "started following you",
      });

      newNotification = await newNotification
        .populate("user")
        .populate("from_user")
        .execPopulate();

        console.log(newNotification._doc)

      io.to(followingUserExist?.socket_id).emit("new_notification", {
        ...newNotification?._doc,
      });

      // return response(
      //   req,
      //   res,
      //   200,
      //   false,
      //   {
      //     myFollowing: followerUser._doc.following,
      //     userFollowers: followingUser._doc.followers,
      //     connectionLevel: connection(currentUserId, userToFollowId),
      //   },
      //   `You are now following ${followingUser.username}`,
      // );
      return;
    } catch (error) {
      // return response(req, res, 500, true, false, error.message);
      return;
    }
  });
});

// process.on("unhandledRejection", (err) => {
//   console.log({err});
//   console.log("UNHANDLED REJECTION! Shutting down ...");
//   server.close(() => {
//     process.exit(1); //  Exit Code 1 indicates that a container shut down, either because of an application failure.
//   });
// });
