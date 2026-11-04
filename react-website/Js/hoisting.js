//Hoisting - access value before initialization
var a
console.log(a)
a = 10

let b
console.log(b)
b = 10

//const c
//console.log(c)
//c=10  //Temporal Dead Zone Error(TDZ Error)

//Function Declaration
greet()
function greet() {
    console.log("Hello!!")
}

//Function Expression
let res = () => {
    console.log("Hi")
}
console.log(res)
res()

//Closure - An inner function that remembers and accesses variables
// from its outer function even after the outer function has finished

function Account() {  // Outer function
    let balance = 1000
    function deposit(amount) {   // Inner function
        balance = balance + amount
        console.log("Balance Amount " + balance)
    }
    return deposit
}

const myAccount = Account()
myAccount(500)
myAccount(700)