"use client";
import React, { useEffect, useState } from "react";
import type { Doctor } from "@/types/Doctor";
import { type Gender } from "@/types/Type";
import useFormValidation from "@/hooks/useFormValidation";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import Button from "../ui/Button";
import toast from "react-hot-toast";

interface DoctorFormProps {
  initialData?: Doctor;
  onSubmit: (doctor: Doctor) => void;
  onSuccess: () => void;
}

export default function DoctorForm({ initialData, onSubmit, onSuccess }: DoctorFormProps) {
  const [name, setName] = useState(() => initialData?.name ?? "");
  const [age, setAge] = useState(() => initialData?.age ?? 0);
  const [gender, setGender] = useState<string>(() => initialData?.gender ?? "Male");
  const [specialization, setSpecialization] = useState(() => initialData?.specialization ?? "");
  const [phone, setPhone] = useState(() => initialData?.phone ?? "");
  const [address, setAddress] = useState(() => initialData?.address ?? "");

  const { errors, validate } = useFormValidation();

  const isFormValid = name && specialization && phone && age > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth-token="))
      ?.split("=")[1];

    const isEdit = !!initialData?._id;
    const url = isEdit
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/doctors/${initialData._id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/doctors`;

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
          gender,
          specialization,
          phone,
          address,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        onSubmit(result.data || result);
        onSuccess();
        toast.success(isEdit ? "Update Doctor Success!" : "Add Doctor Success!");
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Network error, please try again.");
    }
  };

  return (
    <div className="bg-white p-4">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="Full Name" value={name} onChange={setName} />
        <InputField label="Age" type="number" value={String(age)} onChange={(v) => setAge(Number(v))} />
        <SelectField label="Gender" value={gender} onChange={setGender} options={["Male", "Female"]} />
        <InputField label="Specialization" value={specialization} onChange={setSpecialization} />
        <InputField label="Phone" value={phone} onChange={setPhone} />
        <InputField label="Address" value={address} onChange={setAddress} />

        <div className="md:col-span-2 flex justify-end gap-3 mt-6">
          <Button type="submit" disabled={!isFormValid}>
            {initialData ? "Save Changes" : "Create Doctor"}
          </Button>
        </div>
      </form>
    </div>
  );
}
