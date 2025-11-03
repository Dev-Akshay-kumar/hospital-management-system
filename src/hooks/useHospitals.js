import { useEffect, useState } from "react";
import { API_BASE_URL } from "../utils/constants";
import useLocation from "./useLocation";

const useHospitals = (medicalIssue = "") => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getDistance } = useLocation();

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${API_BASE_URL}/hospitals?issue=${medicalIssue}`
        );
        const data = await res.json();

        // Add distance from user location
        const withDistance = data.map((h) => ({
          ...h,
          distance: getDistance(h.lat, h.lng),
        }));

        setHospitals(withDistance);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHospitals();
  }, [medicalIssue, getDistance]);

  return { hospitals, loading, error };
};

export default useHospitals;
