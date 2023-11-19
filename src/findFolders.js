const fs = require('fs');
const path = require('path');

//let readFunctionJSON = require("./readFunctionJSON");

//let wd =  process.argv.slice(2)[0];


function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + '/' + file).isDirectory();
  })
}

function getValidFunctionsPath(dirList, wd) {

  var list = []
  for (const dir of dirList) {
    console.log((wd + '/'+ dir + "/function.json"));
    if (fs.existsSync(wd + dir + "/function.json")) {
      //console.log("Azure function encontrada: " + dir)
      list.push(wd + dir + "/function.json")
    }
  }

  return list
}

function main(wd) {
  let paths = getDirectories(wd)
  // console.log(paths);

  getValidFunctionsPath(paths);
   //console.log("\nCurrent directory filenames:");
  //console.log(paths); 

  return getValidFunctionsPath(paths, wd);

}


module.exports = main

