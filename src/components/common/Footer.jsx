import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white mt-16">
      <div className="container mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-3">
            HealthConnect
          </h2>
          <p className="text-sm text-gray-300">
            Making healthcare accessible — find hospitals, consult doctors, and
            manage appointments easily.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-primary transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/hospitals" className="hover:text-primary transition">
                Hospitals
              </Link>
            </li>
            <li>
              <Link to="/doctors" className="hover:text-primary transition">
                Doctors
              </Link>
            </li>
            <li>
              <Link
                to="/appointments"
                className="hover:text-primary transition"
              >
                Appointments
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-gray-300 text-sm">📧 support@healthconnect.in</p>
          <p className="text-gray-300 text-sm mt-1">📞 +91 98765 43210</p>
          <p className="text-gray-300 text-sm mt-1">📍 New Delhi, India</p>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} HealthConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
