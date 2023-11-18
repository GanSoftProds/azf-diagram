let freader = require('./readFunctionJSON');
let processData = require('./processData');
let DrawIOWriter = require('./DrawIOWriter');

async function main() {
  const file = './azure_function_example/HttpTrigger1/function.json';


  let list = await freader(file)
  let tuple = processData(list)

  let wrt = new DrawIOWriter(tuple)
  wrt.process()
}


main()