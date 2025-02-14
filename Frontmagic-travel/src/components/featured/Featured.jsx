import useFetch from "../../hooks/useFetch.js";
import { useNavigate } from "react-router-dom";
import "./featured.scss";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:5000/api/hotels/countByCity?cities=bucaramanga,bogota,medellin,cartagena,santa marta,manizales,chicamocha,cali"
  );
  const navigate = useNavigate();

  const cities = [
    { name: "Bucaramanga", image: "https://images.pexels.com/photos/15824605/pexels-photo-15824605/free-photo-of-ciudad-arte-punto-de-referencia-viaje.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Bogota", image: "https://cdn.pixabay.com/photo/2019/09/07/02/24/bogota-4457796_1280.jpg" },
    { name: "Medellin", image: "https://cdn.pixabay.com/photo/2013/09/15/07/32/medellin-182341_960_720.jpg" },
    { name: "Cartagena", image: "https://cdn.pixabay.com/photo/2018/05/17/23/26/boat-3409980_960_720.jpg" },
    { name: "Santa Marta", image: "https://cdn.pixabay.com/photo/2018/07/10/17/53/colombia-3529272_960_720.jpg" },
    { name: "Manizales", image: "https://cdn.pixabay.com/photo/2019/10/23/01/12/church-4570108_1280.jpg" },
    { name: "Chicamocha", image: "https://cdn.pixabay.com/photo/2017/06/15/01/08/cannon-2403807_1280.jpg" },
    { name: "Cali", image: "https://cdn.pixabay.com/photo/2015/04/02/21/06/church-704321_960_720.jpg" }
  ];

  if (loading) {
    return (
      <div className="lds-roller">
        <div></div><div></div><div></div><div></div>
        <div></div><div></div><div></div><div></div>
      </div>
    );
  }

  if (error) {
    return <p style={{ color: "red" }}>Error al cargar los datos: {error}</p>;
  }

  // Aseguramos que 'data' tenga la longitud correcta
  if (data.length !== cities.length) {
    return <p style={{ color: "red" }}>Datos incompletos o error en la respuesta del servidor.</p>;
  }

  return (
    <div className="container">
      <h1 className="homeTitle mb-4">Principales Ciudades</h1>
      <div className="featured row gy-3 gx-md-3 gx-3 justify-content-center">
        {cities.map((city, index) => (
          <div key={city.name} className="col-md-6 col-lg-3 col-6">
            <div
              className="featuredItem"
              onClick={() => {
                navigate("/hotels", {
                  state: { destination: city.name.toLowerCase() },
                });
              }}
            >
              <img
                src={city.image}
                alt={city.name}
                className="featuredImg img-fluid"
              />
              <div className="featuredTitles">
                <h1>{city.name}</h1>
                <h2>{data[index] || 0} Alojamientos</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
