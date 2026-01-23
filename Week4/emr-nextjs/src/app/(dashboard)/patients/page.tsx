import PatientList from "@/components/patients/PatientList";
import { cookies } from "next/headers";

export const metadata = {
  title: "EMR - Quản lý Bệnh nhân",
  description: "Danh sách và quản lý thông tin bệnh nhân trong hệ thống EMR",
};

export default async function PatientsPage() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth-token")?.value;
  const base_url = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${base_url}/api/v1/patients`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (res.status === 401) {
    throw new Error("Unauthorized");
  }

  const patients = await res.json();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Patients</h1>
      <PatientList initialData={patients} />
    </div>
  );
}
