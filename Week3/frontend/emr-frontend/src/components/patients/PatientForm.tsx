import React, { useEffect, useState } from "react";
import type { Patient } from "../../models/Patient";
import { Role, type Gender, PatientStatus } from "../../models/Type";
import useFormValidation from "../../hooks/useFormValidation";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import Button from "../ui/Button";
import style from "./PatientForm.module.css";

interface PatientFormProps {
  initialData?: Patient;
  onSubmit: (patient: Patient) => void;
  onSuccess: () => void;
}
export default function PatientForm({
  initialData,
  onSubmit,
  onSuccess,
}: PatientFormProps) {
  const [name, setName] = useState(() => initialData?.name ?? "");
  const [age, setAge] = useState(() => initialData?.age ?? 0);
  const [gender, setGender] = useState<Gender>(
    () => initialData?.gender ?? "male"
  );
  const [phone, setPhone] = useState(() => initialData?.phone ?? "");
  const [address, setAddress] = useState(() => initialData?.address ?? "");
  const { errors, validate } = useFormValidation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = validate({ name, age, phone, address });
    if (!ok) return;
    const patient: Patient = {
      id: initialData?.id ?? "",
      name: name,
      age: age,
      gender,
      role: Role.Patient,
      conditions: "",
      status: PatientStatus.Active,
      medicalRecord: [],
      phone: phone,
      address: address,
    };
    onSubmit(patient);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <Button type="submit">
        {initialData ? "Update Patient" : "Add Patient"}
      </Button>
    </form>
  );
}
