import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import useHospitals from "../../hooks/useHospitals";
import useDoctors from "../../hooks/useDoctors";
import { calcDistance } from "../../utils/calcDistance";
import { formatDate } from "../../utils/formatDate";
import Loader from "../../components/common/Laoder";

const HospitalDetailsPage = () => {
  const { id } = useParams();
  const { hospitals, fetchHospitals } = useHospitals();
  const { doctors, fetchDoctorsByHospital } = useDoctors();
  const { userLocation } = useLocation();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!hospitals.length) await fetchHospitals();
      const found = hospitals.find((h) => h.id === parseInt(id));
      setHospital(found);
      if (found) await fetchDoctorsByHospital(found.id);
      setLoading(false);
    };
    loadData();
  }, [id, hospitals, fetchHospitals, fetchDoctorsByHospital]);

  if (loading || !hospital) return <Loader />;

  const distance =
    userLocation && hospital?.location
      ? calcDistance(
          userLocation.lat,
          userLocation.lng,
          hospital.location.lat,
          hospital.location.lng
        ).toFixed(2)
      : null;

  return (
    <MainLayout>
      <section className="container mx-auto px-6 py-10">
        {/* Hospital Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-accentdark">
              {hospital.name}
            </h1>
            <p className="text-muted mt-2">{hospital.address}</p>
            {distance && (
              <p className="text-sm text-primary mt-1">
                📍 {distance} km away from your location
              </p>
            )}
          </div>
          <div className="mt-4 md:mt-0">
            <RatingStars rating={hospital.rating} />
            <p className="text-sm text-muted mt-1">
              {hospital.reviews?.length || 0} Reviews
            </p>
          </div>
        </div>

        {/* About */}
        <div className="bg-surface shadow-md rounded-xl p-6 mb-10">
          <h2 className="text-xl font-semibold text-accentdark mb-3">
            About Hospital
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {hospital.description ||
              "No detailed information provided for this hospital."}
          </p>
        </div>

        {/* Doctors List */}
        <div>
          <h2 className="text-xl font-semibold text-accentdark mb-4">
            Available Doctors
          </h2>
          {doctors.length === 0 ? (
            <p className="text-muted">No doctors available currently.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-surface shadow-md rounded-xl p-5 hover:shadow-lg transition"
                >
                  <div className="flex items-center space-x-4 mb-3">
                    <img
                      src={doc.photo || "/doctor-avatar.png"}
                      alt={doc.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg text-accentdark">
                        {doc.name}
                      </h3>
                      <p className="text-sm text-muted">{doc.specialization}</p>
                    </div>
                  </div>

                  <RatingStars rating={doc.rating} />

                  <p className="text-sm text-gray-600 mt-3">
                    Experience: <b>{doc.experience} years</b>
                  </p>
                  <p className="text-sm text-gray-600">
                    Qualification: <b>{doc.qualification}</b>
                  </p>

                  <button
                    onClick={() =>
                      alert(`Booking consultation with ${doc.name}...`)
                    }
                    className="w-full mt-4 bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Book Consultation
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Token Queue Section */}
        <div className="mt-12 bg-surface p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-accentdark mb-3">
            Clinical Visit Token Queue
          </h2>
          <p className="text-muted text-sm mb-4">
            View your live queue number and estimated consultation time.
          </p>
          <div className="bg-background p-4 rounded-lg">
            <p className="font-semibold text-primary text-lg">
              Your Token: <span className="text-accentdark">#12</span>
            </p>
            <p className="text-sm text-muted">
              Estimated time: {formatDate(new Date())}
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HospitalDetailsPage;
