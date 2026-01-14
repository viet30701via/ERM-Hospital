import { Patient,Role,PatientStatus } from "../Models/patient";

export function validatePatient(patient : any) : patient is Patient{
    if(!patient)
    {
        throw new Error("Invalid Patient")
    }
    if(typeof patient.id !== "string")
    {
        throw new Error("Invalid PatientId")

    }
    if(!patient.name || patient.name.trim().length < 2)
    {
        throw new Error("Invalid name");
    }
    if(typeof patient.age !== "number" || patient.age < 0 || patient.age >120)
    {
        throw new Error("Invalid age");
    }
    return true;
}