import DoctorList from "@/components/doctors/DoctorList";
import { cookies } from "next/headers";
export const metadata = {
  title: "EMR Hospital - Quản lý bác sĩ",
  description: "Danh sách và quản lý thông tin bác sĩ",
};

export default async function DoctorPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  const base_url = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${base_url}/api/v1/doctors`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  if (res.status === 401) {
    throw new Error("Unauthorized");
  }
  const result = await res.json();
  const doctors = result.data || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Doctors</h1>
      <DoctorList initialData={doctors} />
    </div>
  );
}
