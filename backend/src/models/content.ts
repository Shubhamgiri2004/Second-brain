import mongoose, { Schema, Types } from "mongoose";

type Type = "Link" | "Video" | "Image" | "Tweet";

interface ContentData {
  link: string;
  type: Type;
  title: string;
  tags?: Types.ObjectId[];
  userId: Types.ObjectId;
  createdAt?: Date;   
  updatedAt?: Date;
}

const contentSchema = new Schema<ContentData>(
  {
    link: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["Link", "Video", "Image", "Tweet"],
    },

    title: {
      type: String,
      required: true,
    },

    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tags",
      },
    ],

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  } 
);

const ContentModel = mongoose.model<ContentData>("Content", contentSchema);

export default ContentModel;
