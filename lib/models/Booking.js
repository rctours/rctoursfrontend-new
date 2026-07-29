import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    // ==========================
    // Booking
    // ==========================
    bookingId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    bookingStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Driver Assigned",
        "Driver Reached",
        "Trip Started",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },

    // ==========================
    // Customer
    // ==========================
    name: {
      type: String,
      default: "",
    },

    mobile: {
      type: String,
      default: "",
      index: true,
    },

    whatsapp: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      default: "",
    },

    // ==========================
    // Trip
    // ==========================
    vehicle: {
      type: String,
      default: "",
    },

    tripType: {
      type: String,
      default: "",
    },

    pickup: {
      type: String,
      default: "",
    },

    drop: {
      type: String,
      default: "",
    },

    journeyDate: {
      type: String,
      default: "",
    },

    returnDate: {
      type: String,
      default: "",
    },

    journeyTime: {
      type: String,
      default: "",
    },

    distance: {
      type: Number,
      default: 0,
    },

    actualDistance: {
    type: Number,
    default: 0,
    },

    passengers: {
      type: Number,
      default: 1,
    },

    luggage: {
      type: Number,
      default: 0,
    },

    // ==========================
    // Driver
    // ==========================
    driverName: {
      type: String,
      default: "",
    },

    driverMobile: {
      type: String,
      default: "",
    },

    driverId: {
      type: String,
      default: "",
    },

    // ==========================
    // Charges
    // ==========================
    totalFare: {
      type: Number,
      default: 0,
    },

    advancePaid: {
      type: Number,
      default: 0,
    },

    remainingAmount: {
      type: Number,
      default: 0,
    },

    payableAmount: {
      type: Number,
      default: 0,
    },

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

    // ==========================
    // Payment
    // ==========================
    paymentType: {
      type: String,
      default: "",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Partial", "Fully Paid", "Refunded"],
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

    lastPaymentAt: {
      type: Date,
      default: null,
    },

    // ==========================
    // Trip
    // ==========================
    tripStatus: {
      type: String,
      enum: ["Booked", "Running", "Completed", "Cancelled"],
      default: "Booked",
    },

    tripCompletedAt: {
      type: Date,
      default: null,
    },

    // ==========================
    // Notes
    // ==========================
    notes: {
      type: String,
      default: "",
    },

    adminNotes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);