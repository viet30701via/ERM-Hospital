import PatientList from "@/components/patients/PatientList";
export const generateMetadata = {
  title: "EMR - Quản lý Bệnh nhân",
  description: "Danh sách và quản lý thông tin bệnh nhân trong hệ thống EMR",
};
//SSR
async function getPatients() {
  const res = await fetch("http:localhost:3000/patients.json", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch patients");
  return res.json();
}

export default async function PatientsPage() {
  const initialPatients = await getPatients();
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <PatientList initialData={initialPatients} />
    </div>
  );
}
