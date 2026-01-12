import PatientList from "@/components/patients/PatientList";

export const metadata = {
  title: "EMR - Quản lý Bệnh nhân",
  description: "Danh sách và quản lý thông tin bệnh nhân trong hệ thống EMR",
};

async function getPatients() {
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/patients.json`, {
      cache: "no-store",
    });

    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function PatientsPage() {
  const initialPatients = await getPatients();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <PatientList initialData={initialPatients} />
    </div>
  );
}
