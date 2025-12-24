import { IIdentifiable } from "./base"; 

export interface Prescription extends IIdentifiable {
    id : string;
    medicalRecordId : string;
    medicine : string;
    dosage : string;
}
