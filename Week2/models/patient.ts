export enum Role {Patient = "patient", Doctor = "doctor"}
export type Gender = "male" | "female" | "other";

export interface Patient {
    id: string;
    name: string;
    age : number;
    gender: Gender;
    role : Role.Patient;
    conditions: string;
    status : PatientStatus;
}

export enum PatientStatus{
    Active = "active",
    Inactive = "inactive",
}