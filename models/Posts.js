import mongoose, { Schema, models, model } from "mongoose";

const PostsSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    userName: {
      type: String, // ✅ schimbat de la Number la String
      required: true,
    },

    profileId: {
      type: Number,
      required: true,
    },

    componentId: {
      type: Number,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    report: {
      type: Number,
      default: 0,
    },

    reportedBy: {
      type: [String], // array de userId
      default: [],
    },

    deletedAt: {
      type: Date,
      default: null,
      index: true,
    },
  },
  {
    timestamps: true, // creează createdAt + updatedAt
  },
);

// Export consistent
export default models.Posts || model("Posts", PostsSchema);
