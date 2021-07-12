const lineReader = require('line-reader');

let myArr = []
let data

lineReader.eachLine('/Users/User/Desktop/Test/files/code3.ts', function(line) {
    data = line
    myArr.push(data)
    console.log(myArr.length)
    for (let i = 0; i < myArr.length; i++) {
        console.log(myArr[i])
    }
});

