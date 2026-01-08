import { redirect } from "next/navigation";
import PatientList from "@/components/patients/PatientList";
import DashboardPage from "./(dashboard)/dashboard/page";

export default function Home() {
  redirect("/login");
}
