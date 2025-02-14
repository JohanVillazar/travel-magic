import { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.scss";
import useFetch from "../../hooks/useFetch";
import { AuthContext, AuthContextProvider } from "../../context/AuthContext"; // ✅ Solo aquí importamos AuthContext
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import success from "./success-svgrepo-com.svg";


const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading } = useFetch(
    `http://localhost:5000/api/hotels/room/${hotelId}`
  );
  const { dates } = useContext(SearchContext);
  const [modal, setModal] = useState(false);

  const [copy, setCopy] = useState(false);


  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumbers) => {
    const isFound = roomNumbers.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleSelect = (e, roomId) => {
    const checked = e.target.checked;

    setSelectedRooms(prev =>
      checked ? [...prev, roomId] : prev.filter(id => id !== roomId)
    );
  };


  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const userId = user ? user._id : null;

  const [reservationInfo, setReservationInfo] = useState(null);


  const handleClick = async () => {
    if (!userId) {
      alert("Debes iniciar sesión para hacer una reserva.");
      return;
    }

    try {
      //console.log("Habitaciones seleccionadas antes de enviar:", selectedRooms);

      const roomDetails = await Promise.all(
        selectedRooms.map(async (roomId) => {
          const res = await axios.get(`http://localhost:5000/api/rooms/${roomId}`);
          return res.data; // Suponiendo que res.data contiene la habitación con su precio
        })
      );
      //console.log("Datos completos de habitaciones:", roomDetails);

      //calcular el precio basado en las fechas
      const numberOfNights = alldates.length;
      const totalPrice = roomDetails.reduce((total, room) => total + (room.price || 0 * numberOfNights), 0);
     // console.log("Precio total calculado:", totalPrice);

      if (isNaN(totalPrice) || totalPrice === 0) {
        alert("Error al calcular el precio total.");
        return;
      }

      const reservationData = {
        userId,
        hotelId,
        roomIds: selectedRooms,
        dates: alldates,
        totalPrice,
      };

     // console.log("Datos enviados a la API:", JSON.stringify(reservationData, null, 2));




      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const res = await axios.post(
        "http://localhost:5000/api/reservations",
        reservationData,
        { headers }
      );

      //console.log("Respuesta de la API:", res.data);
      //console.log("Reserva creada:", res.data);

      setReservationInfo({
        id: res.data.reservationId,
        userName: res.data.user.username,
        hotelName: res.data.hotel.name,
        roomNumbers: res.data.rooms.join(", "),
        totalPrice: res.data.totalPrice,
        dates: res.data.dates,
      });

      setModal(true);
    } catch (error) {
      //console.error("Error al crear la reserva:", error);
    }
  };


  //console.log("Data desde API:", data);


  return (
    <div className="reserve">
      <ToastContainer autoClose={500} />
      <div className="rContainer">
        {modal === false && (
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="rClose"
            onClick={() => setOpen(false)}
          />
        )}
        {modal === false && (
          <>
            <div>
              <span>Selecciona las habitaciones :</span>
              <br />
              {loading ? (
                <div className="d-flex justify-content-center">
                  <div className="lds-hourglass"></div>
                </div>
              ) : data && data.length > 0 ? (
                data.map((item) => (
                  item ? (  // Verifica si item está definido
                    <div className="rItem" key={item._id}>
                      <div className="rItemInfo">
                        <div className="rTitle">{item.title || "No title"}</div>
                        <div className="rDesc">{item.desc || "No description"}</div>
                        <div className="rMax">
                          Max Personas: <b>{item.maxPeople}</b>
                        </div>
                        <div className="rPrice">{item?.price ? item.price : "No price"}</div>
                      </div>



                      <div className="rSelectRooms">
                        <div className="room">
                          <label>{item.number || "No number"}</label> {/* Usa item.number en lugar de item.roomNumbers */}
                          <input
                            type="checkbox"
                            value={item._id} // Usa _id para identificar la habitación
                            onChange={(e) => handleSelect(e, item._id)} // Guarda el _id en selectedRooms
                            disabled={!isAvailable(item)}
                          />
                        </div>
                      </div>


                    </div>



                  ) : null // Si item es null o undefined, no renderizar nada
                ))
              ) : (
                <p>No rooms available</p>
              )}
            </div>
            <button
              onClick={handleClick}
              className={selectedRooms.length === 0 ? "rButton active" : "rButton"}
              disabled={selectedRooms.length === 0}
            >
              Confirmar Reserva!
            </button>
          </>

        )}


        {modal === true && (
          <div className="feedback">
            <div className="d-flex justify-content-center">
              <img src={success} width="57" height="57" alt="" />
            </div>
            <p>listo! tu Reserva se confirmó</p>
            <p><b>Nombre :</b> {reservationInfo.userName}</p>
            <p><b>Hotel:</b> {reservationInfo.hotelName}</p>
            <p><strong>Precio total:</strong> ${reservationInfo.totalPrice.toLocaleString()}</p>
            <p><strong>Fechas:</strong> {reservationInfo.dates.map(date => new Date(date).toLocaleDateString()).join(" - ")}</p>

            <p className="id">
              <span className="book">Id reserva</span>: <span>{reservationInfo.id}</span>
              <i
                onClick={() => {
                  navigator.clipboard.writeText(reservationInfo.id);
                  setCopy(true);
                  setTimeout(() => {
                    setCopy(false);
                  }, 1000);
                }}
                className="bx ms-2 bx-copy tooltips"
              >
                {copy && <span className="tooltiptext">Copiado</span>}
              </i>
            </p>
            <div className="button-cont d-flex justify-content-center">
              <button
                onClick={() => {
                  navigate("/hotels", {
                    state: {
                      destination: "",
                      dates,
                      options: {
                        adult: 1,
                        children: 0,
                        room: 1,
                      },
                    },
                  });
                }}
                className="btn explore btn-md me-2 btn-primary"
                type="button"
              >
                Confirmar
              </button>
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="btn home btn-md btn-primary"
                type="button"
              >
                Pagina de Inicio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reserve;
