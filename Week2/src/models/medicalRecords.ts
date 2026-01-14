import { Prescription } from './presciption';
import { IIdentifiable } from "./base"

export interface MedicalRecord extends IIdentifiable {
    patientId: string;
    date: Date;
    prescription :Prescription[]; // có nhiều đơn thuốc
    diagnosis: string;
}