#! /usr/bin/env node
const chalk = require('chalk')
const yargs = require("yargs");
const index = require("../src/index");


const usage = chalk.keyword('violet')("\nUsage: azf -p <app_folder> \n");
const options = yargs
  .usage(usage)
  .option("p", { alias: "path", describe: "Azure Function App PATH ", type: "string", demandOption: true })
  //.option("o", {alias:"output", describe: "Output File Path", type: "string", demandOption: false })
  .help(true)
  .argv;

// console.log(yargs.argv);
const argv = require('yargs/yargs')(process.argv.slice(2)).argv;

if (argv.path == null && argv.p == null) {
  console.log(
    'Falta el parametro de entrada'
  );
  yargs.showHelp();
  return;
}
/*
if(argv.sentence == null && argv.s == null){
    yargs.showHelp();
    return;
}
*/
const path = argv.p || argv.path;

//const output =  argv.o  || argv.output;

console.log("path: " + path);


index(path)