//const fs = require('fs');
const fs = require('fs/promises');

const { config, env } = require('process');

const rootFolder = "files";
const qualifyingExtensions = [ "js", "jsx", "ts", "tsx" ];

console.log("HOMEDRIVE", env.HOMEDRIVE);
console.log("HOMEPATH", env.HOMEPATH);
console.log("USERPROFILE", env.USERPROFILE);
