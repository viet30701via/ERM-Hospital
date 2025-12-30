import type { Patient } from "../models/Patient";

interface PatientCardProps {
  patient: Patient;
}

export default function PatientCard({ patient }: PatientCardProps) {
  return (
    <div>
      <h3>{patient.name}</h3>
      <p>Age: {patient.age}</p>
      <p>Gender: {patient.gender}</p>
      <p>Condition: {patient.conditions}</p>
      <p>Status: {patient.status}</p>
    </div>
  );
}
