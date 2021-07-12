// take in arguments as a string in an array 
const myArg = process.argv.slice(2).toString()  //replace , reduce , filter , join , tostring 
console.log('my arguments:', myArg);

const xx = `"${process.argv.slice(2).toString()}"`
console.log('others', myArg);