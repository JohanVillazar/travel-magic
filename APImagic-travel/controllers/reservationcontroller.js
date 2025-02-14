// controllers/reservationController.js
import Reservation from "../models/Reservation.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const createReservation = async (req, res) => {
  try {
    const { userId, hotelId, roomIds, dates } = req.body;

    // Validación: Verificar que `roomIds` no sea undefined ni vacío
    if (!roomIds || !Array.isArray(roomIds) || roomIds.length === 0) {
      return res.status(400).json({ message: "Debes seleccionar al menos una habitación." });
    }

    // Obtener las habitaciones seleccionadas
    const rooms = await Room.find({ _id: { $in: roomIds } });

    if (rooms.length === 0) {
      return res.status(404).json({ message: "Las habitaciones no fueron encontradas." });
    }

    // Verificar disponibilidad
    const unavailableRooms = rooms.filter((room) =>
      room.unavailableDates.some((date) => dates.includes(new Date(date).toISOString()))
    );

    if (unavailableRooms.length > 0) {
      return res.status(400).json({ message: "Una o más habitaciones no están disponibles en las fechas seleccionadas." });
    }

    // Generar un ID único para la reserva
    const reservationId = Math.random().toString(36).substring(2, 12);

    const numberOfNights = Array.isArray(dates) ? dates.length : 0;
    if (numberOfNights === 0) {
      return res.status(400).json({ message: "Las fechas son requeridas para calcular el precio." });
    }

    const totalPrice = rooms.reduce((acc, room) => {
      const price = room.price || 0; // Asegurar que se usa "price" en lugar de "pricePerNight"
      return acc + (price * numberOfNights);
    }, 0);

    if (isNaN(totalPrice) || totalPrice <= 0) {
      return res.status(400).json({ message: "Error al calcular el precio total. Verifica las habitaciones y fechas." });
    }


    // Crear la nueva reserva
    const newReservation = new Reservation({
      userId,
      hotelId,
      roomIds,
      dates,
      reservationId,
      totalPrice
    });

    const savedReservation = await newReservation.save();

    // Marcar las habitaciones como no disponibles en las fechas seleccionadas
    await Room.updateMany(
      { _id: { $in: roomIds } },
      { $push: { unavailableDates: { $each: dates } } }
    );

    // Obtener datos del hotel y usuario
    const hotel = await Hotel.findById(hotelId);
    const user = await User.findById(userId);

    if (!hotel) return res.status(404).json({ message: "Hotel no encontrado" });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    // Obtener los números de las habitaciones reservadas
    const roomNumbers = rooms.map((room) => room.number); // Asegurar que se obtienen los números de habitación

    res.status(201).json({
      reservationId: savedReservation.reservationId,
      user: { username: user.username },
      hotel: { name: hotel.name, description: hotel.desc },
      rooms: roomNumbers,
      totalPrice,
      dates: savedReservation.dates
    });

  } catch (err) {
    console.error("Error al crear la reserva:", err);
    res.status(500).json({ message: "Error al crear la reserva", error: err.message });
  }
};


export const getReservationId = async (req, res) => {
  try {
    const { reservationId } = req.params;

    const reservation = await Reservation.findOne({ reservationId })
      .populate("userId", "username")
      .populate("hotelId", "name description")
      .populate("roomIds", "number"); // Asegurar que coincide con el esquema

    if (!reservation) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    res.status(200).json({
      reservation,
      hotelName: reservation.hotelId.name,
      hotelDescription: reservation.hotelId.description,
      roomNumbers: reservation.roomIds.map(room => room.number),
      user: { username: reservation.userId.username }
    });

  } catch (err) {
    console.error("Error al obtener la reserva:", err);
    res.status(500).json({ message: "Error al obtener la reserva", error: err.message });
  }
};

export const getReservationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Buscar reservas por userId (corregido)
    const reservations = await Reservation.find({ userId })  
      .populate("userId", "username email phone")  
      .populate("hotelId", "name description")  
      .populate("roomIds", "number");  

    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ message: "No se encontraron reservas para este usuario" });
    }

    res.status(200).json(reservations);
  } catch (err) {
    console.error("Error obteniendo reservas:", err);
    res.status(500).json({ message: "Error obteniendo reservas", error: err.message });
  }
};

export const actualizarEstadoReserva = async (req, res) => {
  try {
    const { estado } = req.body;
    const reserva = await Reservation.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true }
    );

    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    res.json(reserva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


