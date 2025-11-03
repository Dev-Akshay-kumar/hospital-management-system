import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getDoctorById } from "../../api/doctorApi";
import {
  Star,
  GraduationCap,
  Briefcase,
  MessageSquare,
  Calendar,
} from "lucide-react";
import { formatDate } from "../../utils/formatDate";

const DoctorDetailPage = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const data = await getDoctorById(id);
        setDoctor(data);
      } catch (err) {
        console.error("Error fetching doctor details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  if (loading)
    return (
      <div className="text-center mt-20 text-gray-500">
        Loading doctor details...
      </div>
    );

  if (!doctor)
    return (
      <div className="text-center mt-20 text-gray-500">Doctor not found.</div>
    );

  return (
    <div className="min-h-screen bg-background px-6 py-10 md:px-16">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
        <div className="flex flex-col md:flex-row">
          <img
            src={doctor.image || "/images/doctor-placeholder.jpg"}
            alt={doctor.name}
            className="w-full md:w-1/3 h-64 md:h-auto object-cover"
          />
          <div className="p-6 md:p-8 flex-1">
            <h2 className="text-2xl font-bold mb-1">{doctor.name}</h2>
            <p className="text-gray-600 mb-3">{doctor.specialization}</p>
            <div className="flex items-center text-yellow-500 mb-3">
              <Star className="w-5 h-5" />
              <span className="ml-1 text-gray-700">
                {doctor.rating || 4.8} ({doctor.reviews || 87} reviews)
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              {doctor.description ||
                "Experienced and compassionate doctor specializing in personalized patient care."}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-gray-700 text-sm">
                <GraduationCap className="w-5 h-5 text-blue-600 mr-2" />
                <span>{doctor.qualification || "MBBS, MD"}</span>
              </div>
              <div className="flex items-center text-gray-700 text-sm">
                <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
                <span>{doctor.experience || "10 years experience"}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() =>
                  (window.location.href = `/consult/${doctor._id}`)
                }
                className="flex items-center bg-blue-600 text-white px-5 py-3 rounded-full font-medium hover:bg-blue-700 transition"
              >
                <MessageSquare className="w-4 h-4 mr-2" /> Book Online
                Consultancy
              </button>
              <button
                onClick={() =>
                  (window.location.href = `/appointments/${doctor._id}`)
                }
                className="flex items-center border border-blue-600 text-blue-600 px-5 py-3 rounded-full font-medium hover:bg-blue-50 transition"
              >
                <Calendar className="w-4 h-4 mr-2" /> Schedule Visit
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="p-6 md:p-8 border-t border-gray-100">
          <h3 className="text-xl font-semibold mb-4">Patient Reviews</h3>
          {doctor.reviewsList && doctor.reviewsList.length > 0 ? (
            <div className="space-y-4">
              {doctor.reviewsList.map((r, i) => (
                <div key={i} className="border-b pb-3">
                  <p className="text-gray-800 font-medium">{r.user}</p>
                  <p className="text-sm text-gray-600 italic mb-1">
                    “{r.comment}”
                  </p>
                  <p className="text-xs text-gray-400">{formatDate(r.date)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailPage;
