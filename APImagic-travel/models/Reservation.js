// models/Reservation.js
import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    roomIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room", // Asegúrate de que "Room" es el nombre correcto del modelo
        required: true,
      },

    ],
    reservationId:{
      type: String,
      required: true
    },
    estado: {
      type: String,
      enum: ["pendiente", "confirmada", "cancelada"],
      default: "pendiente",
    },
    
    dates: {
      type: [Date],
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },
    
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Reservation", ReservationSchema);


