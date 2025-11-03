import React from "react";
import { Stethoscope, MapPin, Star } from "lucide-react";
import { Link } from "react-router";
import MainLayout from "../../layouts/MainLayout";

const HomePage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-[#eefcfb] to-[#f8fffe] text-gray-800">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-[#0A9586] to-[#088d7e] text-white py-20 px-6 md:px-16 rounded-xl shadow-lg">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Find the Right <span className="text-yellow-300">Doctor</span>{" "}
                for Your Health Needs
              </h1>
              <p className="text-lg opacity-90 mb-8">
                Search nearby hospitals and book online consultations with
                trusted specialists.
              </p>

              <Link
                to="/book"
                className="inline-flex items-center gap-2 bg-white text-[#0A9586] font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-[#0A9586] hover:text-white hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Stethoscope className="w-5 h-5" />
                Book Consultation
              </Link>
            </div>

            <div className="flex-1 text-center md:text-right">
              <img
                src="/images/healthcare-illustration.svg"
                alt="Healthcare"
                className="w-full max-w-md mx-auto drop-shadow-2xl rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Nearby Hospitals Section */}
        <section className="py-16 px-6 md:px-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold mb-10 text-center">
              Nearby <span className="text-[#0A9586]">Hospitals</span>
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              {[1, 2, 3].map((id) => (
                <div
                  key={id}
                  className="bg-gradient-to-br from-white to-[#f0fdfa] p-6 rounded-2xl shadow-md border border-[#0A9586]/20 hover:shadow-2xl hover:border-[#0A9586]/50 hover:bg-[#e8fffa] transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center mb-4">
                    <MapPin className="text-[#0A9586] mr-2" />
                    <h3 className="font-semibold text-lg text-gray-800">
                      CityCare Hospital
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Multi-specialty hospital with 24/7 emergency services and
                    expert doctors.
                  </p>
                  <Link
                    to="/hospitals"
                    className="text-[#0A9586] font-medium hover:text-[#06786b] transition-colors duration-300"
                  >
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top Rated Doctors */}
        <section className="py-16 px-6 md:px-16 bg-[#f8fffe]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold mb-10 text-center">
              Top Rated <span className="text-[#0A9586]">Doctors</span>
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              {[1, 2, 3].map((id) => (
                <div
                  key={id}
                  className="bg-gradient-to-br from-white to-[#e6fffa] p-6 rounded-2xl shadow-md border border-[#0A9586]/20 hover:bg-[#e0fffb] hover:shadow-2xl hover:border-[#0A9586]/40 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={`https://randomuser.me/api/portraits/men/${
                        id * 10
                      }.jpg`}
                      alt="Doctor"
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#0A9586]/70"
                    />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        Dr. Ramesh Kumar
                      </h3>
                      <p className="text-sm text-gray-500">Cardiologist</p>
                      <div className="flex items-center mt-1 text-yellow-500">
                        <Star className="w-4 h-4" />
                        <span className="ml-1 text-sm text-gray-600">
                          4.9 (220 reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">
                    12+ years of experience in treating complex heart
                    conditions.
                  </p>
                  <Link
                    to="/doctors/1"
                    className="text-[#0A9586] font-medium hover:text-[#056e62] transition duration-300"
                  >
                    View Profile →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-[#0A9586] to-[#088d7e] text-white rounded-lg py-16 px-6 md:px-16 mt-10 shadow-lg">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Book an Online Consultation Instantly
            </h2>
            <p className="mb-8 text-lg opacity-90">
              Get connected with verified doctors and receive expert medical
              advice from home.
            </p>
            <Link
              to="/book"
              className="inline-flex items-center gap-2 bg-white text-[#0A9586] font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-[#0A9586] hover:text-white hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <Stethoscope className="w-5 h-5" />
              Book Consultation
            </Link>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default HomePage;
