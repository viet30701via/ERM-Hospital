import {useState } from "react";
import  type { Patient } from "../models/Patient";
import  { Role, PatientStatus } from "../models/Type";

//list patient
const initialPatient : Patient [] = [
    {
        id: "1",
        name: "John Doe",
        age: 30,
        gender: "male",
        role: Role.Patient,
        conditions: "Diabetes",
        status: PatientStatus.Active,
        medicalRecord: []
    },
    {
        id: "2",
        name: "Jane Smith",
        age: 25,
        gender: "female",
        role: Role.Patient,
        conditions: "Asthma",
        status: PatientStatus.Active,
        medicalRecord: []

    },
    {
        id: "3",
        name: "Tom Lee",
        age: 40,
        gender: "male",
        role: Role.Patient,
        conditions: "Hypertension",
        status: PatientStatus.Inactive,
        medicalRecord: []

    },   
];

export default function PatientList()
{   
    //List patients
    const [patients] = useState<Patient[]>(initialPatient);
    //Show/Hide list
    const [showList,setShowList] = useState<boolean>(true);
    //Loading state
    const [loading] = useState<boolean>(false);

    return(
        <div>
            <h2>Patient List</h2>

            <button onClick={() => setShowList(prev => !prev)}>
            {showList? "Hide list" : "ShowList"}
            </button>
            {loading && <p>Loading....</p>}
            {showList && (
            <ul>
                {patients.map(patient => (
                    <li key={patient.id}>
                        Name: <strong>{patient.name}</strong> - 
                        Age: {patient.age} - 
                        Condition: {patient.conditions}
                        {(patient.status as string) === "Active" ? "✅" : "❌"}
                    </li>
                ))}
            </ul>
        )}
        </div>

        
    )
}

