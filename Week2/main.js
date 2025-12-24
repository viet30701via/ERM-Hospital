"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const patient_1 = require("./models/patient");
let patientList = [
    {
        id: "1",
        name: "John Doe",
        age: 30,
        gender: "male",
        role: patient_1.Role.Patient,
        conditions: "Diabetes",
        status: patient_1.PatientStatus.Active
    },
    {
        id: "2",
        name: "Jane Smith",
        age: 25,
        gender: "female",
        role: patient_1.Role.Patient,
        conditions: "Hypertension",
        status: patient_1.PatientStatus.Active
    },
    {
        id: "3",
        name: "Bob Johnson",
        age: 45,
        gender: "male",
        role: patient_1.Role.Patient,
        conditions: "Asthma",
        status: patient_1.PatientStatus.Inactive
    }
];
//Lưu trữ dữ liệu vào mảng
class Repository {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    getAll() {
        return this.items;
    }
    findById(id) {
        return this.items.find(item => item.id === id);
    }
    deleteById(id) {
        this.items = this.items.filter(item => item.id !== id);
        console.log(`Delete patient with id ${id} successfully.`);
    }
    searchByName(name) {
        return this.items.filter(item => item.name && item.name.includes(name));
    }
}
//Service xử lý logic nghiệp vụ
class PatientService {
    constructor(repository) {
        this.repository = repository;
    }
    registerPatient(patient) {
        if (patient.age < 0 || patient.age > 120) {
            throw new Error("Invalid age for patient.");
        }
        else {
            this.repository.add(patient);
            console.log(`Add patient ${patient.name} successfully.`);
        }
    }
}
const patientRepository = new Repository();
const patientService = new PatientService(patientRepository);
patientList.forEach(patient => patientRepository.add(patient));
patientService.registerPatient({
    id: "5",
    name: "Charlie Davis",
    age: 28,
    gender: "male",
    role: patient_1.Role.Patient,
    conditions: "Allergy",
    status: patient_1.PatientStatus.Active
});
const deletePatientId = "2";
patientRepository.deleteById(deletePatientId);
const finalPatients = patientRepository.getAll();
console.log("\nFinal patient list:", finalPatients);
const findPatientById = "3";
console.log(`\nFind patient by id ${findPatientById}:`, patientRepository.findById(findPatientById));
const searchName = "John";
console.log(`\nSearch patients by name "${searchName}":`, patientRepository.searchByName(searchName));
