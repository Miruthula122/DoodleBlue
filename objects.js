const employee = {
  name: "Arun",
  salary: 30000,
}

console.log(employee.name)
console.log(employee["salary"])

employee.salary = 35000
console.log(employee.salary)

employee.city = "Chennai"
console.log(employee)
delete employee.city
console.log(employee)

//nested object
const student = {
    name: "Priya",
    age: 20,
    address: {
        City: "Chennai",
        State: "Tamil Nadu"
    }
}
console.log(student.name)
console.log(student["age"])
console.log(student.address.City)

//destructuring
const student1 = {
    name: "Priya",
    age: 21,
    course: "React"
}
const {name, age, course} = student1
console.log(name)
console.log(age)
console.log(course)