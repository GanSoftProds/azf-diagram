// Partimos de la base de que cada azure function es un recurso unico

// mapa clave - valor 
// tipo y nombre
let resources = {}


function process(list) {

  let actualAzf = "Funcion 1"
  var actualResourceInfo = {
    type: "function",
    input_edges: [],
    output_edges: []
  }
  resources[actualAzf] = actualResourceInfo

  for (let binding in list) {

    //comprobar si el recurso al que apuntamos existe,
    // si no existe lo anyadimos a la lista global de recursos
    if (resources[binding.resource_name] == undefined) {
      resources[binding.resource_name] = binding.type
    }

    if (binding.direction == "in") {

      actualResourceInfo["input_edges"].push(binding.resource_name)

    }

    if (binding.direction == "in") {
      actualResourceInfo["input_edges"].push(binding.resource_name)
    }

    if (binding.direction == "out") {
      actualResourceInfo["output_edges"].push(binding.resource_name)
    }

  }


}

