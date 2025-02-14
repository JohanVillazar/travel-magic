import useFetch from "../../hooks/useFetch";
import "./propertyList.scss";
import { useNavigate } from "react-router-dom";

const PropertyList = () => {
  const { data, loading } = useFetch(
    "http://localhost:5000/api/hotels/countByType"
  );
  //console.log(data)
const navigate = useNavigate();

  const images = [
    "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1977342/pexels-photo-1977342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ];

  const right = () => {
    var right = document.querySelector(".pListMobile");
    right.scrollBy(100, 0);
  };

  const left = () => {
    var right = document.querySelector(".pListMobile");
    right.scrollBy(-100, 0);
  };

  return (
    <div className="list container" id="list">
      <h1 className="homeTitle mb-3">Variedad de Alojamientos</h1>
      <div className="pList row">
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
          </div>
        ) : (
          <>
            {images.map((img, i) => (
              <div className="col">
                <div
                  className="pListItem"
                  onClick={() => {
                    navigate("/hotels", {
                      state: { type: data[i]?.type },
                    });
                  }}
                  key={i}
                >
                  <img src={img} alt="" className="pListImg" />
                  <div className="pListTitles">
                    <h1>{data[i]?.type}</h1>
                    <h2>
                      {data[i]?.count} {data[i]?.type}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="mobile">
        <div className="pListMobile">
          {data.length !== 0 && (
            <div className="flasher right">
              <i class="bx bx-chevrons-right bx-flashing" onClick={right}></i>
            </div>
          )}
          {data.length !== 0 && (
            <div className="flasher left">
              <i class="bx bx-chevrons-left bx-flashing" onClick={left}></i>
            </div>
          )}
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
            </div>
          ) : (
            <>
              {data &&
                images.map((img, i) => (
                  <div
                    className="pListItemMobile me-3"
                    onClick={() => {
                      navigate("/hotels", {
                        state: { type: data[i]?.type },
                      });
                    }}
                    key={i}
                  >
                    <img src={img} alt="" className="pListImg" />

                    <div className="pListTitles">
                      <h1>{data[i]?.type}</h1>
                      <h2>
                        {data[i]?.count} {data[i]?.type}
                      </h2>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyList;
