class ProcessData {
  constructor() {}

  process(list) {
    let resources = {}
    let edges = []

    let actualAzf = "Funcion 1"
    var actualResourceInfo = {
      type: "function"
      // input_edges: [],
      //output_edges: []
    }
    resources[actualAzf] = actualResourceInfo

    for (let binding of list) {
      //comprobar si el recurso al que apuntamos existe,
      // si no existe lo anyadimos a la lista global de recursos
      if (resources[binding.resource_name] == undefined) {
        resources[binding.resource_name] = actualResourceInfo = {
          type: binding.type,
          input_edges: [],
          output_edges: []
        }
      }

      if (binding.direction == "in") {
        edges.push({ ori: binding.resource_name, dest: actualAzf })
      }

      if (binding.direction == "out") {
        edges.push({ ori: actualAzf, dest: binding.resource_name, })
      }

    }

    return { resourceMap: resources, edgeList: edges }
  }
}

module.exports = ProcessData
