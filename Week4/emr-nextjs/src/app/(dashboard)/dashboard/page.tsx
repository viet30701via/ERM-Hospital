import Link from "next/link";

export const metadata = {
  title: "EMR Hospital - Dashboard",
  description: "Tổng quan hệ thống quản lý bệnh viện",
};

export default function DashboardPage() {
  // Dữ liệu giả lập (sau này sẽ fetch từ API)
  const stats = {
    totalPatients: 1234,
    todayAppointments: 45,
    activeDoctors: 89,
    emergencyCases: 7,
  };

  const todayAppointments = [
    {
      id: 1,
      time: "09:00",
      patient: "Nguyễn Văn An",
      doctor: "Dr. Smith",
      type: "Check-up",
    },
    {
      id: 2,
      time: "10:30",
      patient: "Trần Thị Bình",
      doctor: "Dr. Johnson",
      type: "Follow-up",
    },
    {
      id: 3,
      time: "14:00",
      patient: "Lê Minh Cường",
      doctor: "Dr. Williams",
      type: "Consultation",
    },
    {
      id: 4,
      time: "15:30",
      patient: "Phạm Thu Hà",
      doctor: "Dr. Brown",
      type: "Emergency",
    },
  ];

  const recentPatients = [
    { id: 1, name: "Nguyễn Văn An", status: "Active", lastVisit: "2024-01-05" },
    { id: 2, name: "Trần Thị Bình", status: "Active", lastVisit: "2024-01-04" },
    {
      id: 3,
      name: "Lê Minh Cường",
      status: "Recovered",
      lastVisit: "2024-01-03",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">
          Welcome to VIA Hospital Dashboard! 👋
        </h1>
        <p className="text-blue-100">
          Here's what's happening with your hospital today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Patients */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
            <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
              +12%
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Total Patients</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {stats.totalPatients.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-2">Active in system</p>
        </div>

        {/* Today Appointments */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📅</span>
            </div>
            <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
              Today
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Appointments</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {stats.todayAppointments}
          </p>
          <p className="text-xs text-gray-500 mt-2">Scheduled for today</p>
        </div>

        {/* Active Doctors */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">👨‍⚕️</span>
            </div>
            <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
              On Duty
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Active Doctors</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {stats.activeDoctors}
          </p>
          <p className="text-xs text-gray-500 mt-2">Available now</p>
        </div>

        {/* Emergency Cases */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <span className="text-sm font-semibold text-red-600 bg-red-100 px-3 py-1 rounded-full">
              Urgent
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Emergency</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {stats.emergencyCases}
          </p>
          <p className="text-xs text-gray-500 mt-2">Cases in ER</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Today's Appointments
            </h2>
            <Link
              href="/appointments"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {todayAppointments.map((apt) => (
              <div
                key={apt.id}
                className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {apt.time}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {apt.patient}
                  </p>
                  <p className="text-xs text-gray-600">
                    {apt.doctor} • {apt.type}
                  </p>
                </div>
                <Link
                  href={`/dashboard/appointments/${apt.id}`}
                  className="flex-shrink-0 text-blue-600 hover:text-blue-700"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Patients */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Patients</h2>
            <Link
              href="/patients"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {recentPatients.map((patient) => (
              <div
                key={patient.id}
                className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {patient.name.charAt(0)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {patient.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    Last visit: {patient.lastVisit}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      patient.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {patient.status}
                  </span>
                  <Link
                    href={`/dashboard/medical-records/${patient.id}`}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
