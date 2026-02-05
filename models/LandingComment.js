import mongoose, { Schema, models, model } from "mongoose";

const LandingCommentSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    landingId: {
      type: Number,
      required: true,
    },

    profileId: {
      type: Number,
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
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
    },

    notified: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // creează createdAt + updatedAt
  },
);

export default models.LandingComment ||
  model("LandingComment", LandingCommentSchema);
