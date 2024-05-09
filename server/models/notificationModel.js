const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      require: true,
    },
    from_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      require: true,
    },
    notification_type: {
      type: String,
      enum: [
        "new_comment",
        "followers",
        "reply_comment",
        "react_comment",
        "new_post",
      ],
      require: true,
    },
    content: {
      type: String,
    },
    link: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

notificationSchema.plugin(mongoosePaginate);

const Notification = mongoose.model("Notifications", notificationSchema);

module.exports = Notification;
