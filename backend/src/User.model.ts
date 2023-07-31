import mongoose from "mongoose";

const User = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  username: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
  },
  profilePic: {
    type: String,
    default:
      "https://cdn3.vectorstock.com/i/1000x1000/32/12/default-avatar-profile-icon-vector-39013212.jpg",
  },
});

export default mongoose.model("User", User);
