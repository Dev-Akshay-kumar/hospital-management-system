import React, { useEffect, useState } from "react";
import { Search, Star, MapPin, Calendar } from "lucide-react";
import { getDoctors } from "../../api/doctorApi"; // Example API
import { COLORS } from "../../utils/constants";

const DoctorListPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const data = await getDoctors();
        setDoctors(data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background px-6 py-10 md:px-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        Find <span className="text-blue-600">Doctors</span>
      </h1>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="flex items-center bg-white rounded-full shadow-md overflow-hidden">
          <input
            type="text"
            placeholder="Search by doctor name or specialization..."
            className="flex-1 px-4 py-3 outline-none text-gray-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-blue-600 hover:bg-teal-500 px-5 py-3">
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Doctor Cards */}
      {loading ? (
        <div className="text-center text-gray-500 mt-10">
          Loading doctors...
        </div>
      ) : filteredDoctors.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No doctors found matching “{search}”
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100"
            >
              <img
                src={doctor.image || "/images/doctor-placeholder.jpg"}
                alt={doctor.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{doctor.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {doctor.specialization || "General Physician"}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span>
                    {doctor.rating || "4.8"} ({doctor.reviews || 45} reviews)
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <MapPin className="w-4 h-4 mr-1 text-blue-600" />
                  <span>{doctor.hospital || "CityCare Hospital"}</span>
                </div>

                <button
                  onClick={() =>
                    (window.location.href = `/doctors/${doctor._id}`)
                  }
                  className="w-full bg-blue-600 hover:bg-teal-500 text-white py-2 rounded-full text-sm font-medium flex justify-center items-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorListPage;
