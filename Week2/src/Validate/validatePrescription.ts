import { Prescription } from "../Models/presciption";

export function validatePrescription(pres: any): pres is Prescription {
  if (!pres) {
    throw new Error("Prescription is required");
  }

  if (typeof pres.medicalRecordId !== "string") {
    throw new Error("medicalRecordId must be string");
  }

  if (typeof pres.medicine !== "string") {
    throw new Error("medicine must be string");
  }

  if (typeof pres.dosage !== "string") {
    throw new Error("dosage must be string");
  }
  return true;
}