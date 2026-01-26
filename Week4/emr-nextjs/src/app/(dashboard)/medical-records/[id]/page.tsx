import RecordForm from "@/components/medicalRecord/medicalRecordForm";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MedicalRecordPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  const base_url = process.env.NEXT_PUBLIC_API_URL;

  const [patientRes, medicalRecordsRes] = await Promise.all([
    fetch(`${base_url}/api/v1/patients/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }),
    fetch(`${base_url}/api/v1/medical-records/patient/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }),
  ]);
  if (!patientRes.ok) return notFound();

  const patientData = await patientRes.json();
  const medicalRecordata = await medicalRecordsRes.json();

  const patient = patientData;
  const medicalRecords = medicalRecordata.data || [];
  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header with Patient Info */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Patient Records</h1>
              <div className="flex flex-wrap items-center gap-4 text-blue-100">
                <span>🆔 Patient ID: {id}</span>
                <span className="px-3 py-1 rounded-full text-sm font-bold bg-green-500 text-white">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">👤</span> Infomation
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Name: </span>
                <span className="font-bold text-gray-800">{patient.name}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-gray-600 font-medium">Age</span>
                <span className="font-bold text-gray-800">{patient.age}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-gray-600 font-medium">Phone</span>
                <span className="font-bold text-gray-800">{patient.phone}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-gray-600 font-medium">Address</span>
                <span className="font-bold text-gray-800">{patient.address}</span>
              </div>
            </div>
            <RecordForm patientId={id} token={token || ""} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-2xl">📋</span> Clinical History
            </h3>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition text-sm">
              + Add Record
            </button>
          </div>

          {medicalRecords.length > 0 ? (
            <div className="space-y-4">
              {medicalRecords.map((record: any, index: number) => (
                <div
                  key={record._id}
                  className="border-2 border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-blue-300 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-400">ID: {record._id}</p>
                      <p className="text-sm font-semibold text-gray-800">
                        📅{" "}
                        {new Date(record.createdAt).toLocaleDateString("vi-VN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Diagnosis Section */}
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200 mb-3">
                    <p className="text-xs text-red-600 font-bold mb-1">🔬 Diagnosis</p>
                    <p className="font-bold text-gray-800">{record.diagnosis}</p>
                  </div>

                  {/* Prescription Section */}
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200 mb-3">
                    <p className="text-xs text-green-600 font-bold mb-1">💊 Prescription</p>
                    <p className="text-gray-800">{record.prescription || "No medicine prescribed"}</p>
                  </div>

                  {/* Notes Section */}
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs text-blue-600 font-bold mb-1">📝 Notes</p>
                    <p className="text-sm text-gray-700">{record.notes || "No additional notes"}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
              <span className="text-6xl mb-4 block">📋</span>
              <p className="text-gray-500 text-lg font-semibold">No medical records yet</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center pb-8">
        <Link
          href="/patients"
          className="inline-flex items-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold px-10 py-4 rounded-xl shadow-md transition-all"
        >
          ← Back to Patients List
        </Link>
      </div>
    </div>
  );
}
