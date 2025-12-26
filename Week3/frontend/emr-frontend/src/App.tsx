import PatientCard from "../src/components/PatientCart";
import type { Patient } from "./models/Patient";
import { Role, PatientStatus } from "./models/Type";

function App() {
  const patients: Patient[] = [
    {
      id: "1",
      name: "John Doe",
      age: 30,
      gender: "male",
      role: Role.Patient,
      conditions: "Diabetes",
      status: PatientStatus.Active,
      medicalRecord: []
    },
    {
      id: "2",
      name: "Jane Smith",
      age: 25,
      gender: "female",
      role: Role.Patient,
      conditions: "Asthma",
      status: PatientStatus.Active,
      medicalRecord: []

    },
    {
      id: "3",
      name: "Tom Lee",
      age: 40,
      gender: "male",
      role: Role.Patient,
      conditions: "Hypertension",
      status: PatientStatus.Inactive,
      medicalRecord: []

    },
  ];

  return (
    <div>
      <h1>Patient List</h1>

      {patients.map((p) => (
        <PatientCard key={p.id} patient={p} />
      ))}
    </div>
  );
}

export default App;
