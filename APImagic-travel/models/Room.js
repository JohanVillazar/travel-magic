// models/Room.js
import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    number: {
      type: Number,
      required: true,
      unique: true, // Para evitar habitaciones con el mismo número
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    unavailableDates: {
      type: [Date],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);