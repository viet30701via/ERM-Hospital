import { Gender, Role, Status } from "./Type";

export interface Doctor {
  _id: string;
  name: string;
  age: number;
  gender: Gender;
  address: string;
  phone: string;
  role: Role.Doctor;
  specialization: string;
  status: Status;
}
export { Role, Status };
