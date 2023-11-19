# Azure Diagram Generator (azf-diagram)

**Azure Diagram Generator** is a javascript library that generates a draw.io diagram for your Azure functions projects.
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

## Dependencies

- [fs-extra](https://www.npmjs.com/package/fs-extra)
- [xml-writer](https://www.npmjs.com/package/xml-writer)

## License

[MIT](https://choosealicense.com/licenses/mit/)