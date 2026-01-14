import {IIdentifiable} from "../Models/base";
import { Role } from "../Models/type";
import { Patient } from "./patient";

export interface Doctor extends IIdentifiable {
    name: string;   
    specialty: string;
    role: Role.Doctor;
    patient : Patient[];
}       