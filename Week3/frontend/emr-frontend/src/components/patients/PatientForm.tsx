import React, { useEffect, useState } from "react";
import type { Patient } from "../../models/Patient";
import { Role, type Gender, PatientStatus } from "../../models/Type";
import useFormValidation from "../../hooks/useFormValidation";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import Button from "../ui/Button";

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

  useEffect(() => {
    validate({ name, age, phone, address });
  }, [name, age, phone, address]);
  const isFormValid =
    !errors.name && !errors.age && !errors.phone && !errors.address;
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
      <InputField
        label="Name"
        value={name}
        onChange={setName}
        error={errors.name}
      />
      <InputField
        label="Age"
        type="number"
        value={String(age)}
        onChange={(v) => setAge(Number(v))}
        error={errors.age}
      />
      <SelectField
        label="Gender"
        value={gender}
        onChange={setGender}
        options={["male", "female"]}
      />
      <InputField
        label="Phone"
        value={phone}
        onChange={setPhone}
        error={errors.phone}
      />
      <InputField
        label="Address"
        value={address}
        onChange={setAddress}
        error={errors.address}
      />

      <Button type="submit" disabled={!isFormValid}>
        {initialData ? "Update Patient" : "Add Patient"}
      </Button>
    </form>
  );
}
