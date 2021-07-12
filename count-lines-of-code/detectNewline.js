// Importing the Required Modules
const fs = require('fs');
const readline = require('readline');
  
let filepush = []

const  splitLines = (text) => { return text.split(/\r\n|\r|\n/); }



const detectNewLine = (filePath) => {
    fs.readFile(filePath, 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        filepush.push(data)
        const splitFilePush = splitLines(filepush[0])
        console.log(splitFilePush, splitFilePush.length)
      })
}