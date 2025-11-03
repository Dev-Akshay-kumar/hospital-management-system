import React from "react";
import { Search, Stethoscope, MapPin, Star } from "lucide-react";
import { Link } from "react-router";
import MainLayout from "../../layouts/MainLayout";

const HomePage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-background text-accentdark">
        {/* Hero Section */}
        <section className="relative bg-linear-to-r from-blue-600 to-indigo-600 text-white py-20 px-6 md:px-16 rounded-xl">
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

              {/* Search Bar */}
              <div className="flex rounded-2xl">
                <Link
                  to="/book"
                  className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition"
                >
                  <Stethoscope className="w-5 h-5" />
                  Book Consultation
                </Link>
              </div>
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
        <section className="py-16 px-6 md:px-16 bg-surface">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold mb-8 text-center">
              Nearby <span className="text-blue-600">Hospitals</span>
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              {[1, 2, 3].map((id) => (
                <div
                  key={id}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
                >
                  <div className="flex items-center mb-4">
                    <MapPin className="text-blue-600 mr-2" />
                    <h3 className="font-semibold text-lg">CityCare Hospital</h3>
                  </div>
                  <p className="text-gray-600 mb-3">
                    Multi-specialty hospital with 24/7 emergency services and
                    expert doctors.
                  </p>
                  {/* <Link
                  to="/hospitals"
                  className="text-blue-600 font-medium hover:underline"
                >
                  View Details →
                </Link> */}
                  <Link
                    to="/hospitals"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top Rated Doctors */}
        <section className="py-16 px-6 md:px-16 bg-background">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold mb-8 text-center">
              Top Rated <span className="text-blue-600">Doctors</span>
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              {[1, 2, 3].map((id) => (
                <div
                  key={id}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={`https://randomuser.me/api/portraits/men/${
                        id * 10
                      }.jpg`}
                      alt="Doctor"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">
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
                    className="text-blue-600 font-medium hover:underline"
                  >
                    View Profile →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-linear-to-r rounded-lg from-indigo-600 to-blue-600 text-white py-16 px-6 md:px-16">
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
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition"
            >
              <Stethoscope className="w-5 h-5" />
              Book Consultation
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-accentdark text-blue-700 py-8 text-center text-sm">
          <p>
            © {new Date().getFullYear()} HealthConnect — Designed with ❤️ for
            better healthcare.
          </p>
        </footer>
      </div>
    </MainLayout>
  );
};

export default HomePage;
