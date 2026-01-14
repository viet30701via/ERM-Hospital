import { Prescription } from "./Prescription";
import { IIdentifiable } from "./Base";

export interface MedicalRecord extends IIdentifiable {
  patientId: string;
  date: string;
  prescription: Prescription[]; // có nhiều đơn thuốc
  diagnosis: string;
}
