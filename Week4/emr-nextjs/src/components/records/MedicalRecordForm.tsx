/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { apiRequest } from "@/lib/api";
import toast from "react-hot-toast";

export default function MedicalRecordForm({ patientId, onRefresh }: { patientId: string; onRefresh: () => void }) {
  const [formData, setFormData] = useState({ diagnosis: "", prescription: "", notes: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiRequest("/medical-records", {
        method: "POST",
        body: JSON.stringify({ ...formData, patientId }),
      });
      toast.success("Add medical record successfully!");
      setFormData({ diagnosis: "", prescription: "", notes: "" });
      onRefresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        placeholder="Chẩn đoán..."
        className="w-full border p-2 rounded"
        value={formData.diagnosis}
        onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
        required
      />
      <textarea
        placeholder="Đơn thuốc..."
        className="w-full border p-2 rounded"
        value={formData.prescription}
        onChange={(e) => setFormData({ ...formData, prescription: e.target.value })}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Lưu hồ sơ
      </button>
    </form>
  );
}
