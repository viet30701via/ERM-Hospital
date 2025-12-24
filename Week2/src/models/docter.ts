import { Role } from "./patient";
export interface Doctor {
    id: string;
    name: string;   
    specialty: string;
    role: Role.Doctor;
}       