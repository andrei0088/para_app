import mongoose, { Schema, models, model } from "mongoose";

const PostLikesSchema = new Schema(
  {
    postId: {
      type: String,
      required: true,
    },

    users: {
      type: [String],
      required: true,
      index: true,
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export default models.PostLikes || model("PostLikes", PostLikesSchema);
