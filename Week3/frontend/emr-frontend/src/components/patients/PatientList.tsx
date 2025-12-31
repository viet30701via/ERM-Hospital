import { useState, useEffect } from "react";
import type { Patient } from "../../models/Patient";
import PatientForm from "./PatientForm";
import Modal from "../ui/Modal";
//list patient

export default function PatientList() {
  //List patients
  const [patients, setPatient] = useState<Patient[]>([]);
  //Show/Hide list
  //Edit
  const [edit, setEdit] = useState<Patient | null>(null);
  const [showList, setShowList] = useState<boolean>(true);
  //Loading state
  const [loading, setLoading] = useState<boolean>(true);
  //Open/Close Modal
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>("");

  const addPatient = (p: Patient) => {
    setPatient((prev) => [...prev, p]);
  };

  const updatePatient = (p: Patient) => {
    setPatient((prev) => prev.map((item) => (item.id === p.id ? p : item)));
  };
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
      <button onClick={() => setOpen(true)}>➕ Add Patient</button>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <PatientForm addPatient={addPatient} onSuccess={() => setOpen(false)} />
      </Modal>

      <h2>Patient List</h2>

      <button onClick={() => setShowList((prev) => !prev)}>
        {showList ? "Hide list" : "Show list"}
      </button>

      {showList && (
        <ul>
          {patients.map((p) => (
            <li key={p.id}>
              <strong>Name: {p.name}</strong> — Age: {p.age} — Gender:
              {p.gender} — Phone: {p.phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
