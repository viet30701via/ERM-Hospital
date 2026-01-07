import DoctorList from "@/components/doctors/DoctorList";
export const metadata = {
  title: "EMR Hospital - Quản lý Bệnh nhân",
  description: "Danh sách và quản lý thông tin bệnh nhân trong hệ thống EMR",
};

export default function DoctorPage() {
  return (
    <div>
      {/* Doctor List Component */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <DoctorList />
      </div>
    </div>
  );
}
