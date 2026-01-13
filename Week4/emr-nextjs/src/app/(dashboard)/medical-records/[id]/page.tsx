import { Patient } from "@/types/Patient";
import { Metadata } from "next";
import Link from "next/link";
interface Prescription {
  id: string;
  medicalRecordId: string;
  medicine: string;
  dosage: string;
}
interface MedicalRecord {
  id: string;
  patientId: string;
  date: string;
  diagnosis: string;
  prescription: Prescription[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const patient = await getPatientData(id);

  return {
    title: `Hồ sơ: ${patient?.name || "Không tìm thấy"}`,
    description: `Chi tiết bệnh án của bệnh nhân ${patient?.name || id}`,
  };
}

async function getPatientData(id: string): Promise<Patient | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/data/patients.json`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    const data: Patient[] = await res.json();

    return data.find((p) => String(p.id) === String(id)) || null;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}
export default async function MedicalRecordDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const patient = await getPatientData(id);
  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">❌</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Patient Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            Patient with ID "
            <span className="font-bold text-red-600">{id}</span>" does not
            exist.
          </p>
          <Link
            href="/patients"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Patients
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm">
        <Link
          href="/dashboard"
          className="text-gray-600 hover:text-blue-600 transition"
        >
          Dashboard
        </Link>
        <span className="text-gray-400">/</span>
        <Link
          href="/patients"
          className="text-gray-600 hover:text-blue-600 transition"
        >
          Patients
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-800 font-semibold">
          Medical Record #{id}
        </span>
      </nav>

      {/* Header with Patient Info */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-4xl font-bold border-4 border-white/30">
              {patient.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{patient.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-blue-100">
                <span>🆔 Patient ID: {id}</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${
                    patient.status === "Active"
                      ? "bg-green-500 text-white"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  {patient.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Patient Info */}
        <div className="space-y-6">
          {/* Basic Information Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">👤</span>
              Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Age</span>
                <span className="font-bold text-gray-800">
                  {patient.age} years
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Gender</span>
                <span className="font-bold text-gray-800 capitalize">
                  {patient.gender === "male" ? "🚹 Male" : "🚺 Female"}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Phone</span>
                <span className="font-bold text-gray-800">
                  📱 {patient.phone}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Address</span>
                <span className="font-bold text-gray-800">
                  📍 {patient.address}
                </span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-gray-600 font-medium">Role</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-bold capitalize">
                  {patient.role}
                </span>
              </div>
            </div>
          </div>

          {/* Current Condition Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">🏥</span>
              Current Condition
            </h3>
            <div className="p-4 bg-orange-50 rounded-xl border-2 border-orange-200">
              <p className="text-sm text-orange-600 font-semibold mb-2">
                Primary Diagnosis
              </p>
              <p className="text-2xl font-bold text-orange-800">
                {patient.conditions}
              </p>
            </div>

            {/* Medical Record Count */}
            <div className="mt-4 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-blue-700">
                  Total Medical Records
                </span>
                <span className="text-3xl font-bold text-blue-800">
                  {patient.medicalRecord?.length || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Medical Records */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-2xl">📋</span>
              Medical Records Summary
            </h3>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition text-sm">
              + Add Record
            </button>
          </div>

          {patient.medicalRecord && patient.medicalRecord.length > 0 ? (
            <div className="space-y-4">
              {patient.medicalRecord.map((record, index) => (
                <div
                  key={record.id}
                  className="border-2 border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-blue-300 transition-all"
                >
                  {/* Record Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">
                        Record ID: {record.id}
                      </p>
                      <p className="text-sm font-semibold text-gray-800">
                        📅{" "}
                        {new Date(record.date).toLocaleDateString("vi-VN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Diagnosis */}
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200 mb-3">
                    <p className="text-xs text-red-600 font-bold mb-1">
                      🔬 Diagnosis
                    </p>
                    <p className="font-bold text-gray-800">
                      {record.diagnosis}
                    </p>
                  </div>

                  {/* Prescriptions */}
                  {record.prescription && record.prescription.length > 0 && (
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-xs text-green-600 font-bold mb-2">
                        💊 Prescriptions
                      </p>
                      <div className="space-y-2">
                        {record.prescription.map((presc) => (
                          <div
                            key={presc.id}
                            className="flex items-start gap-2 bg-white p-2 rounded border border-green-200"
                          >
                            <span className="text-green-600 font-bold text-lg mt-0.5">
                              •
                            </span>
                            <div className="flex-1">
                              <p className="font-bold text-gray-800">
                                {presc.medicine}
                              </p>
                              <p className="text-sm text-gray-600">
                                {presc.dosage}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
              <span className="text-6xl mb-4 block">📋</span>
              <p className="text-gray-500 text-lg font-semibold">
                No medical records yet
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Detailed Medical Records Section */}

      {/* Back Button */}
      <div className="flex justify-center pb-8">
        <Link
          href="/patients"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-bold px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Patients List
        </Link>
      </div>
    </div>
  );
}
