"use client";

import { Doctor } from "@/types/Doctor";
import { useState, useEffect } from "react"; // Thêm useEffect để theo dõi thay đổi
import Modal from "../ui/Modal";
import DoctorForm from "./DoctorForm";
import { apiRequest } from "@/lib/api";

interface DoctorListProps {
  initialData: Doctor[];
}

export default function DoctorList({ initialData }: DoctorListProps) {
  const [doctors, setDoctors] = useState<Doctor[]>(initialData);

  useEffect(() => {
    setDoctors(initialData);
  }, [initialData]);

  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [showList, setShowList] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const showFeedback = (msg: string, type: "success" | "error" = "success") => {
    setMessage({ type, text: msg });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleAddDoctor = (newDoctor: Doctor) => {
    setDoctors((prev) => [...prev, newDoctor]);
    showFeedback("Add Doctor Successful!");
    closeModal();
  };

  const handleUpdateDocter = (updated: Doctor) => {
    setDoctors((prev) => prev.map((d) => (d._id === updated._id ? updated : d)));
    showFeedback("Update Doctor Success!");
    closeModal();
  };

  const handleDeleteDocter = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;
    try {
      const res = await apiRequest(`/api/v1/doctors/${id}`, { method: "DELETE" });
      if (res.ok) {
        setDoctors((prev) => prev.filter((d) => d._id !== id));
        showFeedback("Delete Successful!");
      } else {
        showFeedback("Failed to delete.", "error");
      }
    } catch (err) {
      showFeedback("An error occurred.", "error");
    }
  };

  const openAddMode = () => {
    setEditingDoctor(null);
    setIsModalOpen(true);
  };
  const openEditMode = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDoctor(null);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Doctor Management</h1>
          </div>
          <button
            onClick={openAddMode}
            className="w-full md:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <span className="text-xl">➕</span>
            Add New Doctor
          </button>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg shadow-md border-l-4 ${message.type === "success" ? "bg-green-100 border-green-500 text-green-800" : "bg-red-100 border-red-500 text-red-800"}`}
          >
            {message.text}
          </div>
        )}

        <div className="mb-6">
          <button onClick={() => setShowList(!showList)} className="bg-white border py-2 px-4 rounded-lg shadow-sm">
            {showList ? "Hide List" : "Show List"}
          </button>
        </div>

        {showList && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-left">
                  <th className="px-6 py-4 font-semibold">Doctor Name</th>
                  <th className="px-6 py-4 font-semibold">Specialization</th>
                  <th className="px-6 py-4 font-semibold">Gender</th>
                  <th className="px-6 py-4 font-semibold">Address</th>
                  <th className="px-6 py-4 font-semibold">Phone</th>

                  <th className="px-6 py-4 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {doctors.length > 0 ? (
                  doctors.map((p) => (
                    <tr key={p._id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 font-semibold">{p.name}</td>
                      <td className="px-6 py-4">{p.specialization}</td>
                      <td className="px-6 py-4">{p.gender}</td>
                      <td className="px-6 py-4">{p.phone}</td>
                      <td className="px-6 py-4">{p.address}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => openEditMode(p)}
                          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow transition-all"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDeleteDocter(String(p._id))}
                          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow transition-all"
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-10 text-center text-gray-500">
                      No doctors found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <DoctorForm
            initialData={editingDoctor ?? undefined}
            onSubmit={editingDoctor ? handleUpdateDocter : handleAddDoctor}
            onSuccess={closeModal}
          />
        </Modal>
      </div>
    </div>
  );
}
