import PatientList from "@/components/patients/PatientList";

export const metadata = {
  title: "EMR - Quản lý Bệnh nhân",
  description: "Danh sách và quản lý thông tin bệnh nhân trong hệ thống EMR",
};

async function getPatients() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "";

    const res = await fetch(`${baseUrl}/data/patients.json`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Fetch failed status: ${res.status}`);
      return [];
    }
    return res.json();
  } catch (error) {
    console.error("Fetch error on Server:", error);
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
