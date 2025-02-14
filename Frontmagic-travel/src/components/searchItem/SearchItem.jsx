import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import "./searchItem.scss";

const SearchItem = ({ item }) => {

  return (
    <div className="col-md-12 col-sm-6">
      <div
        className="searchItem"
      >
        <img src={item.photos[0]} alt="" className="siImg" />

        <div className="mobileDesc">
          <h4 className="mt-3">{item.name}</h4>
          {item.rating && (
            <Rating
              name="half-rating-read"
              defaultValue={item.rating}
              precision={0.5}
              readOnly
            />
          )}

          <div className="mobileDescFooter">
            <div className="left">
              <h5>${item.cheapestPrice}</h5>
              <h6>Por Noche</h6>
            </div>
            <div className="right">
              <Link to={`/hotels/${item._id}`}>
                <button>Reserva Ahora</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="siDesc">
          <h1 className="siTitle">{item.name}</h1>
          <span className="siDistance">{item.distance} del Centro</span>
          <span className="siTaxiOp">Desayuno gratis, Almuerzo gratis el Primer dia</span>
          <span className="siSubtitle">
            Todas las Comodidades !
          </span>
          <span className="siCancelOp">Cancelacion gratis </span>
          <span className="siCancelOpSubtitle">
            Puedes cancelar 48 horas antes!
          </span>
        </div>
        <div className="siDetails">
          {item.rating && (
            <div className="rating-cont d-flex justify-content-end">
              <Rating
                name="half-rating-read"
                defaultValue={item.rating}
                precision={0.5}
                readOnly
              />
            </div>
          )}
          <div className="siDetailTexts">
            <span className="siPrice">${item.cheapestPrice}</span>
            <span className="siTaxOp">Impuestos incluidos</span>
            <Link to={`/hotels/${item._id}`}>
              <button className="siCheckButton">ver disponibilidad</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
