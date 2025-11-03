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
      <div className="text-center mt-20 text-gray-500 animate-pulse">
        Loading doctor details...
      </div>
    );

  if (!doctor)
    return (
      <div className="text-center mt-20 text-gray-500">Doctor not found.</div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f9f9] via-white to-[#e9fdf9] px-6 py-10 md:px-16">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <img
            src={doctor.image || "/images/doctor-placeholder.jpg"}
            alt={doctor.name}
            className="w-full md:w-1/3 h-72 md:h-auto object-cover border-b md:border-b-0 md:border-r border-gray-200"
          />
          <div className="p-8 flex-1">
            <h2 className="text-3xl font-bold text-[#0A9586] mb-1">
              {doctor.name}
            </h2>
            <p className="text-gray-600 mb-3 text-lg">
              {doctor.specialization}
            </p>

            <div className="flex items-center text-yellow-500 mb-4">
              <Star className="w-5 h-5 fill-yellow-400" />
              <span className="ml-1 text-gray-700">
                {doctor.rating || 4.8} ({doctor.reviews || 87} reviews)
              </span>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed mb-5">
              {doctor.description ||
                "Experienced and compassionate doctor specializing in personalized patient care."}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-gray-700 text-sm font-medium">
                <GraduationCap className="w-5 h-5 text-[#0A9586] mr-2" />
                <span>{doctor.qualification || "MBBS, MD"}</span>
              </div>
              <div className="flex items-center text-gray-700 text-sm font-medium">
                <Briefcase className="w-5 h-5 text-[#0A9586] mr-2" />
                <span>{doctor.experience || "10 years experience"}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() =>
                  (window.location.href = `/consult/${doctor._id}`)
                }
                className="flex items-center gap-2 bg-gradient-to-r from-[#0A9586] to-teal-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
              >
                <MessageSquare className="w-4 h-4" /> Book Online Consultancy
              </button>

              <button
                onClick={() =>
                  (window.location.href = `/appointments/${doctor._id}`)
                }
                className="flex items-center gap-2 border border-[#0A9586] text-[#0A9586] px-6 py-3 rounded-full font-semibold hover:bg-[#0A9586]/10 hover:shadow transition-all"
              >
                <Calendar className="w-4 h-4" /> Schedule Visit
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="p-8 border-t border-gray-100 bg-gradient-to-b from-white to-[#f9fffd]">
          <h3 className="text-xl font-semibold text-[#0A9586] mb-4">
            Patient Reviews
          </h3>
          {doctor.reviewsList && doctor.reviewsList.length > 0 ? (
            <div className="space-y-5">
              {doctor.reviewsList.map((r, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-xl p-4 hover:bg-[#f9fffd] hover:shadow-sm transition"
                >
                  <p className="text-gray-800 font-semibold">{r.user}</p>
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
