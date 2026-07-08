import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
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

    toll: {
  type: Number,
  default: 0,
},

parking: {
  type: Number,
  default: 0,
},

stateTax: {
  type: Number,
  default: 0,
},

driverAllowance: {
  type: Number,
  default: 0,
},

driverName: {
  type: String,
  default: "",
},

driverMobile: {
  type: String,
  default: "",
},

    paymentType: String,

  paymentStatus: {
  type: String,
  default: "PENDING",
  },

  tripStatus: {
  type: String,
  default: "Booked",
  },

  tripCompletedAt: {
  type: Date,
  default: null,
  },

  paymentId: {
  type: String,
  default: "",
  },

    orderId: {
      type: String,
      default: "",
    },

    lastPaymentAt: {
      type: Date,
      default: null,
    },

  },
  {
    timestamps: true,
  }
);

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", BookingSchema);

export default Booking;