import { IIdentifiable } from "./Base";

export interface Prescription extends IIdentifiable {
  id: string;
  medicalRecordId: string;
  medicine: string;
  dosage: string;
}
