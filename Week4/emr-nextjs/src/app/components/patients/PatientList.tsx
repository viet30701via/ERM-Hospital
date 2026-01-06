"use client";
import { useState, useEffect } from "react";
import type { Patient } from "../../types/Patient";
import PatientForm from "./PatientForm";
import Modal from "../ui/Modal";

export default function PatientList() {
  // --- States ---
  const [patients, setPatients] = useState<Patient[]>([]);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [showList, setShowList] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  useEffect(() => {
    fetchPatients();
  }, []);

  // --- Actions ---
  const fetchPatients = async () => {
    try {
      setLoading(true);
      const res = await fetch("/patients.json");
      if (!res.ok) throw new Error("Loading fail");
      const data = await res.json();
      setPatients(data);
    } catch (err) {
      setError("Loading fail");
    } finally {
      setLoading(false);
    }
  };

  const handleAddPatient = (newPatient: Patient) => {
    setPatients((prev) => [...prev, newPatient]);
    showFeedback("Add Patient success !");
  };

  const handleUpdatePatient = (updated: Patient) => {
    setPatients((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showFeedback("Update Patient success !");
  };

  const handleDeletePatient = (id: string) => {
    if (!window.confirm("Are you sure want to delete?")) return;
    setPatients((prev) => prev.filter((p) => p.id !== id));
    showFeedback("Delete Successfull");
  };

  const showFeedback = (msg: string) => {
    setMessage({ type: "success", text: msg });
    setTimeout(() => setMessage(null), 3000);
  };

  const openAddMode = () => {
    setEditingPatient(null);
    setIsModalOpen(true);
  };

  const openEditMode = (patient: Patient) => {
    setEditingPatient(patient);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPatient(null);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error)
    return (
      <div className="error-msg" style={{ color: "red" }}>
        {error}
      </div>
    );
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section - ĐÃ SỬA LỖI LẶP TẠI ĐÂY */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Patient Management
            </h1>
            <p className="text-gray-600">
              Manage and track patient information efficiently
            </p>
          </div>
          <button
            onClick={openAddMode}
            className="w-full md:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <span className="text-xl">➕</span>
            Add New Patient
          </button>
        </div>

        {/* Feedback Message */}
        {message && (
          <div
            className={`mb-6 border-l-4 p-4 rounded-lg shadow-md animate-bounce ${
              message.type === "success"
                ? "bg-green-100 border-green-500 text-green-800"
                : "bg-red-100 border-red-500 text-red-800"
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{message.type === "success" ? "✅" : "❌"}</span>
              <p className="font-semibold">{message.text}</p>
            </div>
          </div>
        )}

        {/* Toggle View Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowList(!showList)}
            className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2 px-6 rounded-lg shadow-md border border-gray-200 transition-all"
          >
            {showList ? " Hide Patient List" : "Show Patient List"}
          </button>
        </div>

        {/* Table Section */}
        {showList && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-left">
                    <th className="px-6 py-4 font-semibold">Patient Name</th>
                    <th className="px-6 py-4 font-semibold">Age</th>
                    <th className="px-6 py-4 font-semibold">Gender</th>
                    <th className="px-6 py-4 font-semibold">Phone</th>
                    <th className="px-6 py-4 font-semibold">Address</th>
                    <th className="px-6 py-4 text-center font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {patients.map((p, index) => (
                    <tr
                      key={p.id}
                      className={`hover:bg-blue-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                            {p.name.charAt(0)}
                          </div>
                          <span className="font-semibold text-gray-800">
                            {p.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{p.age}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            p.gender.toString() === "Male"
                              ? "bg-blue-100 text-blue-800"
                              : p.gender.toString() === "Female"
                              ? "bg-pink-100 text-pink-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {p.gender}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{p.phone}</td>
                      <td className="px-6 py-4 text-gray-600 text-sm max-w-xs truncate">
                        {p.address}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => openEditMode(p)}
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow transition-all"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDeletePatient(p.id)}
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow transition-all"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal Form */}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            {editingPatient
              ? "✏️ Update Patient Information"
              : "➕ Add New Patient"}
          </h3>
          <PatientForm
            initialData={editingPatient ?? undefined}
            onSubmit={editingPatient ? handleUpdatePatient : handleAddPatient}
            onSuccess={closeModal}
          />
        </Modal>
      </div>
    </div>
  );
}
