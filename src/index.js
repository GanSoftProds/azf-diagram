let freader = require('./readFunctionJSON');
let ProcessData = require('./ProcessData');
let DrawIOWriter = require('./DrawIOWriter');

async function main() {
  console.log('###########################');
  console.log('# AZURE DIAGRAM GENERATOR #');
  console.log('#       BY GANSOFT        #');
  console.log('###########################');
  console.log('\n');

  const file = './azure_function_example/HttpTrigger1/function.json';

  console.log('1.- Reading directory');
  let list = await freader(file)

  console.log('2.- Processing data');
  const prc = new ProcessData();
  prc.process(list)
  const tuple = prc.getDataProcessed();

  console.log('3.- Writing on file');
  let wrt = new DrawIOWriter(tuple)
  const fileName = wrt.process()

  console.log('\n');
  console.log('All good!');
  console.log(`Output generated on file: ${fileName}`);
  console.log('\n');
}

main()