const fs = require('fs-extra');

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

async function readFunctionJSON(file) {
  let bindings = [];

  try {

    const jsonString = await fs.readJson(file);

    for (let i = 0; i < jsonString.bindings.length; i++) {
      
      if (!jsonString.bindings[i].connection){
        jsonString.bindings[i].connection = makeid(5);
      }

      bindings.push({
        type: jsonString.bindings[i].type,
        direction: jsonString.bindings[i].direction,
        resource_name: jsonString.bindings[i].connection
      });
    }

    // for (let i = 0; i < bindings.length; i++) {
    //   console.log(bindings[i]);
    // }


  } catch (err) {
    console.error(err);
  }
  return bindings
}


module.exports = readFunctionJSON

