const fs = require('fs');
const { config } = require('process');

const getFileName = (directory) => {


    
}

let directory = "files";

let dirbuf = Buffer.from(directory);

fs.readdir(dirbuf, {encoding: 'utf8', withFileTypes: true},
    (err, files) => {
    if(err){
        console.log(err.message);
    }else{
        const fileTypes = files.filter(file => file.isFile()).map(file => file.name);
        console.log(fileTypes)
    }

}) 

// import { readdir } from 'fs/promises';

// try {
//   const files = await readdir(path);
//   for (const file of files)
//     console.log(file);
// } catch (err) {
//   console.error(err);
// }

// fs.readFile(dirbuf, (err, files) => {
//     if(err){
//         console.log(err.message);
//     }else{
//         console.log(files);
//         console.log(typeof files);
//     }
// })

