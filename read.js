const fs = require('fs-extra');

const file = './azure_function_example/HttpTrigger1/function.json';

async function example () {
    try{

      const jsonString = await fs.readJson(file);
      let bindings = [];

      for(let i=0; i<jsonString.bindings.length; i++){
        bindings.push({type: jsonString.bindings[i].type, 
          direction: jsonString.bindings[i].direction, 
          resource_name: jsonString.bindings[i].connection});
      }

      for(let i=0; i<bindings.length; i++){
        console.log(bindings[i]);
      }


    } catch (err) {
      console.error(err);
    }
  }

  example();

