function fetchPatient(){
    return new Promise((resolve, reject) =>  {
        // Simulate fetching patient data
        setTimeout(() => {
            const patient = { id: 1, name: "John Doe", age: 30 };
            resolve(patient);
        }, 1000);
    });

    
}   