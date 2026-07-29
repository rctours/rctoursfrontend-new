import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    image: {
      type: String,
      default: "",
    },

    excerpt: {
      type: String,
      default: "",
    },

    content: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "Travel",
    },

    status: {
      type: String,
      default: "Draft",
    },

    author: {
      type: String,
      default: "RC Tours & Travels",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Blog ||
  mongoose.model("Blog", BlogSchema);