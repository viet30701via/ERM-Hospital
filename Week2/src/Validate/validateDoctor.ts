import { Doctor } from "../Models/docter";

export function validateDoctor(doctor: any): doctor is Doctor {
  if (!doctor) {
    throw new Error("Doctor is required");
  }
  if (typeof doctor.id !== "string") {
    throw new Error("Invalid Id");
  }
  if (!doctor.name || doctor.name.trim().length < 2) {
    throw new Error("Invalid name");
  }
  return true;
}
