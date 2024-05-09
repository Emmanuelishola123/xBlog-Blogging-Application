const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      lowercase: true,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      lowercase: true,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: false,
    },
    description: {
      type: String,
    },
    bio: {
      type: String,
    },
    avatar: {
      type: String,
    },
    works: {
      type: String,
    },
    skills: {
      type: String,
    },
    location: {
      type: String,
    },
    learning: {
      type: String,
    },
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Users",
    },
    following: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Users",
    },
    socket_id: {
      type: String,
    },
    reset_token: {
      type: String,
    },
    reset_token_ttl: {
      type: Date,
    },
    is_two_fa_enabled: {
      type: Boolean,
      default: false
    },
    two_fa_token: {
      type: String,
    },
    two_fa_token_ttl: {
      type: Date,
    },
    verification_token: {
      type: String,
    },
    verification_token_ttl: {
      type: Date,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    setting: {
      type: {
        brandColor: {
          type: String,
          default: '#090909'
        },
        mode: {
          type: String,
          default: 'system'
        },
      }
    }
  },
  { timestamps: true },
);

userSchema.plugin(mongoosePaginate);

const User = mongoose.model("Users", userSchema);

module.exports = User;
