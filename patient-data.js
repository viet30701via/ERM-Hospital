
let patientList = [
    {id: 1, name: "John Doe", age: 30, condition: "Flu"},
    {id: 2, name: "Jane Smith", age: 25, condition: "Cold"}
];
function addPatient(patients, newPatients) {
    return [...patients, newPatients];
}

const updatePatient = (patients,id, updates) => {
    return patients.map(patient => 
        patient.id === id
        ?{...patient, ...updates}
        : patient
    );
}

console.log("Patient Defaullt: ", patientList);

let newPatient ={id: 3, name: "Alice Johnson", age: 40, condition: "Allergy"};
patientList = addPatient(patientList, newPatient);
console.log("After Adding New Patient: ", patientList);

patientList = updatePatient(patientList, 2, {name:"Malisa", age: 26, condition: "Recovered"});
console.log("After Updating Patient: ", patientList);

// const name = patientList.map(patient => patient.name);
// console.log("Patient Names: ", name);

// const fluPatient = patientList.filter(p => p.condition === "Flu");
// console.log("Flu Patients: ", fluPatient);

const p = patientList.find(p => p.id === 1);
console.log("Find Patient with ID 1: ", p);

// const deletePatient = (patients, id) => {
//     return patients.filter(patient => patient.id !== id);
// }
// patientList = deletePatient(patientList, 1);
// console.log("After Deleting Patient: ", patientList);

const searchPatient = (patients, keyword) => {
    return patients.find(patient =>
        patient.id.toString().includes(keyword) ||
        patient.name.toLowerCase().includes(keyword)
    );
}
const searchResultByName = searchPatient(patientList, "John");
const searchResultById = searchPatient(patientList, "3");

console.log("Search Result by Name: ", searchResultByName);
console.log("Search Result by ID: ", searchResultById);

//Use map to manage 
const patientMap = new Map();
patientList.forEach(p=>patientMap.set(p.id, p));
console.log("Find Patient in Map with Id 2:", patientMap.get(2));


//Asynce,promise,await
function fetchPatient() {
    return new Promise((resolve, reject) => {
    console.log("Fetching patient data...");
    setTimeout(() => 
    {
        const success = true;
        if (success) {
            resolve([...patientList]);
        } else {
            reject("Failed to fetch patient data");
        }
    }, 1000);
    })
}

async function displayPatients() {
    try{
        const patients = await fetchPatient();
        console.log("Patients loaded: ", patients);
    } catch (error) {
        console.log("Error loading patients:", error);
    }
    console.log("End of patient data fetch.");
}

displayPatients();