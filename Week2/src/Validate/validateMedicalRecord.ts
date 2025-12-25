import { MedicalRecord } from "../Models/medicalRecords";
export function validateMedicalRecord(record: any): record is MedicalRecord {
  if (!record) {
    throw new Error("Medical record is required");
  }
  if (typeof record.patientId !== "string") {
    throw new Error("Invalid Id");
  }
  if (!record.diagnosis || record.diagnosis.trim().length < 2) {
    throw new Error("Invalid name");
  }
  if (!(record.date instanceof Date)) {
    throw new Error("Date must be a valid Date object");
  }
  return true;
}