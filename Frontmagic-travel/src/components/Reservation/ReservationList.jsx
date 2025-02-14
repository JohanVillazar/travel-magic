import { useEffect, useState } from "react";

const ReservationsList = ({ userId }) => {
  const [reservations, setReservations] = useState([]);

  // Simulación de una API o Fetch real
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/reservations/user/${user._id}`);
        const data = await response.json();
        console.log("Reservas obtenidas:", data);
        setReservations(data); // Guardamos las reservas en el estado
      } catch (error) {
        console.error("Error al obtener reservas:", error);
      }
    };

    if (userId) {
      fetchReservations();
    }
  }, [userId]);

  return (
    <div>
      <h2>Mis Reservas</h2>
      {reservations.length > 0 ? (
        <ul>
          {reservations.map((res) => (
            <li key={res._id}>
              <p><strong>Reserva ID:</strong> {res._id}</p>
              <p><strong>Hotel:</strong> {res.hotelId?.name || "Desconocido"}</p>
              <p><strong>Precio Total:</strong> {res.totalPrice}</p>
              <p><strong>Fechas:</strong> {res.dates?.join(", ")}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes reservas.</p>
      )}
    </div>
  );
};

export default ReservationsList;
