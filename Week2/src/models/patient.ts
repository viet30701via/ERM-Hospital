import {IIdentifiable} from "../Models/base";
import { Role, Gender, PatientStatus } from "../Models/type";


export interface Patient extends IIdentifiable {
    name: string;
    age: number;    
    gender: Gender;
    role: Role.Patient;
    conditions: string;
    status: PatientStatus;
}


export { Role, PatientStatus };