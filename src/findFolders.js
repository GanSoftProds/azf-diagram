const fs = require('fs');
const pathL = require('path');

let wd = "/home/juan/Escritorio/opensourcejam202311/azure_function_example/"
function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + '/' + file).isDirectory();
  })
}

function getValidFunctionsPath(dirList) {

  for (const dir of dirList) {

    if (fs.existsSync(dir + "/function.json")) {
      // console.log("Azure function encontrada: " + dir)
    }
  }


}

let paths = getDirectories(wd)
// console.log(paths);

getValidFunctionsPath(paths);
// console.log("\nCurrent directory filenames:");
