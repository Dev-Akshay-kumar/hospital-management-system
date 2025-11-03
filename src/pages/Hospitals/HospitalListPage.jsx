import React, { useEffect, useState } from "react";
import { MapPin, Search, Phone, Star } from "lucide-react";
import { calcDistance } from "../../utils/calcDistance";
import { COLORS, DEFAULT_LOCATION } from "../../utils/constants";
import { getHospitals } from "../../api/hospitalApi"; // example API call

const HospitalListPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userLocation, setUserLocation] = useState(DEFAULT_LOCATION);
  const [loading, setLoading] = useState(true);

  // Fetch user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        },
        () => setUserLocation(DEFAULT_LOCATION)
      );
    }
  }, []);

  // Fetch hospital data (mock or API)
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoading(true);
        const data = await getHospitals(); // from API
        setHospitals(data);
      } catch (err) {
        console.error("Failed to fetch hospitals:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHospitals();
  }, []);

  // Filter hospitals based on search term
  const filteredHospitals = hospitals.filter((h) =>
    h.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-accentdark px-6 py-10 md:px-16">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Nearby <span className="text-blue-600">Hospitals</span>
        </h1>
        <p className="text-muted text-base">
          Find trusted hospitals near your location for your medical needs.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search hospitals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-3 text-gray-700 outline-none"
          />
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Hospital Cards */}
      {loading ? (
        <div className="text-center text-gray-500 mt-20">
          Loading hospitals...
        </div>
      ) : filteredHospitals.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          No hospitals found for "{searchTerm}"
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {filteredHospitals.map((hospital) => {
            const distance = calcDistance(
              userLocation.lat,
              userLocation.lon,
              hospital.location?.lat,
              hospital.location?.lon
            );

            return (
              <div
                key={hospital._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100"
              >
                <img
                  src={hospital.image || "/images/hospital-placeholder.jpg"}
                  alt={hospital.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">
                    {hospital.name}
                  </h3>
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-1 text-blue-600" />
                    <span>{hospital.city || "Unknown City"}</span>
                    {distance > 0 && (
                      <span className="ml-auto text-gray-400">
                        {distance} km away
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {hospital.description ||
                      "Multi-specialty hospital providing 24/7 emergency services and top doctors."}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-yellow-500 text-sm">
                      <Star className="w-4 h-4" />
                      <span className="ml-1 text-gray-600">
                        {hospital.rating || "4.5"} ({hospital.reviews || 100}{" "}
                        reviews)
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        (window.location.href = `/hospitals/${hospital._id}`)
                      }
                      className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Call to Action */}
      <div className="fixed bottom-6 right-6">
        <a
          href="/book"
          className="bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 hover:scale-105 transition"
        >
          <Phone className="w-4 h-4" />
          Book Consultation
        </a>
      </div>
    </div>
  );
};

export default HospitalListPage;
