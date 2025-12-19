let patients = [
    { id: '1', name: 'Nguyễn Văn A', age: 30 },
    { id: '2', name: 'Trần Thị B', age: 25 }
];
console.log("Patient data loaded successfully.");
console.log(patients);      

function testScope(){
    if(true){
        let doctorName = "Dr. Smith";  
        var doctorName1 = "Dr. John";
        console.log("In block",doctorName); 
    }
    console.log("Out block",doctorName1);
}

testScope();