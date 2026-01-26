"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RecordForm({ patientId, token }: { patientId: string; token: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const body = {
      patientId,
      diagnosis: formData.get("diagnosis"),
      prescription: formData.get("prescription"),
      notes: formData.get("notes"),
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/medical-records`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      alert("Add record successfully!");
      (e.target as HTMLFormElement).reset();
      router.refresh(); // Tự động load lại danh sách bên phải
    } else {
      alert("Lỗi: Bạn không có quyền bác sĩ hoặc thiếu dữ liệu!");
    }
    setLoading(false);
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-purple-500 mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">✍️</span> New Treatment
      </h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase">Diagnosis</label>
          <input
            name="diagnosis"
            required
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Nhập chẩn đoán..."
          />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase">Prescription</label>
          <textarea
            name="prescription"
            rows={3}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Tên thuốc, liều dùng..."
          />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase">Notes</label>
          <textarea
            name="notes"
            rows={2}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Ghi chú bác sĩ..."
          />
        </div>
        <button
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Medical Record"}
        </button>
      </form>
    </div>
  );
}
