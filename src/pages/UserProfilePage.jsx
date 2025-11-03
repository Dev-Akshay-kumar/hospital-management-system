import React, { useEffect } from "react";
import { format } from "date-fns";
import {
  User,
  Phone,
  MapPin,
  Shield,
  Heart,
  Activity,
} from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import useAuth from "../hooks/useAuth";

// ✅ Modern reusable Card
const Card = ({ title, icon: Icon, children }) => (
  <div className="bg-white/90 backdrop-blur-sm shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow duration-300 p-6">
    {title && (
      <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2 mb-4 text-gray-800">
        {Icon && <Icon className="text-blue-600 w-5 h-5" />}
        {title}
      </h2>
    )}
    <div className="text-gray-700 text-sm sm:text-base space-y-2">{children}</div>
  </div>
);

const UserProfilePage = () => {
  const user = useAuth((state) => state.user);
  const loadUser = useAuth((state) => state.loadUser);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (!user) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center text-gray-500 bg-gray-50">
          No user data available. Please login.
        </div>
      </MainLayout>
    );
  }

  const {
    fullName,
    dob,
    gender,
    bloodType,
    heightCm,
    weightKg,
    bmi,
    contact = {},
    address = {},
    insurance = {},
    allergies = [],
    chronicConditions = [],
    medications = [],
    immunizations = [],
    emergencyContact = {},
    notes,
    age,
    patientId,
  } = user;

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 py-10 px-4 sm:px-6 lg:px-10">
        <div className="max-w-6xl mx-auto space-y-10">

          {/* 🔷 Header */}
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white rounded-2xl shadow-xl p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {fullName}
              </h1>
              <p className="text-blue-100 mt-1 capitalize">
                {gender} • {age} years
              </p>
              <p className="text-blue-200 text-sm">Patient ID: {patientId}</p>
            </div>

            <div className="sm:text-right">
              <p className="font-medium">
                Blood Type: <span className="font-bold">{bloodType}</span>
              </p>
              <p className="text-blue-100 text-sm">
                DOB: {dob ? format(new Date(dob), "PPP") : "—"}
              </p>
            </div>
          </div>

          {/* 🔹 Contact & Address */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card title="Contact Information" icon={Phone}>
              <p><b>Phone:</b> {contact.phone || "—"}</p>
              <p><b>Email:</b> {contact.email || "—"}</p>
              <p><b>Preferred:</b> {contact.preferred || "—"}</p>
            </Card>

            <Card title="Address" icon={MapPin}>
              <p>{address.line1 || "—"}, {address.line2 || ""}</p>
              <p>{address.city || ""}, {address.state || ""} {address.postalCode || ""}</p>
              <p>{address.country || ""}</p>
            </Card>
          </div>

          {/* 🔹 Insurance Info */}
          <Card title="Insurance Information" icon={Shield}>
            <div className="grid sm:grid-cols-2 gap-x-8">
              <p><b>Provider:</b> {insurance.provider || "—"}</p>
              <p><b>Policy Number:</b> {insurance.policyNumber || "—"}</p>
              <p><b>Group Number:</b> {insurance.groupNumber || "—"}</p>
              <p><b>Valid Until:</b> {insurance.validUntil ? format(new Date(insurance.validUntil), "PPP") : "—"}</p>
            </div>
          </Card>

          {/* 🔹 Medical Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card title="Health Overview" icon={Heart}>
              <div className="grid sm:grid-cols-2 gap-x-4">
                <p><b>Height:</b> {heightCm ? `${heightCm} cm` : "—"}</p>
                <p><b>Weight:</b> {weightKg ? `${weightKg} kg` : "—"}</p>
                <p><b>BMI:</b> {bmi || "—"}</p>
                <p><b>Chronic:</b> {chronicConditions.length ? chronicConditions.join(", ") : "None"}</p>
              </div>
              <p><b>Allergies:</b> {allergies.length ? allergies.join(", ") : "None"}</p>
            </Card>

            <Card title="Medications & Immunizations" icon={Activity}>
              <div className="mb-3">
                <p className="font-semibold text-gray-800 mb-1">Medications:</p>
                {medications.length ? (
                  medications.map((m, i) => (
                    <p key={i} className="text-gray-600">
                      • {m.name} — {m.dose}, {m.frequency}
                    </p>
                  ))
                ) : (
                  <p>No current medications</p>
                )}
              </div>

              <div>
                <p className="font-semibold text-gray-800 mb-1">Immunizations:</p>
                {immunizations.length ? (
                  immunizations.map((v, i) => (
                    <p key={i} className="text-gray-600">
                      • {v.name} — {format(new Date(v.date), "PPP")}
                    </p>
                  ))
                ) : (
                  <p>No immunization records</p>
                )}
              </div>
            </Card>
          </div>

          {/* 🔹 Emergency Contact */}
          <Card title="Emergency Contact" icon={User}>
            <p><b>Name:</b> {emergencyContact.name || "—"}</p>
            <p><b>Relation:</b> {emergencyContact.relation || "—"}</p>
            <p><b>Phone:</b> {emergencyContact.phone || "—"}</p>
          </Card>

          {/* 🔹 Doctor Notes */}
          <Card title="Doctor Notes">
            <p className="text-gray-700 leading-relaxed">{notes || "No notes available."}</p>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserProfilePage;
