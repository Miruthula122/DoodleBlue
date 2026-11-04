// const prices = [10, 20, 30, 40]
// const increased = prices.map(price => price * 20)

// console.log(increased)
// console.log(prices)

// const products = [
//     { name: 'laptop', price: 50000 },
//     { name: 'mouse', price: 500 },
//     { name: 'keyboard', price: 1500 },
//     { name: 'monitor', price: 12000 },
//     { name: 'headphones', price: 2000 }
// ]

// const result = products.filter(product => product.price > 1000)
// console.log(result)

// products.map(product => console.log(product.name))

// const total = products.reduce((sum, product) => sum + product.price, 0)
// console.log(total)


// //Synchronous
// console.log("Start")
// for (let i = 0; i < 100; i++) {
//     console.log(i)
// }
// console.log("End")


// //Asynchronous
// console.log("Start")
// setTimeout(function(){
//     console.log("Set Ready")
// },2000)
// console.log("End")

// //Promise
// const myPromise = new Promise(function (resolve, reject) {
//     let paySuccess = true
//     if (paySuccess) {
//         resolve("Payment Success")
//     } else {
//         reject("Payment Failed")
//     }
// })
// myPromise.then(function (result) {  //.then() cannot display error
//     console.log(result)
// }).catch(function (error) {   //.catch() can display error
//     console.log(error)
// })

// //Microtask and Macrotask

// //lets compare the micro and macro task

// console.log("A")
// setTimeout(()=>{
//     console.log("B")
// },0)
// Promise.resolve().then(()=>{
//     console.log("C")
// })

// console.log("D")

// //Async and Await
// function getData(){
//     return new Promise((resolve)=>{
//         setTimeout(()=>{
//             resolve("Data received!");
//         },2000);
//     });
// }
// async function displayData(){
//     console.log("start")
//     const result=await getData()
//     console.log(result)
//     console.log("End")
// }

// displayData();

// function checkStock(item) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (item === "shoes") resolve("In stock");
//       else reject("Out of stock");
//     }, 500);
//   });
// }

// async function buyItem() {
//   try {
//     const status = await checkStock("shirt");
//     console.log(status);
//   } catch (err) {
//     console.log("Error:", err);
//   }
// }

// // buyItem();

// function sayHello() {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve("Hello!"), 1000);
//   });
// }

// async function greet() {
//   console.log("Before");
//   const message = await sayHello();
//   console.log(message);
//   console.log("After");
// }

// greet();
// console.log("Outside");

// console.log("Registration Received")
// setTimeout(() => console.log("Registration Confirmed"),2000)
// console.log("Pending....")

console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");

console.log("Start");//Sync
setTimeout(() => console.log("Timer"), 0);//Macroqueue
Promise.resolve().then(()=>console.log("Promise"));//Microqueue
console.log("Finish");//Sync