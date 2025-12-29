import type { IIdentifiable } from "./Base";
import { Role, type Gender, PatientStatus } from "./Type";
import type { MedicalRecord } from "./MedicalRecord";
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
