import {IIdentifiable} from "./base";
import { Role } from "./type";

export interface Doctor extends IIdentifiable {
    name: string;   
    specialty: string;
    role: Role.Doctor;
}       