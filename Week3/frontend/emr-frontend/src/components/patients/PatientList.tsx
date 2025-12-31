import { useState, useEffect } from "react";
import type { Patient } from "../../models/Patient";
import PatientForm from "./PatientForm";
import Modal from "../ui/Modal";
//list patient

export default function PatientList() {
  //List patients
  const [patients, setPatient] = useState<Patient[]>([]);
  //Edit
  const [editing, setEditing] = useState<Patient | null>(null);
  //Show/Hide list
  const [showList, setShowList] = useState<boolean>(true);
  //Loading state
  const [loading, setLoading] = useState<boolean>(true);
  //Open/Close Modal
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState("");
  const addPatient = (p: Patient) => {
    setPatient((prev) => [...prev, p]);
    setMessage("Add patient successful! ");
  };

  const updatePatient = (updated: Patient) => {
    setPatient((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };
  const deletePatient = (id: string) => {
    const confirmed = window.confirm("Are you sure want to delete");
    if (!confirmed) return;
    setPatient((prev) => prev.filter((p) => p.id !== id));
    setMessage("Delete successfull");
  };

  const closeModal = () => {
    setOpen(false);
    setEditing(null);
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("/patients.json");
        if (!res.ok) throw new Error("Request failed");
        const data = await res.json();
        setPatient(data);
      } catch {
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
      <button
        onClick={() => {
          setEditing(null); //add mode
          setOpen(true);
        }}
      >
        ➕ Add Patient
      </button>
      <Modal isOpen={open} onClose={closeModal}>
        <PatientForm
          initialData={editing ?? undefined}
          onSubmit={editing ? updatePatient : addPatient}
          onSuccess={closeModal}
        />
      </Modal>
      {message && (
        <p style={{ color: "green", marginTop: "10px" }}>{message}</p>
      )}
      <h2>Patient List</h2>

      <button onClick={() => setShowList((prev) => !prev)}>
        {showList ? "Hide list" : "Show list"}
      </button>

      {showList && (
        <ul>
          {patients.map((p) => (
            <li key={p.id}>
              <strong>Name: {p.name}</strong> —— Age: {p.age} —— Gender:
              {p.gender} —— Phone: {p.phone} —— Address : {p.address}
              <button
                onClick={() => {
                  setEditing(p); // edit mode
                  setOpen(true);
                }}
              >
                Edit
              </button>
              <button onClick={() => deletePatient(p.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
