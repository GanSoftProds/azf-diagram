var XMLWriter = require('xml-writer');

class DrawIOWriter {

  constructor(tuple) {
    this.xw = new XMLWriter(true);
    this.xw.startDocument();

    this.resources = tuple.resourceMap
    this.edges = tuple.edgeList

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
  writeIcon({ id, text = '', x, y, width, height }) {
    let icon = 'img/lib/azure2/compute/Function_Apps.svg';

    this.writeElement({
      tag: 'mxCell',
      params: {
        id: id,
        value: text,
        style: `image;aspect=fixed;html=1;points=[];align=center;fontSize=12;image=${icon};`,
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
    for (let rsc in this.resources) {

      this.writeIcon({
        id: rsc ,
        x: 270 + offset,
        y: 180,
        width: 50,
        height: 50,
      });
      offset += 100
    }

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

    console.log(this.xw.toString());
  }
}


module.exports = DrawIOWriter
