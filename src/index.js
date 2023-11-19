let freader = require('./readFunctionJSON');
let scanFolders = require('./findFolders');

let ProcessData = require('./ProcessData');
let DrawIOWriter = require('./DrawIOWriter');

async function main(folderPath) {
  console.log('###########################');
  console.log('# AZURE DIAGRAM GENERATOR #');
  console.log('#       BY GANSOFT        #');
  console.log('###########################');
  console.log('\n');


  console.log('0.- Detecting Functions');
  let listJson = await scanFolders(folderPath)

  console.log('1.- Reading Jsons');
  const prc = new ProcessData();

  for (let json of listJson) {
    console.log(json)
    let list = await freader(json)
    prc.process(list)

  }
  console.log('2.- Processing data');
  const tuple = prc.getDataProcessed();

  console.log('3.- Writing on file');
  console.log(tuple);

  let wrt = new DrawIOWriter(tuple)
  const fileName = wrt.process()

  console.log('\n');
  console.log('All good!');
  console.log(`Output generated on file: ${fileName}`);
  console.log('\n');
}


//main()
module.exports = main
