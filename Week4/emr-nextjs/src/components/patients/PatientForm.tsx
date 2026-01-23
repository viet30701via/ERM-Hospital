"use client";
import React, { useEffect, useState } from "react";
import type { Patient } from "../../types/Patient";
import { Role, type Gender, Status } from "../../types/Type";
import useFormValidation from "../../hooks/useFormValidation";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import Button from "../ui/Button";
import toast from "react-hot-toast";

interface PatientFormProps {
  initialData?: Patient;
  onSubmit: (patient: Patient) => void;
  onSuccess: () => void;
}
export default function PatientForm({ initialData, onSubmit, onSuccess }: PatientFormProps) {
  const [name, setName] = useState(() => initialData?.name ?? "");
  const [age, setAge] = useState(() => initialData?.age ?? 0);
  const [gender, setGender] = useState<Gender>(() => initialData?.gender ?? "male");
  const [phone, setPhone] = useState(() => initialData?.phone ?? "");
  const [address, setAddress] = useState(() => initialData?.address ?? "");
  const { errors, validate } = useFormValidation();

  useEffect(() => {
    validate({ name, age, phone, address });
  }, [name, age, phone, address]);
  const isFormValid = !errors.name && !errors.age && !errors.phone && !errors.address;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = validate({ name, age, phone, address });
    if (!ok) return;
    const token = localStorage.getItem("access_token");
    const isEdit = !!initialData?._id;
    const url = isEdit
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/patients/${initialData._id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/patients`;
    try {
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          age,
          gender: gender.toLowerCase(),
          phone,
          address,
        }),
      });
      if (res.ok) {
        const patient: Patient = await res.json();
        onSubmit(patient);
        onSuccess();
        toast.success(isEdit ? "Update Successfull!" : "Add Patient Successfull!");
      } else {
        const data = await res.json();
        if (res.status === 403) {
          toast.error("You don't have permission to perform this action.");
        } else {
          toast.error(data.message || "Server error. Please try again.");
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        {initialData ? "Update Patient" : "Add New Patient"}
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name */}
        <InputField label="Name" value={name} onChange={setName} error={errors.name} />

        {/* Age */}
        <InputField
          label="Age"
          type="number"
          value={String(age)}
          onChange={(v) => setAge(Number(v))}
          error={errors.age}
        />

        {/* Gender */}
        <SelectField label="Gender" value={gender} onChange={setGender} options={["male", "female"]} />

        {/* Phone */}
        <InputField label="Phone" value={phone} onChange={setPhone} error={errors.phone} />

        {/* Address */}
        <InputField label="Address" value={address} onChange={setAddress} error={errors.address} />

        {/* Button */}
        <div className="md:col-span-2 flex justify-end mt-4">
          <Button type="submit" disabled={!isFormValid}>
            {initialData ? "Update Patient" : "Add Patient"}
          </Button>
        </div>
      </form>
    </div>
  );
}
