import { useState } from "react";

interface PatientFormValues {
  name: string;
  age: number;
  phone: string;
  address: string;
}

interface PatientFormErrors {
  name?: string;
  age?: string;
  phone?: string;
  address?: string;
}

const VN_PHONE_REGEX = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;

export default function useFormValidation() {
  const [errors, setErrors] = useState<PatientFormErrors>({});

  const validate = (values: PatientFormValues): boolean => {
    const newErrors: PatientFormErrors = {};

    if (!values.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (values.age <= 0 || values.age > 120) {
      newErrors.age = "Age must be between 0 and 120";
    }

    if (!VN_PHONE_REGEX.test(values.phone)) {
      newErrors.phone = "Invalid Vietnamese phone number";
    }

    if (!values.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    //nếu ko có lỗi => mảng rỗng ===0 trả về true => cho phép gửi form
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate };
}
