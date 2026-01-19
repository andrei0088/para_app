import mongoose, { Schema, models, model } from "mongoose";

const RegionCommentSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    regionId: {
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
  },
  {
    timestamps: true, // creează createdAt + updatedAt
  }
);

export default models.RegionComment ||
  model("RegionComment", RegionCommentSchema);
