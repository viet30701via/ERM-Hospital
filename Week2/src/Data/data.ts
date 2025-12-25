import { Patient } from './../Models/patient';
import {Doctor} from "../Models/docter";
import {Role,Gender,PatientStatus} from "../Models/type"
import {MedicalRecord} from"../Models/medicalRecords"
import {Prescription} from "../Models/presciption"
export const seedPatients: Patient[] = [
  {
    id: "P001",
    name: "Cole Palmer",
    age: 35,
    gender: "male",
    role: Role.Patient,
    conditions: "Hypertension",
    status: PatientStatus.Active,
    medicalRecord: [],
  },
  {
    id: "P002",
    name: "Messi",
    age: 42,
    gender: "female",
    role: Role.Patient,
    conditions: "Diabetes Type 2",
    status: PatientStatus.Active,
    medicalRecord: [],
  },
  {
    id: "P003",
    name: "Gullit",
    age: 28,
    gender: "male",
    role: Role.Patient,
    conditions: "Asthma",
    status: PatientStatus.Inactive,
    medicalRecord: [],
  },
];

export const seedDoctors: Doctor[] = [
  {
    id: "D001",
    name: "Dr.Jack Grealish",
    specialty: "Cardiology",
    role: Role.Doctor,
    patient: [],
  },
  {
    id: "D002",
    name: "Dr.Bellingham",
    specialty: "Endocrinology",
    role: Role.Doctor,
    patient: [],
  },
  {
    id: "D003",
    name: "Dr.Reus",
    specialty: "Pulmonology",
    role: Role.Doctor,
    patient: [],
  },
];

export const seedMedicalRecords: MedicalRecord[] = [
  {
    id: "MR001",
    patientId: "P001",
    date: new Date("2024-11-15"),
    diagnosis: "High blood pressure - Stage 1",
    prescription: [],
  },
  {
    id: "MR002",
    patientId: "P002",
    date: new Date("2024-11-20"),
    diagnosis: "Elevated blood glucose levels",
    prescription: [],
  },
];

export const seedPrescriptions: Prescription[] = [
  {
    id: "RX001",
    medicalRecordId: "MR001",
    medicine: "Amlodipine",
    dosage: "5mg once daily",
  },
  {
    id: "RX002",
    medicalRecordId: "MR002",
    medicine: "Metformin",
    dosage: "500mg twice daily",
  },
];