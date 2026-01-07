import { redirect } from "next/navigation";
import PatientList from "@/components/patients/PatientList";

export default function Home() {
  redirect("/dashboard");
  // return <PatientList />;
}
