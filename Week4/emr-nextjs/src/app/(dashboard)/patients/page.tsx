import PatientList from "@/components/patients/PatientList";

export const metadata = {
  title: "EMR - Quản lý Bệnh nhân",
  description: "Danh sách và quản lý thông tin bệnh nhân trong hệ thống EMR",
};

async function getPatients() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!baseUrl && process.env.NODE_ENV === "production") {
      console.error("Missing NEXT_PUBLIC_APP_URL on Vercel");
      return [];
    }

    const finalUrl = baseUrl
      ? `${baseUrl}/patients.json`
      : "http://localhost:3000/patients.json";

    const res = await fetch(finalUrl, {
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
