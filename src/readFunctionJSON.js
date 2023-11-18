const fs = require('fs-extra');


async function readFunctionJSON(file) {
  let bindings = [];

  try {

    const jsonString = await fs.readJson(file);

    for (let i = 0; i < jsonString.bindings.length; i++) {
      bindings.push({
        type: jsonString.bindings[i].type,
        direction: jsonString.bindings[i].direction,
        resource_name: jsonString.bindings[i].connection
      });
    }

    for (let i = 0; i < bindings.length; i++) {
      console.log(bindings[i]);
    }


  } catch (err) {
    console.error(err);
  }
  return bindings
}

module.exports = readFunctionJSON

