import { useState, useEffect } from "react";
import type { Patient } from "../../models/Patient";
import PatientForm from "./PatientForm";
import Modal from "../ui/Modal";

export default function PatientList() {
  // --- States ---
  const [patients, setPatients] = useState<Patient[]>([]);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [showList, setShowList] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  useEffect(() => {
    fetchPatients();
  }, []);

  // --- Actions ---
  const fetchPatients = async () => {
    try {
      setLoading(true);
      const res = await fetch("/patients.json");
      if (!res.ok) throw new Error("Loading fail");
      const data = await res.json();
      setPatients(data);
    } catch (err) {
      setError("Loading fail");
    } finally {
      setLoading(false);
    }
  };

  const handleAddPatient = (newPatient: Patient) => {
    setPatients((prev) => [...prev, newPatient]);
    showFeedback("Add Patient success !");
  };

  const handleUpdatePatient = (updated: Patient) => {
    setPatients((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showFeedback("Update Patient success !");
  };

  const handleDeletePatient = (id: string) => {
    if (!window.confirm("Are you sure want to delete?")) return;
    setPatients((prev) => prev.filter((p) => p.id !== id));
    showFeedback("Delete Successfull");
  };

  const showFeedback = (msg: string) => {
    setMessage({ type: "success", text: msg });
    setTimeout(() => setMessage(null), 3000);
  };

  const openAddModal = () => {
    setEditingPatient(null);
    setIsModalOpen(true);
  };

  const openEditModal = (patient: Patient) => {
    setEditingPatient(patient);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPatient(null);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error)
    return (
      <div className="error-msg" style={{ color: "red" }}>
        {error}
      </div>
    );

  return (
    <div className="patient-container">
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {" "}
        <button
          onClick={openAddModal}
          style={{ backgroundColor: "#28a745", color: "white" }}
        >
          ➕ Add Patient
        </button>
      </header>

      {message && (
        <div
          style={{
            color: message.type === "success" ? "green" : "red",
            padding: "10px 0",
          }}
        >
          {message.text}
        </div>
      )}

      <div style={{ margin: "20px 0" }}>
        <button onClick={() => setShowList(!showList)}>
          {showList ? "Hide list" : "Show list"}
        </button>
      </div>

      {showList && (
        <table
          border={1}
          cellPadding={10}
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id}>
                <td>
                  <strong>{p.name}</strong>
                </td>
                <td>{p.age}</td>
                <td>{p.gender}</td>
                <td>{p.phone}</td>
                <td>{p.address}</td>
                <td>
                  <button
                    onClick={() => openEditModal(p)}
                    style={{ marginRight: "5px" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePatient(p.id)}
                    style={{ color: "red" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal Form */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h3>{editingPatient ? "Update Patient" : "Add Patient"}</h3>
        <PatientForm
          initialData={editingPatient ?? undefined}
          onSubmit={editingPatient ? handleUpdatePatient : handleAddPatient}
          onSuccess={closeModal}
        />
      </Modal>
    </div>
  );
}
