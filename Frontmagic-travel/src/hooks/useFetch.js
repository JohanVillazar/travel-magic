import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    let isMounted = true; // Para evitar actualizar el estado si el componente se desmonta

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        if (isMounted) {
          setData(res.data);
          const images = res.data?.photos?.map((item) => ({
            original: item,
            thumbnail: item,
          }));
          setImages(images || []);
        }
      } catch (err) {
        if (isMounted) setError(err.message || "Error al obtener datos");
      }
      setLoading(false);
    };

    fetchData();

    return () => {
      isMounted = true; // Evitar actualización de estado después del desmontaje
    };
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
      const images = res.data?.photos?.map((item) => ({
        original: item,
        thumbnail: item,
      }));
      setImages(images || []);
    } catch (err) {
      setError(err.message || "Error al recargar datos");
    }
    setLoading(false);
  };

  return { data, loading, error, images, reFetch };
};

export default useFetch;


