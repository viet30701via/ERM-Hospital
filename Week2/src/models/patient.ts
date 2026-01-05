import { IIdentifiable } from "../Models/base";
import { Role, Gender, PatientStatus } from "../Models/type";
import { MedicalRecord } from "./medicalRecords";

export interface Patient extends IIdentifiable {
  name: string;
  age: number;
  gender: Gender;
  role: Role.Patient;
  conditions: string;
  status: PatientStatus;
  medicalRecord: MedicalRecord[]; // 1 bệnh nhan có nhiều medicalrecord
}

export { Role, PatientStatus };
