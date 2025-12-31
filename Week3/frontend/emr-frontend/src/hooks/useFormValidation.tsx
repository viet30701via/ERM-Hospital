import { useState } from "react";

export default function useFormValidation() {
  const [errors, setErrors] = useState<string[]>([]);

  const validate = (data: {
    name: string;
    age: number;
    phone: string;
    address: string;
  }) => {
    const list: string[] = [];

    if (!data.name.trim()) list.push("Name required");
    if (data.age <= 0) list.push("Age must be > 0");
    if (!/^[0-9]{10}$/.test(data.phone)) list.push("Phone must be 10 digits");
    if (!data.address.trim()) list.push("Address required");

    setErrors(list);

    return list.length === 0;
  };

  return { errors, validate };
}
