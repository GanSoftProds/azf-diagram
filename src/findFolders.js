const fs = require('fs');
const path = require('path');

let readFunctionJSON = require("./readFunctionJSON");

let wd =  process.argv.slice(2)[0];


function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + '/' + file).isDirectory();
  })
}

function getValidFunctionsPath(dirList, wd) {

  for (const dir of dirList) {

    if (fs.existsSync(wd + dir + "/function.json")) {
      console.log("Azure function encontrada: " + dir)
      readFunctionJSON(wd + dir + "/function.json")
    }
  }


}

let paths = getDirectories(wd)
console.log(paths); 

getValidFunctionsPath(paths, wd);


