import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
    },

    name: String,
    mobile: String,
    email: String,
    gender: String,

    pickup: String,
    drop: String,

    journeyDate: String,
    journeyTime: String,

    totalFare: Number,
    advancePaid: Number,
    remainingAmount: Number,
    payableAmount: Number,

    paymentType: String,

    paymentStatus: {
      type: String,
      default: "Pending",
    },

    paymentId: {
      type: String,
      default: "",
    },

    orderId: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Booking =
  mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);

export default Booking;