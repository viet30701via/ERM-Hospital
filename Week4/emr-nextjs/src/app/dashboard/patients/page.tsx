import PatientList from "@/app/components/patients/PatientList";

export const metadata = {
  title: "EMR Hospital - Quản lý Bệnh nhân",
  description: "Danh sách và quản lý thông tin bệnh nhân trong hệ thống EMR",
};

export default function PatientsPage() {
  return (
    <div>
      {/* Patient List Component */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <PatientList />
      </div>
    </div>
  );
}
