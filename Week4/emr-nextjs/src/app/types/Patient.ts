import type { IIdentifiable } from "./Base";
import { Role, type Gender, Status } from "./Type";
import type { MedicalRecord } from "./MedicalRecord";
export interface Patient extends IIdentifiable {
  name: string;
  age: number;
  gender: Gender;
  role: Role.Patient;
  conditions: string;
  status: Status;
  medicalRecord: MedicalRecord[]; // 1 bệnh nhan có nhiều medicalrecord
  phone: string;
  address: string;
}

export { Role, Status };
