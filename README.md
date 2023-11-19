# Azure Diagram Generator (azf-diagram)

**Azure Diagram Generator** is a javascript tool that generates a draw.io diagram for your Azure Functions projects.

**This library only supports Azure Function v3 model**

This repository is part of the **Open Source Jam (2023-11-18 to 2023-11-19)**, located in Alicante.

## Installation

Use the Node Package Manager [npm](https://www.npmjs.com/) to install azf-diagram

```bash
npm install azf-diagram
```

## Usage

Install and execute the following command in your Azure functions project to generate the diagram:

```shell
azf-diagram -p .
```

| Params | Required | Data                                     |
| ------ | -------- | ---------------------------------------- |
| p      | true     | The path to your Azure functions project |

The output should be generated on a file named `diagram.drawio`, containing the necessary information

## Improvements

Due to the small period of time of developing this tool, we have problem with collision among the generated data.
To avoid this, when importing to draw.io, **reorder** the diagram as you want.

## Dependencies

- [fs-extra](https://www.npmjs.com/package/fs-extra)
- [xml-writer](https://www.npmjs.com/package/xml-writer)

## License

[MIT](https://choosealicense.com/licenses/mit/)