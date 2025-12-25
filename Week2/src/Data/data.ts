import { Patient } from '../Models/patient';
import {Doctor} from "../Models/docter";
import {Role,Gender,PatientStatus} from "../Models/type"
export const listPatient: Patient[] = [
    {
        id: '1',
        name: 'John Doe',
        age: 30,
        gender: 'male',
        role: Role.Patient,
        conditions: 'Diabetes',
        status: PatientStatus.Active
    },
    {
        id: '2',
        name: 'Memphis Depay',
        age: 45,
        gender: 'male',
        role: Role.Patient,
        conditions: 'Hypertension',
        status: PatientStatus.Inactive
    },
    {
        id: '3',
        name: 'Cole Palmer',
        age: 28,
        gender: 'female',
        role: Role.Patient,
        conditions: 'Flu',
        status: PatientStatus.Active
    }
];

export const listDoctor: Doctor[] = [
    {
        id: '1',
        name: 'Cr7',
        specialty: 'Oncology',
        role: Role.Doctor
    },
    {
        id: '2',
        name: 'M10',
        specialty: 'Cardiology',
        role: Role.Doctor
    },
    {
        id: '3',
        name: 'Dr. Strange',
        specialty: 'Neurology',
        role: Role.Doctor
    }
];