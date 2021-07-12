const fs = require('fs')

const detectNewline = require('detect-newline');

fs.readFile('/Users/User/Desktop/Test/files/code3.ts', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  // console.log(data)
  // console.log(data.length)
  // console.log(typeof data)
 
})

console.log(detectNewline('ivie\n is a \n girl \n  gfgf \n gtgr').length);