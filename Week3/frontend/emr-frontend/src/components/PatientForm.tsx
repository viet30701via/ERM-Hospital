import React, { useState } from "react";
import type { Patient } from "../models/Patient";
import { Role, type Gender, PatientStatus } from "../models/Type";
import type { MedicalRecord } from "../models/MedicalRecord";

// interface FormData {
//   name: string;
//   age: string;
//   gender: Gender;
//   phone: string;
//   address: string;
//   conditions: string;
// }
// interface FormErrors {
//   name?: string;
//   age?: string;
//   phone?: string;
//   address?: string;
//   conditions?: string;
// }

interface PatientFormProps {
  addPatient: (patient: Patient) => void;
}
export default function PatientForm({ addPatient }: PatientFormProps) {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return alert("Name is not valid");
    if (age <= 0) return alert("Age must be >0 ");
    if (!/^[0-9]{10}$/.test(phone)) return alert("Phone must be 10 digits");
    if (!address.trim()) return alert("Address not valid");

    const newPatient: Patient = {
      id: "",
      name,
      age: age,
      gender,
      role: Role.Patient,
      conditions: "",
      status: PatientStatus.Active,
      medicalRecord: [],
      phone,
      address,
    };

    addPatient(newPatient);

    //reset form after submit form
    setName("");
    setAge(0);
    setPhone("");
    setAddress("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "300px",
      }}
    >
      <h3>Add Patient</h3>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder="Age"
      />
      <select value={gender} onChange={(e) => setGender(e.target.value as any)}>
        <option value="male">Male</option>
        <option value="male">Female</option>
      </select>
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
      />
      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
      />
      <button type="submit">Add Patient</button>
    </form>
  );
}
