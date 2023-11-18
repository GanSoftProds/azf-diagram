var XMLWriter = require('xml-writer');

writeElement({ tag, params = {}, close = true }) {
    xw.startElement(tag);

    Object.entries(params).forEach(([ key, value ]) => {
        xw.writeAttribute(key, value);
    });

    if (!close) return;

    xw.endElement();
}

writeIcon({ id, text = '', x, y, width, height }) {
    let icon = 'img/lib/azure2/compute/Function_Apps.svg';

    writeElement({
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

    writeElement({
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

    endElements(2);
}

writeArrow({ id, text = '', idSource, idTarget }) {
    writeElement({
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

    writeElement({
        tag: 'mxGeometry',
        params: {
            relative: 1,
            as: 'geometry',
        },
        close: false,
    });

    endElements(2);
}

endElements(number = undefined) {
    if (number === undefined) return;

    for (let i = 0; i < number; i++) {
        xw.endElement();
    }
}

function writeXml() {
    xw = new XMLWriter(true);
    xw.startDocument();

    writeElement({ tag: 'mxfile', close: false })

    writeElement({
        tag: 'diagram',
        params: {
            name: 'Azure Test Diagram',
            id: 'this-is-a-random-id',
        },
        close: false,
    });

    writeElement({ tag: 'mxGraphModel', close: false })

    xw.startElement('root');

    writeElement({ tag: 'mxCell', params: { id: 0 } })
    writeElement({ tag: 'mxCell', params: { id: 1, parent: 0 } })

    writeIcon({
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

    xw.endElement();
    xw.endDocument();

    console.log(xw.toString());
}

writeXml();

