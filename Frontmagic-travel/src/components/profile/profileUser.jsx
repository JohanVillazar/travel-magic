import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "./profileUser.css";
import Navbar from "../navbar/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {

  const { user } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    //console.log("Usuario en el perfil:", user);
    if (!user || !user._id) return;

    const fetchUserData = async () => {
      try {

        const response = await axios.get(`http://localhost:5000/api/reservations/user/${user._id}`);
        //console.log("Reservas obtenidas ", response.data);

        setReservations(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Error al obtener reservas:", err);
        setError("Error al obtener reservas");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  // Función para actualizar el estado de la reserva
  const handleStatusChange = async (_id, nuevoEstado, type) => {
    // Buscar la reserva correspondiente
    const reserva = reservations.find((res) => res._id === _id);
    if (!reserva) return;
  
    if (nuevoEstado === "cancelada") {
      const today = new Date();
      
      // Obtener la última fecha de la reserva
      const lastDate = new Date(reserva.dates[reserva.dates.length - 1]);
  
      // Calcular la fecha límite (un día antes de la última fecha)
      const cancellationLimit = new Date(lastDate);
      cancellationLimit.setDate(cancellationLimit.getDate() - 1);
  
      // Si hoy es igual o después del límite, mostrar alerta y no permitir la cancelación
      if (today >= cancellationLimit) {
        toast.error("Por políticas del hotel no se permite la cancelación un día antes del check-in.");
        return; // Detiene la ejecución de la función
      }
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/${_id}/estado`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ estado: nuevoEstado }),
      });
  
      if (!response.ok) throw new Error("Error al actualizar el estado");
  
      // Actualizar estado local de las reservas después del cambio
      setReservations((prevReservations) =>
        prevReservations.map((res) =>
          res._id === _id ? { ...res, estado: nuevoEstado } : res
        )
      );
  
      console.log("Estado de reserva actualizado con éxito.");
    } catch (error) {
      console.error("Error al cambiar el estado de la reserva:", error);
    }
  };
  

  if (!user) return <p className="text-center text-gray-700">No has iniciado sesión.</p>;
  if (loading) return <p className="text-center text-gray-700">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <Navbar /> {Navbar}
      <div className="container mx-auto p-4">

      </div>
      <div className="container">

        <div className="profile-container">
          <div className="user-card">
            <h2 >Mi Cuenta</h2>
            <p><strong>Nombre:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Teléfono:</strong> {user.phone}</p>
            <p><strong>Pais:</strong> {user.country}</p>
          </div>

        </div>
        <h3 >Mis Reservas</h3>

        {reservations.length > 0 ? (
          <ul className="reservation-list">
            {reservations.map((res) => (
              <li key={res._id} className="reservation-item">
                <p className="hotel-item"><strong>Hotel:</strong> {res.hotelId?.name || "Desconocido"}</p>


                <p><strong>Habitación:</strong> {res.roomIds?.length > 0 ? res.roomIds.map(room => room.number || "N/A").join(", ") : "No especificado"}</p>
                <p><strong>Fechas:</strong> {res.dates?.length > 0 ? res.dates.map(date => new Date(date).toLocaleDateString()).join(" - ") : "No especificadas"}</p>
                <p><strong>Precio Total:</strong> ${res.totalPrice ? res.totalPrice.toLocaleString() : "0"}</p>
                <p><strong>Numero Reserva:</strong> {res.reservationId}</p>
                <p><strong>Estado:</strong> <span className={`estado ${res.estado}`}>{res.estado}</span></p>
                <p className="hotel-item"><strong>Gestionar:</strong> </p>

                {}
                <select
                  className={`estado-select ${res.estado}`}
                  value={res.estado}
                  onChange={(e) => handleStatusChange(res._id, e.target.value)}
                  disabled={res.estado === "cancelada" || res.estado === "confirmada"} // Deshabilitar si el estado es "cancelada"
                >
                  <option className="confirm" value="confirmada">Confirmada</option>
                  <option className="cancel" value="cancelada">Cancelada</option>
                  <option className="pend" value="pendiente">Pendiente</option>
                </select>

              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No tienes reservas.</p>
        )}
      </div>
    </>
  );
};




export default UserProfile;
