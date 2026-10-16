const prices = [10, 20, 30, 40]
const increased = prices.map(price => price * 20)

console.log(increased)
console.log(prices)

const products=[
    {name: 'laptop', price: 50000},
    {name: 'mouse', price: 500},
    {name: 'keyboard', price: 1500},
    {name: 'monitor', price: 12000},
    {name: 'headphones', price: 2000}
]

const result=products.filter(product => product.price > 1000)
console.log(result)

products.map(product => console.log(product.name))

const total=products.reduce((sum, product) => sum + product.price, 0)
console.log(total)


//Synchronous
console.log("Start")
for(let i=0;i<100;i++){
    console.log(i)
}
console.log("End")


// Asynchronous
// console.log("Start")
// setTimeout(function(){
//     console.log("Set Ready")
// },2000)
// console.log("End")

//Promise
const myPromise=new Promise(function(resolve,reject){
    let paySuccess=true
    if(paySuccess){
        resolve("Payment Success")
    }else{
        reject("Payment Failed")
    }
})
myPromise.then(function(result){  //.then() cannot display error
    console.log(result)
}).catch(function(error){   //.catch() can display error
    console.log(error)
})
