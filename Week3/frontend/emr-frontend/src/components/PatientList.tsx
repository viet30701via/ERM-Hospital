import { useState, useEffect } from "react";
import type { Patient } from "../models/Patient";
import PatientForm from "./PatientForm";

//list patient

export default function PatientList() {
  //List patients
  const [patients, setPatient] = useState<Patient[]>([]);
  //Show/Hide list
  const [showList, setShowList] = useState<boolean>(true);
  //Loading state
  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string>("");

  const [filter, setFilter] = useState("All");

  const addPatient = (p: Patient) => {
    setPatient((prev) => [...prev, p]);
  };
  const filterPatient =
    filter === "All" ? patients : patients.filter((p) => p.status === filter);

  useEffect(() => {
    console.log("Patient mounted");
    const fetchPatients = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("/patients.json");
        if (!res.ok) throw new Error("Request failed");
        const data = await res.json();
        setPatient(data);
      } catch (err) {
        setError("Loading error");
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
    return () => {
      console.log("PatientList unmounted");
    };
  }, []);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  return (
    <div>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <PatientForm addPatient={addPatient} />

      <h2>Patient List</h2>

      <button onClick={() => setShowList((prev) => !prev)}>
        {showList ? "Hide list" : "ShowList"}
      </button>
      {loading && <p>Loading....</p>}
      {showList && (
        <ul>
          {filterPatient.map((patient) => (
            <li key={patient.id}>
              Name: <strong>{patient.name}</strong> - Gender: {patient.gender} -
              Age: {patient.age} - Phone: {patient.phone} - Address:
              {patient.address}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
