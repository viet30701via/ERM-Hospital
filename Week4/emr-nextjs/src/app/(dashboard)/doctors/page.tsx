import DoctorList from "@/components/doctors/DoctorList";
export const metadata = {
  title: "EMR Hospital - Quản lý bác sĩ",
  description: "Danh sách và quản lý thông tin bác sĩ",
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
