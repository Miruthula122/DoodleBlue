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
const { name, age, course } = student1
console.log(name)
console.log(age)
console.log(course)


const {
  name: studentName,
  city = "Chennai"
} = student1
console.log(studentName)
console.log(city)

//spread operator
const orginal = {
  name: "Neiran",
  age: 20,
}
const updated = {
  ...orginal,
  age: 21,
  city: "Chennai"
}
console.log(orginal)
console.log(updated)

//spread - combine operators(merge two objects)
const personal = {
  name: "John",
  age: 30,
}
const professional = {
  company: "ABC Corp",
  job: "Developer"
}
const combined = {
  ...personal,
  ...professional
}
console.log(combined)

//in array
const first = [1, 2, 3]
const second = [4, 5, 6]

const combinedArray = [...first, ...second]
console.log(combinedArray)

const copy = [...first]
console.log(copy)

//optional chaining - safely access nested properties(check if property exists)
const user = {
  name: "John",
  address: {
    city: "New York",
    state: "NY"
  }
}

console.log(user.address?.city) // New York
console.log(user.contact?.phone) // undefined
console.log(user.company?.name) // undefined

// nullish coalescing operator - default value if null or undefined
const username = null
const age1 = 0;
const city1 = undefined

console.log(username ?? "Guest") // Guest
console.log(age1 ?? 18) // 0
console.log(city1 ?? "Chennai") // Chennai

// difference between || and ??
console.log(0 || 100);
console.log(0 ?? 100);

console.log(false || true);
console.log(false ?? true);
console.log("" ?? "Guest");
console.log("" || "Guest");

/*|| vs ??*/ -

  console.log(0 || 100);
console.log(0 ?? 100);

console.log(false || true)
console.log(false ?? true)

console.log("" ?? "Guest")
console.log("" || "Guest")

const a = null
const b = undefined
console.log(a ?? 18)

