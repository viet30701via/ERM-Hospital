import { IIdentifiable } from "./base";

export interface MedicalRecord extends IIdentifiable {
    patientId: string;
    date: Date;
    diagnosis: string;
}