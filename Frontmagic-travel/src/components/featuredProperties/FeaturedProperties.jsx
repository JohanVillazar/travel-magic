import useFetch from "../../hooks/useFetch";
import "./featuredProperties.scss";
import FeaturedItem from "./FeaturedItem";

const FeaturedProperties = () => {
  const { data, loading } = useFetch(
    "http://localhost:5000/api/hotels?featured=true&limit=12"
  );

  return (
    <div className="res container">
      <h1 className="homeTitle mb-4">Mas Visitados</h1>

      <div className="fp row gy-4">
        {loading || data.length === 0 ? (
          <div className="lds-roller mx-auto">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <>
            {data.map((item) => (
              <div className="col-md-6 col-lg-3">
                <FeaturedItem key={item._id} item={item} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default FeaturedProperties;
