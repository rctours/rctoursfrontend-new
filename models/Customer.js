import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    mobile: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    totalBookings: {
      type: Number,
      default: 0,
    },

    totalSpent: {
      type: Number,
      default: 0,
    },

    loyaltyPoints: {
      type: Number,
      default: 0,
    },

    membership: {
      type: String,
      default: "Bronze",
    },

    couponCode: {
      type: String,
      default: "",
    },

    couponDiscount: {
      type: Number,
      default: 0,
    },

    couponUsed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Customer ||
  mongoose.model("Customer", CustomerSchema);