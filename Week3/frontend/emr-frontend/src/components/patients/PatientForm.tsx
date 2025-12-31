import React, { useEffect, useState } from "react";
import type { Patient } from "../../models/Patient";
import { Role, type Gender, PatientStatus } from "../../models/Type";
import useFormValidation from "../../hooks/useFormValidation";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import Button from "../ui/Button";

interface PatientFormProps {
  addPatient: (patient: Patient) => void;
  onSuccess: () => void;
}
export default function PatientForm({
  addPatient,
  onSuccess,
}: PatientFormProps) {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<Gender>("male");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const { errors, validate } = useFormValidation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = validate({ name, age, phone, address });
    if (!ok) return;
    const newPatient: Patient = {
      id: "",
      name: name,
      age: age,
      gender: "male",
      role: Role.Patient,
      conditions: "",
      status: PatientStatus.Active,
      medicalRecord: [],
      phone: phone,
      address: address,
    };
    addPatient(newPatient);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Patient</h3>
      <InputField label="Name" value={name} onChange={setName} />
      <InputField
        label="Age"
        type="number"
        value={String(age)}
        onChange={(v) => setAge(Number(v))}
      />
      <SelectField
        label="Gender"
        value={gender}
        onChange={setGender}
        options={["male", "female"]}
      />
      <InputField label="Phone" value={phone} onChange={setPhone} />
      <InputField label="Address" value={address} onChange={setAddress} />
      {errors.map((e, i) => (
        <p key={i} style={{ color: "red" }}>
          {e}
        </p>
      ))}

      <Button type="submit">Add Patient</Button>
    </form>
  );
}
