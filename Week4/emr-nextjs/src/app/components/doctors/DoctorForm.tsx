import React, { useEffect, useState } from "react";
import type { Doctor } from "@/app/types/Doctor";
import { Role, type Gender, Status } from "../../types/Type";
import useFormValidation from "@/app/hooks/useFormValidation";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import Button from "../ui/Button";

interface DoctorFormProps {
  initialData?: Doctor;
  onSubmit: (doctor: Doctor) => void;
  onSuccess: () => void;
}

export default function DoctorForm({
  initialData,
  onSubmit,
  onSuccess,
}: DoctorFormProps) {
  const [name, setName] = useState(() => initialData?.name ?? "");
  const [age, setAge] = useState(() => initialData?.age ?? 0);
  const [gender, setGender] = useState<Gender>(
    () => initialData?.gender ?? "male"
  );
  const [phone, setPhone] = useState(() => initialData?.phone ?? "");
  const [address, setAddress] = useState(() => initialData?.address ?? "");

  const [specialization, setSpecialization] = useState(
    () => initialData?.specialization ?? ""
  );
  const { errors, validate } = useFormValidation();
  useEffect(() => {
    validate({ name, age, phone, address });
  }, [name, age, phone, address]);
  const isFormValid =
    !errors.name && !errors.age && !errors.phone && !errors.address;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = validate({ name, age, address, phone });
    if (!ok) return;
    const doctor: Doctor = {
      id: initialData?.id ?? "",
      name: name,
      age: age,
      gender,
      address: address,
      phone: phone,
      role: Role.Doctor,
      specialization: specialization,
      status: Status.Active,
    };
    onSubmit(doctor);
    onSuccess();
  };
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        {initialData ? "Update Doctor" : "Add New Doctor"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* Name */}
        <InputField
          label="Name"
          value={name}
          onChange={setName}
          error={errors.name}
        />

        {/* Age */}
        <InputField
          label="Age"
          type="number"
          value={String(age)}
          onChange={(v) => setAge(Number(v))}
          error={errors.age}
        />

        {/* Specialization */}
        <InputField
          label="Specialization"
          value={specialization}
          onChange={setSpecialization}
        />

        {/* Gender */}
        <SelectField
          label="Gender"
          value={gender}
          onChange={setGender}
          options={["male", "female"]}
        />

        {/* Phone */}
        <InputField
          label="Phone"
          value={phone}
          onChange={setPhone}
          error={errors.phone}
        />

        {/* Address */}
        <InputField
          label="Address"
          value={address}
          onChange={setAddress}
          error={errors.address}
        />

        {/* Button */}
        <div className="md:col-span-2 flex justify-end mt-4">
          <Button type="submit" disabled={!isFormValid}>
            {initialData ? "Update Doctor" : "Add Doctor"}
          </Button>
        </div>
      </form>
    </div>
  );
}
