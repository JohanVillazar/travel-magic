import express from "express";
import{
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  updateRoomAvailability


}from "../controllers/room.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();
//  Crear una nueva habitación (solo admin)
router.post("/:hotelId",  createRoom , verifyToken);

//  Obtener todas las habitaciones
router.get("/", getRooms);

//  Obtener una habitación por ID
router.get("/:id", getRoomById);

//  Actualizar una habitación (solo admin)
router.put("/:id",  updateRoom);

//  Eliminar una habitación y actualizar el hotel (solo admin)
router.delete("/:id/:hotelId",  deleteRoom);

//  Actualizar disponibilidad de una habitación
router.put("/availability/:id", updateRoomAvailability);


export default router;
