import type { IIdentifiable } from "./Base";
import { Role, type Gender, Status } from "./Type";
import type { MedicalRecord } from "./MedicalRecord";
export interface Patient extends IIdentifiable {
  _id: string;
  name: string;
  age: number;
  gender: Gender;
  role: Role.Patient;
  status: Status;
  phone: string;
  address: string;
}

export { Role, Status };
