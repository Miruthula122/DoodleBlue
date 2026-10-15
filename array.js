const students=["Priya","Arun","Divya","Rahul","Sneha"]

console.log(students[0])
console.log(students[4])
students.push("Karthik")
console.log(students)
students.pop()
console.log(students)
const toppers= students.slice(1,4)
console.log(toppers)
students.splice(2,1)
console.log(students)
console.log(students.includes("Priya"))

let strong = [40,10,5,20,30]
//(a-b) for ascending order and (b-a) for descending order.
console.log(strong.sort((a,b) => a-b))
console.log(strong.sort((a,b) => b-a))

let numbers=[10,20,15,5]
let res=numbers.reduce((total, number) => {
    return total + number;
}) // without initial value, total will be the first element of the array and number will be the second element of the array in the first iteration.
let res1=numbers.reduce((total, number) => {
    return total + number;
}, 0) // with initial value, total will be the initial value and number will be the first element of the array in the first iteration.
console.log(res)
console.log(res1)

let a=numbers.slice(1,3)
let b=numbers.splice(2,1)
console.log(a)
console.log(b)

let result=numbers.some((n) => { // checks if at least one element in the array satisfies the condition
    return n>20
})
console.log(result)

result=numbers.every((n) => { // checks if all elements in the array satisfy the condition
    return n<30
})
console.log(result)
//both some and every methods return a boolean value.