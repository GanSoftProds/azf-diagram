var XMLWriter = require('xml-writer');
const fs = require('fs');

class DrawIOWriter {

  constructor(tuple, fileName = 'diagram.drawio') {
    this.xw = new XMLWriter(true);
    this.xw.startDocument();

    this.resources = tuple.resourceMap
    this.edges = tuple.edgeList

    this.fileName = fileName;
  }

  //
  writeElement({ tag, params = {}, close = true }) {
    this.xw.startElement(tag);

    Object.entries(params).forEach(([key, value]) => {
      this.xw.writeAttribute(key, value);
    });

    if (!close) return;

    this.xw.endElement();
  }

  // escribimos un recurso
  writeIcon({ id, text = '', x, y, width, height, type }) {
    const defaultIcon = 'image;aspect=fixed;html=1;points=[];align=center;fontSize=12;image=img/lib/azure2/general/Code.svg;';
    const icons = [
      { type: 'function', data: 'image;aspect=fixed;html=1;points=[];align=center;fontSize=12;image=img/lib/azure2/compute/Function_Apps.svg;' },
      { type: 'httpTrigger', data: 'verticalLabelPosition=bottom;html=1;verticalAlign=top;align=center;strokeColor=none;fillColor=#00BEF2;shape=mxgraph.azure.storage_blob;' },
      { type: 'blob', data: 'outlineConnect=0;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;shape=mxgraph.aws3.http_protocol;fillColor=#5294CF;gradientColor=none;' },
      { type: 'eventHub', data: 'image;sketch=0;aspect=fixed;html=1;points=[];align=center;fontSize=12;image=img/lib/mscae/Event_Hubs.svg' },
    ];

    const { data: icon = defaultIcon } = icons.find(({ type: iconType }) => iconType === type) ?? {};

    this.writeElement({
      tag: 'mxCell',
      params: {
        id: id,
        value: text,
        style: icon,
        parent: 1,
        vertex: 1,
      },
      close: false,
    });

    this.writeElement({
      tag: 'mxGeometry',
      params: {
        x: x,
        y: y,
        width: width,
        height: height,
        as: 'geometry',
      },
      close: false,
    });

    this.endElements(2);
  }

  writeArrow({ id, text = '', idSource, idTarget }) {
    this.writeElement({
      tag: 'mxCell',
      params: {
        id: id,
        value: text,
        style: 'edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;',
        parent: 1,
        edge: 1,
        source: idSource,
        target: idTarget,
      },
      close: false,
    });

    this.writeElement({
      tag: 'mxGeometry',
      params: {
        relative: 1,
        as: 'geometry',
      },
      close: false,
    });

    this.endElements(2);
  }

  endElements(number = undefined) {
    if (number === undefined) return;

    for (let i = 0; i < number; i++) {
      this.xw.endElement();
    }
  }


  process() {
    this.writeElement({ tag: 'mxfile', close: false })

    this.writeElement({
      tag: 'diagram',
      params: {
        name: 'Azure Test Diagram',
        id: 'this-is-a-random-id',
      },
      close: false,
    });

    this.writeElement({ tag: 'mxGraphModel', close: false })

    this.xw.startElement('root');

    this.writeElement({ tag: 'mxCell', params: { id: 0 } })
    this.writeElement({ tag: 'mxCell', params: { id: 1, parent: 0 } })

    var offset = 0
    Object.entries(this.resources).forEach(([key, value]) => {
      const { type = undefined } = value;
      if (type === undefined) return;

      this.writeIcon({
        id: key,
        x: 270 + offset,
        y: 180,
        width: 50,
        height: 50,
        type,
        text: key // TODO: Text can be improved
      });
      offset += 100
    });

    let idArrow = 'uuid-arrow-'
    let i = 0

    for (let edge of  this.edges) {

      this.writeArrow({
        id: idArrow+i,
        idSource: edge.ori,
        idTarget: edge.dest,
      });

      i++
    }


    this.xw.endElement();
    this.xw.endDocument();

    return this.generateFile(this.xw.toString());
  }

  generateFile(content) {
    fs.writeFile(this.fileName, content, err => {
      if (err) {
        console.error(err);
      }
    });

    return this.fileName;
  }

  test() {
    xw = new XMLWriter(true);
    this.xw.startDocument();

    this.writeElement({ tag: 'mxfile', close: false })

    this.writeElement({
      tag: 'diagram',
      params: {
        name: 'Azure Test Diagram',
        id: 'this-is-a-random-id',
      },
      close: false,
    });

    this.writeElement({ tag: 'mxGraphModel', close: false })

    this.xw.startElement('root');

    this.writeElement({ tag: 'mxCell', params: { id: 0 } })
    this.writeElement({ tag: 'mxCell', params: { id: 1, parent: 0 } })

    this.writeIcon({
      id: 'uuid-1',
      x: 270,
      y: 180,
      width: 50,
      height: 50,
    });

    writeIcon({
      id: 'uuid-2',
      x: 600,
      y: 180,
      width: 50,
      height: 50,
    });

    writeArrow({
      id: 'uuid-3',
      idSource: 'uuid-1',
      idTarget: 'uuid-2',
    });

    this.xw.endElement();
    this.xw.endDocument();

    // console.log(this.xw.toString());
  }
}


module.exports = DrawIOWriter
