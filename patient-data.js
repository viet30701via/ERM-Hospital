
function addPatients(patients, newPatients) {
    return [...patients, newPatients];
}

const updatePatient = (patients,id, updates) => {
    return patients.map(patient => 
        patient.id === id
        ?{...patient, ...updates}
        : patient
    );
}

let patientList = [
    {id: 1, name: "John Doe", age: 30, condition: "Flu"},
    {id: 2, name: "Jane Smith", age: 25, condition: "Cold"}
];
console.log("Patient Defaullt: ", patientList);

let newPatient ={id: 3, name: "Alice Johnson", age: 40, condition: "Allergy"};
patientList = addPatients(patientList, newPatient);
console.log("After Adding New Patient: ", patientList);

patientList = updatePatient(patientList, 2, {name:"Malisa", age: 26, condition: "Recovered"});
console.log("After Updating Patient: ", patientList);