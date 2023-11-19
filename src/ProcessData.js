class ProcessData {
  constructor() {
    this.resources = {};
    this.edges = [];
    this.functionIndex = 0;
  }

  getActualFunctionName(inc = true) {
    return `Function ${inc ? ++this.functionIndex : this.functionIndex}`;
  }

  process(list) {
    const functionName = this.getActualFunctionName();
    this.resources[functionName] = {
      type: "function"
    };

    for (let binding of list) {
      // NOTE: Check if the resource exists, if not, then add to the global resource list
      if (this.resources[binding.resource_name] === undefined) {
        this.resources[binding.resource_name] = {
          type: binding.type,
        }
      }

      if (binding.direction == "in") {
        this.edges.push({ ori: binding.resource_name, dest: functionName })
      }

      if (binding.direction == "out") {
        this.edges.push({ ori: functionName, dest: binding.resource_name, })
      }
    }
  }

  getDataProcessed() {
    return {
      resourceMap: this.resources,
      edgeList: this.edges
    }
  }
}

module.exports = ProcessData
