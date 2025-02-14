import express from "express";
import {
  createReservation,
  getReservationId,
  getReservationsByUser,
  actualizarEstadoReserva,
  
}from "../controllers/reservationcontroller.js";

// routes/reservationRoutes.js



const router = express.Router();

router.post("/reservations", createReservation);
router.get('/reservations/:reservationId', getReservationId);
router.get("/reservations/user/:userId", getReservationsByUser);
router.put("/:id/estado", actualizarEstadoReserva);

export default router;
